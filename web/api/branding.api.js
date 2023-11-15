import * as fs from 'fs'

export default function brandingApiEndPoints (app, shopify) {

  app.post("/api/branding/stage-upload", async (req, res) => {
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });
    const { body: { data: { stagedUploadsCreate: { stagedTargets: [stagedUpload] } } } } = await client.query({
      data: {
        query: `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
          stagedUploadsCreate(input: $input) {
            stagedTargets {
              url
              resourceUrl
              parameters {
                name
                value
              }
            }
          }
        }`,
        variables: {
          "input": [
            {
              "filename": req.body.name,
              "mimeType": req.body.type,
              "httpMethod": "POST",
              "resource": "IMAGE"
            }
          ]
        }
      }
    })
    res.status(200).send(stagedUpload)
  })

  app.get("/api/branding", async (req, res) => {
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });
    try {
      const query = `query checkoutProfiles {
                        checkoutProfiles(first: 10) {
                          edges {
                            node {
                              name
                              id
                              isPublished
                            }
                          }
                        }
                    }`;
      const response = await client.query({ data: query });

      if (!response.body.data || !response.body.data.checkoutProfiles || !response.body.data.checkoutProfiles.edges) {
        return res.status(500).send("Unexpected response structure from Shopify GraphQL API");
      }

      const edges = response.body.data.checkoutProfiles.edges;
      let selectedProfile = edges.find(edge => (
        req.query.id ? edge.node.id === req.query.id : edge.node.isPublished
      ));

      // If selected profile is not found, return the first profile
      if (!selectedProfile) {
        selectedProfile = edges[0];
      }

      if (!selectedProfile) {
        return res.status(404).send("No matching checkout profile found");
      }

      const profiles = edges.map(edge => edge.node);
      const currentProfileDataResponse = await getCurrent(client, selectedProfile.node.id);

      if (!currentProfileDataResponse.body.data || !currentProfileDataResponse.body.data.checkoutBranding) {
        return res.status(500).send("Unexpected response structure from getCurrent function");
      }

      const currentProfileData = currentProfileDataResponse.body.data.checkoutBranding;
      res.status(200).send({ ...selectedProfile.node, ...currentProfileData, profiles });

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  app.get("/api/branding/custom-font", async (req, res) => {
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });
    try {
      const { body: { data: { files: { edges } } } } = await client.query({
        data: `query queryFiles {
          files(first: 50, query: "media_type:GenericFile" ) {
            edges {
              node {
                ... on GenericFile {
                  id
                  url
                  fileStatus
                  mimeType
                }
              }
            }
          }
        }`
      });
      const fonts = edges.map(edge => edge.node)
      res.status(200).send(fonts);
    } catch (error) {
      console.error(error)
      res.status(500).send(error);
    }
  })

  app.post("/api/branding", async (req, res) => {
    const body = req.body;
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });
    try {
      const response = await upsert(client, body)
      res.status(200).send(response);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ message: error.message });
    }
  })

  app.post("/api/branding/reset", async (req, res) => {
    const body = req.body;
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });
    try {
      const response = await reset(client, body)
      res.status(200).send(response);
    } catch (error) {
      console.error(error?.response)
      res.status(500).send({ message: error.message });
    }
  })

  async function reset (client, { id }) {
    return await client.query({
      data: {
        query: `mutation ChangeColorSchemeAndOrderSummary($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
          checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
            checkoutBranding {
              designSystem {
                colors {
                  schemes {
                    scheme1 {
                      base {
                        background
                        text
                      }
                    }
                  }
                }
              }
              customizations {
                orderSummary {
                  colorScheme
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
        `,
        variables: {
          "checkoutProfileId": id,
          "checkoutBrandingInput": {
            "designSystem": null,
            "customizations": null
          }
        }
      }
    })
  }

  async function upsert (client, { id, designSystem, customizations }) {
    fs.writeFile("./../template-2.json", JSON.stringify({ designSystem, customizations }), function (err) {
      if (err) throw err;
      console.log('complete');
    }
    );
    return await client.query({
      data: {
        query: `mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
                    checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
                      checkoutBranding {
                        designSystem {
                          #color
                          colors{
                            global{
                              accent
                              brand
                              success
                              info
                              warning
                              critical
                              decorative
                            }

                            # schemes
                            schemes{
                              scheme1{
                                base{
                                  background
                                  border
                                  text
                                  icon
                                  decorative
                                  accent
                                }
                                
                                control{
                                  text
                                  background
                                  border
                                  icon
                                  decorative
                                  accent
                                  selected{
                                    text
                                    background
                                    border
                                    icon
                                    decorative
                                    accent
                                  }
                                }
                                primaryButton{
                                  text
                                  background
                                  border
                                  decorative
                                  icon
                                  accent
                                  hover{
                                     text
                                    background
                                    border
                                    decorative
                                    icon
                                    accent
                                  }
                                }
                                secondaryButton{
                                  text
                                  background
                                  border
                                  decorative
                                  icon
                                  accent
                                  hover{
                                    text
                                    background
                                    border
                                    decorative
                                    icon
                                    accent
                                  }
                                }
                              }

                              scheme2{
                                base{
                                  background
                                  border
                                  text
                                  icon
                                  decorative
                                  accent
                                }
                                
                                control{
                                  text
                                  background
                                  border
                                  icon
                                  decorative
                                  accent
                                  selected{
                                    text
                                    background
                                    border
                                    icon
                                    decorative
                                    accent
                                  }
                                }
                                primaryButton{
                                  text
                                  background
                                  border
                                  decorative
                                  icon
                                  accent
                                  hover{
                                     text
                                    background
                                    border
                                    decorative
                                    icon
                                    accent
                                  }
                                }
                                secondaryButton{
                                  text
                                  background
                                  border
                                  decorative
                                  icon
                                  accent
                                  hover{
                                    text
                                    background
                                    border
                                    decorative
                                    icon
                                    accent
                                  }
                                }
                              }
                            }
                          }

                          cornerRadius {
                            base
                            large
                            small
                          }

                          # Typography
                          typography{
                            primary{
                              name
                              base{
                                  sources
                                  weight
                              }
                              bold{
                                sources
                                weight
                              }
                              loadingStrategy
                            }

                            secondary{
                              name
                              base{
                                  sources
                                  weight
                              }
                              bold{
                                sources
                                weight
                              }
                              loadingStrategy
                            }
                            
                            size{
                              base
                              ratio
                            }

                          }
                        }

                        customizations {
                          # This property group applies to the header layout containing your brand's name and logo
                          header {
                              alignment
                              position
                          }
                          # global
                          global {
                            cornerRadius
                            typography {
                              letterCase
                              kerning
                            }
                          }
                          main{
                            colorScheme
                          }

                          orderSummary{
                            colorScheme
                          }
                          
                          # control
                          control{
                            border
                            cornerRadius
                            color
                            labelPosition
                          }

                          # Text field
                          textField{
                            border
                            typography{
                              font
                              kerning
                              size
                              letterCase
                              weight
                            }
                          }
                          # select
                          select{
                            border
                            typography{
                              font
                              kerning
                              letterCase
                              size
                              weight
                            }
                          }
                          # checkbox
                          checkbox {
                            cornerRadius
                          }
                          
                          primaryButton{
                            background
                            border
                            cornerRadius
                            blockPadding
                            inlinePadding
                            typography{
                              font
                              kerning
                              letterCase
                              size
                              weight
                            }
                          }

                          secondaryButton{
                            background
                            border
                            cornerRadius
                            blockPadding
                            inlinePadding
                            typography{
                              font
                              kerning
                              letterCase
                              size
                              weight
                            }
                          }

                          headingLevel1{
                            typography{
                              font
                              kerning
                              letterCase
                              size
                              weight
                            }
                          }

                          headingLevel2{
                            typography{
                              font
                              kerning
                              letterCase
                              size
                              weight
                            }
                          }

                          headingLevel3{
                            typography{
                              font
                              kerning
                              letterCase
                              size
                              weight
                            }
                          }

                        }
                      }
                      userErrors {
                        field
                        message
                      }
                    }
                  }`,
        variables: {
          "checkoutProfileId": id,
          "checkoutBrandingInput": {
            "designSystem": {
              "colors": {
                "global": {
                  "brand": designSystem?.colors?.global?.brand,
                  "accent": designSystem?.colors?.global?.accent,
                  "success": designSystem?.colors?.global?.success,
                  "info": designSystem?.colors?.global?.info,
                  "warning": designSystem?.colors?.global?.warning,
                  "critical": designSystem?.colors?.global?.critical,
                  "decorative": designSystem?.colors?.global?.decorative,
                },
                "schemes": {
                  "scheme1": {
                    "base": {
                      "background": designSystem?.colors?.schemes?.scheme1?.base?.background,
                      "border": designSystem?.colors?.schemes?.scheme1?.base?.border,
                      "text": designSystem?.colors?.schemes?.scheme1?.base?.text,
                      "icon": designSystem?.colors?.schemes?.scheme1?.base?.icon,
                      "decorative": designSystem?.colors?.schemes?.scheme1?.base?.decorative,
                      "accent": designSystem?.colors?.schemes?.scheme1?.base?.accent,
                    },
                    "control": {
                      "text": designSystem?.colors?.schemes?.scheme1?.control?.text,
                      "background": designSystem?.colors?.schemes?.scheme1?.control?.background,
                      "border": designSystem?.colors?.schemes?.scheme1?.control?.border,
                      "icon": designSystem?.colors?.schemes?.scheme1?.control?.icon,
                      "decorative": designSystem?.colors?.schemes?.scheme1?.control?.decorative,
                      "accent": designSystem?.colors?.schemes?.scheme1?.control?.accent,
                      "selected": {
                        "text": designSystem?.colors?.schemes?.scheme1?.control?.selected?.text,
                        "background": designSystem?.colors?.schemes?.scheme1?.control?.selected?.background,
                        "border": designSystem?.colors?.schemes?.scheme1?.control?.selected?.border,
                        "icon": designSystem?.colors?.schemes?.scheme1?.control?.selected?.icon,
                        "decorative": designSystem?.colors?.schemes?.scheme1?.control?.selected?.decorative,
                        "accent": designSystem?.colors?.schemes?.scheme1?.control?.selected?.accent,
                      }
                    },
                    "primaryButton": {
                      "text": designSystem?.colors?.schemes?.scheme1?.primaryButton?.text,
                      "background": designSystem?.colors?.schemes?.scheme1?.primaryButton?.background,
                      "border": designSystem?.colors?.schemes?.scheme1?.primaryButton?.border,
                      "decorative": designSystem?.colors?.schemes?.scheme1?.primaryButton?.decorative,
                      "icon": designSystem?.colors?.schemes?.scheme1?.primaryButton?.icon,
                      "accent": designSystem?.colors?.schemes?.scheme1?.primaryButton?.accent,
                      "hover": {
                        "text": designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.text,
                        "background": designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.background,
                        "border": designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.border,
                        "decorative": designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.decorative,
                        "icon": designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.icon,
                        "accent": designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.accent,
                      }
                    },
                    "secondaryButton": {
                      "text": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.text,
                      "background": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.background,
                      "border": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.border,
                      "decorative": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.decorative,
                      "icon": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.icon,
                      "accent": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.accent,
                      "hover": {
                        "text": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.text,
                        "background": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.background,
                        "border": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.border,
                        "decorative": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.decorative,
                        "icon": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.icon,
                        "accent": designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.accent,
                      }
                    },
                  },

                  "scheme2": {
                    "base": {
                      "background": designSystem?.colors?.schemes?.scheme2?.base?.background,
                      "border": designSystem?.colors?.schemes?.scheme2?.base?.border,
                      "text": designSystem?.colors?.schemes?.scheme2?.base?.text,
                      "icon": designSystem?.colors?.schemes?.scheme2?.base?.icon,
                      "decorative": designSystem?.colors?.schemes?.scheme2?.base?.decorative,
                      "accent": designSystem?.colors?.schemes?.scheme2?.base?.accent,
                    },
                    "control": {
                      "text": designSystem?.colors?.schemes?.scheme2?.control?.text,
                      "background": designSystem?.colors?.schemes?.scheme2?.control?.background,
                      "border": designSystem?.colors?.schemes?.scheme2?.control?.border,
                      "icon": designSystem?.colors?.schemes?.scheme2?.control?.icon,
                      "decorative": designSystem?.colors?.schemes?.scheme2?.control?.decorative,
                      "accent": designSystem?.colors?.schemes?.scheme2?.control?.accent,
                      "selected": {
                        "text": designSystem?.colors?.schemes?.scheme2?.control?.selected?.text,
                        "background": designSystem?.colors?.schemes?.scheme2?.control?.selected?.background,
                        "border": designSystem?.colors?.schemes?.scheme2?.control?.selected?.border,
                        "icon": designSystem?.colors?.schemes?.scheme2?.control?.selected?.icon,
                        "decorative": designSystem?.colors?.schemes?.scheme2?.control?.selected?.decorative,
                        "accent": designSystem?.colors?.schemes?.scheme2?.control?.selected?.accent,
                      }
                    },
                    "primaryButton": {
                      "text": designSystem?.colors?.schemes?.scheme2?.primaryButton?.text,
                      "background": designSystem?.colors?.schemes?.scheme2?.primaryButton?.background,
                      "border": designSystem?.colors?.schemes?.scheme2?.primaryButton?.border,
                      "decorative": designSystem?.colors?.schemes?.scheme2?.primaryButton?.decorative,
                      "icon": designSystem?.colors?.schemes?.scheme2?.primaryButton?.icon,
                      "accent": designSystem?.colors?.schemes?.scheme2?.primaryButton?.accent,
                      "hover": {
                        "text": designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.text,
                        "background": designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.background,
                        "border": designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.border,
                        "decorative": designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.decorative,
                        "icon": designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.icon,
                        "accent": designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.accent,
                      }
                    },
                    "secondaryButton": {
                      "text": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.text,
                      "background": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.background,
                      "border": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.border,
                      "decorative": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.decorative,
                      "icon": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.icon,
                      "accent": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.accent,
                      "hover": {
                        "text": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.text,
                        "background": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.background,
                        "border": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.border,
                        "decorative": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.decorative,
                        "icon": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.icon,
                        "accent": designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.accent,
                      }
                    },
                  },
                },
              },
              "cornerRadius": {
                "base": designSystem?.cornerRadius?.base,
                "large": designSystem?.cornerRadius?.large,
                "small": designSystem?.cornerRadius?.small
              },
              "typography": {
                "primary": designSystem?.typography?.primary?.shopifyFontGroup?.name && !designSystem?.typography?.primary?.loadingStrategy ? {
                  "shopifyFontGroup": {
                    "name": designSystem?.typography?.primary?.shopifyFontGroup?.name,
                  }
                } : (
                  designSystem?.typography?.primary?.customFontGroup?.base?.genericFileId ?
                    { "customFontGroup": designSystem?.typography?.primary?.customFontGroup } : null
                ),

                "secondary": designSystem?.typography?.secondary?.shopifyFontGroup?.name && !designSystem?.typography?.secondary?.loadingStrategy ? {
                  "shopifyFontGroup": {
                    "name": designSystem?.typography?.secondary?.shopifyFontGroup?.name,
                  }
                } : (
                  designSystem?.typography?.secondary?.customFontGroup?.base?.genericFileId ?
                    { "customFontGroup": designSystem?.typography?.secondary?.customFontGroup } : null
                ),
                "size": {
                  "base": designSystem?.typography?.size?.base,
                  "ratio": designSystem?.typography?.size?.ratio,
                },
              },

            },
            "customizations": {
              "global": {
                "cornerRadius": customizations?.global?.cornerRadius,
                "typography": {
                  "letterCase": customizations?.global?.typography?.letterCase,
                  "kerning": customizations?.global?.typography?.kerning
                }
              },
              "favicon": {
                "mediaImageId": customizations?.favicon?.mediaImageId
              },
              "header": {
                "alignment": customizations?.header?.alignment,
                "position": customizations?.header?.position,
                "banner": {
                  "mediaImageId": customizations?.header?.banner?.mediaImageId
                },
                "logo": {
                  "image": {
                    "mediaImageId": customizations?.header?.logo?.image?.mediaImageId
                  },
                  "maxWidth": +customizations?.header?.logo?.maxWidth
                }
              },
              "main": {
                "colorScheme": customizations?.main?.colorScheme,
                "backgroundImage": {
                  "mediaImageId": customizations?.main?.backgroundImage?.mediaImageId
                },
              },
              "orderSummary": {
                "colorScheme": customizations?.orderSummary?.colorScheme,
                "backgroundImage": {
                  "mediaImageId": customizations?.orderSummary?.backgroundImage?.mediaImageId
                },
              },
              "control": {
                "border": customizations?.control?.border,
                "cornerRadius": customizations?.control?.cornerRadius,
                "color": customizations?.control?.color,
                "labelPosition": customizations?.control?.labelPosition
              },
              "textField": {
                "border": customizations?.textField?.border,
                "typography": {
                  "font": customizations?.textField?.typography?.font,
                  "kerning": customizations?.textField?.typography?.kerning,
                  "size": customizations?.textField?.typography?.size,
                  "letterCase": customizations?.textField?.typography?.letterCase,
                  "weight": customizations?.textField?.typography?.weight
                }
              },
              "select": {
                "border": customizations?.select?.border,
                "typography": {
                  "font": customizations?.select?.typography?.font,
                  "kerning": customizations?.select?.typography?.kerning,
                  "letterCase": customizations?.select?.typography?.letterCase,
                  "size": customizations?.select?.typography?.size,
                  "weight": customizations?.select?.typography?.weight
                }
              },
              "checkbox": {
                "cornerRadius": customizations?.checkbox?.cornerRadius
              },
              "primaryButton": {
                "background": customizations?.primaryButton?.background,
                "border": customizations?.primaryButton?.border,
                "cornerRadius": customizations?.primaryButton?.cornerRadius,
                "blockPadding": customizations?.primaryButton?.blockPadding,
                "inlinePadding": customizations?.primaryButton?.inlinePadding,
                "typography": {
                  "font": customizations?.primaryButton?.typography?.font,
                  "kerning": customizations?.primaryButton?.typography?.kerning,
                  "letterCase": customizations?.primaryButton?.typography?.letterCase,
                  "size": customizations?.primaryButton?.typography?.size,
                  "weight": customizations?.primaryButton?.typography?.weight
                }
              },
              "secondaryButton": {
                "background": customizations?.secondaryButton?.background,
                "border": customizations?.secondaryButton?.border,
                "cornerRadius": customizations?.secondaryButton?.cornerRadius,
                "blockPadding": customizations?.secondaryButton?.blockPadding,
                "inlinePadding": customizations?.secondaryButton?.inlinePadding,
                "typography": {
                  "font": customizations?.secondaryButton?.typography?.font,
                  "kerning": customizations?.secondaryButton?.typography?.kerning,
                  "letterCase": customizations?.secondaryButton?.typography?.letterCase,
                  "size": customizations?.secondaryButton?.typography?.size,
                  "weight": customizations?.secondaryButton?.typography?.weight
                }
              },
              "headingLevel1": {
                "typography": {
                  "font": customizations?.headingLevel1?.typography?.font,
                  "kerning": customizations?.headingLevel1?.typography?.kerning,
                  "letterCase": customizations?.headingLevel1?.typography?.letterCase,
                  "size": customizations?.headingLevel1?.typography?.size,
                  "weight": customizations?.headingLevel1?.typography?.weight
                }
              },
              "headingLevel2": {
                "typography": {
                  "font": customizations?.headingLevel2?.typography?.font,
                  "kerning": customizations?.headingLevel2?.typography?.kerning,
                  "letterCase": customizations?.headingLevel2?.typography?.letterCase,
                  "size": customizations?.headingLevel2?.typography?.size,
                  "weight": customizations?.headingLevel2?.typography?.weight
                }
              },
              "headingLevel3": {
                "typography": {
                  "font": customizations?.headingLevel3?.typography?.font,
                  "kerning": customizations?.headingLevel3?.typography?.kerning,
                  "letterCase": customizations?.headingLevel3?.typography?.letterCase,
                  "size": customizations?.headingLevel3?.typography?.size,
                  "weight": customizations?.headingLevel3?.typography?.weight
                }
              }

            }
          }
        },
      },
    })
  }

  app.get("/api/branding/is-compatible", async (req, res) => {
    try {
      const { session } = res.locals.shopify;
      const client = new shopify.api.clients.Graphql({ session });

      const response = await client.query({
        data: `
          query {
            shop {
                plan {
                  shopifyPlus
                }
              }
            }
          `
      });

      const shopifyPlus = response.body.data.shop.plan.shopifyPlus;
      // Send back a JSON response with 'shopifyPlus' as a property
      res.status(200).json({ shopifyPlus });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching the Shopify plan." });
    }
  });

  async function getCurrent (client, profileId) {
    return await client.query({
      data: `
          query {
              checkoutBranding(checkoutProfileId: "${profileId}") {
                  designSystem { 
                    # This property group applies to global corner radius token values
                    colors {
                      global{
                        accent
                        brand
                        success
                        info
                        warning
                        critical
                        decorative
                      }

                      schemes{
                        
                        scheme1{
                          base{
                            background
                            border
                            text
                            icon
                            decorative
                            accent
                          }
                          
                          control{
                            text
                            background
                            border
                            icon
                            decorative
                            accent
                            selected{
                              text
                              background
                              border
                              icon
                              decorative
                              accent
                            }
                          }
                          primaryButton{
                            text
                            background
                            border
                            decorative
                            icon
                            accent
                            hover{
                               text
                              background
                              border
                              decorative
                              icon
                              accent
                            }
                          }
                          secondaryButton{
                            text
                            background
                            border
                            decorative
                            icon
                            accent
                            hover{
                              text
                              background
                              border
                              decorative
                              icon
                              accent
                            }
                          }
                        }

                        scheme2{
                          base{
                            background
                            border
                            text
                            icon
                            decorative
                            accent
                          }
                          
                          control{
                            text
                            background
                            border
                            icon
                            decorative
                            accent
                            selected{
                              text
                              background
                              border
                              icon
                              decorative
                              accent
                            }
                          }
                          primaryButton{
                            text
                            background
                            border
                            decorative
                            icon
                            accent
                            hover{
                               text
                              background
                              border
                              decorative
                              icon
                              accent
                            }
                          }
                          secondaryButton{
                            text
                            background
                            border
                            decorative
                            icon
                            accent
                            hover{
                              text
                              background
                              border
                              decorative
                              icon
                              accent
                            }
                          }
                        }
                        
                      }
                    }

                    cornerRadius {
                      base
                      large
                      small
                    }

                    # Typography
                    typography{
                      primary{
                        name
                        base{
                            sources
                            weight
                        }
                        bold{
                          sources
                          weight
                        }
                        loadingStrategy
                      }
                      
                      secondary{
                        name
                        base{
                            sources
                            weight
                        }
                        bold{
                          sources
                          weight
                        }
                        loadingStrategy
                      }
                      
                      size{
                        base
                        ratio
                      }
                    }

                  }

                  customizations {
                    global {
                      cornerRadius
                      typography {
                        letterCase
                        kerning
                      }
                    }
                    header{
                      alignment
                      position
                      banner {
                        image {
                          id
                          url
                        }
                      }
                      logo {
                        maxWidth
                        image {
                          id
                          url
                        }
                      }
                    }
                    favicon {
                      image {
                        id
                        url
                      }
                    }
                    main{
                      colorScheme
                      backgroundImage {
                        image {
                          id
                          url
                        }
                      }
                    } 
                    orderSummary{
                      colorScheme
                      backgroundImage {
                        image {
                          id
                          url
                        }
                      }
                    }

                    control{
                      border
                      cornerRadius
                      color
                      labelPosition
                    }

                    textField{
                      border
                      typography{
                        font
                        kerning
                        size
                        letterCase
                        weight
                      }
                    }
                    select{
                      border
                      typography{
                        font
                        kerning
                        letterCase
                        size
                        weight
                      }
                    }
                    checkbox{
                      cornerRadius
                    }

                    primaryButton{
                      background
                      border
                      cornerRadius
                      blockPadding
                      inlinePadding
                      typography{
                        font
                        kerning
                        letterCase
                        size
                        weight
                      }
                    }

                    secondaryButton{
                      background
                      border
                      cornerRadius
                      blockPadding
                      inlinePadding
                      typography{
                        font
                        kerning
                        letterCase
                        size
                        weight
                      }
                    }

                    headingLevel1{
                      typography{
                        font
                        kerning
                        letterCase
                        size
                        weight
                      }
                    }

                    headingLevel2{
                      typography{
                        font
                        kerning
                        letterCase
                        size
                        weight
                      }
                    }

                    headingLevel3{
                      typography{
                        font
                        kerning
                        letterCase
                        size
                        weight
                      }
                    }
                      
                  }
              }
          }
            `,
    })
  }

  app.post("/api/branding/upload", async (req, res) => {
    const body = req.body;
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });

    const { body: { data: { fileCreate: { files: [image] } } } } = await client.query({
      data: {
        query: `
                mutation fileCreate($files: [FileCreateInput!]!) {
                  fileCreate(files: $files) {
                    files {
                      id
                      alt
                      createdAt
                    }
                  }
                }`,
        variables: {
          "files": [
            {
              "alt": "custom-image",
              "filename": body.name,
              "originalSource": body.url
            }
          ]
        }
      }
    })

    res.status(200).json(image)
  })
  app.post("/api/branding/set-template", async (req, res) => {
    const { id, template, primaryColor } = req.body;
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });
    try {
      const file = fs.readFileSync(`./frontend/assets/${template}.json`)
      const data = JSON.parse(file)
      if (primaryColor) {
        data.designSystem.colors.schemes.scheme1.primaryButton.background = primaryColor
        data.designSystem.colors.schemes.scheme2.primaryButton.background = primaryColor
      }
      const response = await upsert(client, { id, ...data })
      res.status(200).send(response);
    } catch (error) {
      console.error(error?.response)
      res.status(500).send({ message: error.message });
    }
  })
}
