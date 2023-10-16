export default function brandingApiEndPoints (app, shopify) {
  app.get("/api/branding", async (req, res) => {
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });
    try {
      const { body: { data: { checkoutProfiles: { edges } } } } = await client.query({
        data: `query checkoutProfiles {
                        checkoutProfiles(first: 10) {
                            edges {
                                node {
                                    name
                                    id
                                    isPublished
                                }
                            }
                        }
                    }`
      });
      const selectedProfile = edges.find(edge => (req.query.id ? edge.node.id == req.query.id : edge.node.isPublished == true))
      const profiles = edges.map(edge => edge.node)
      const { body: { data: { checkoutBranding: currentProfileData } } } = await getCurrent(client, selectedProfile.node.id)
      res.status(200).send({ ...selectedProfile.node, ...currentProfileData, profiles });
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
      console.error(error?.response)
      res.status(500).send({ message: error.message });
    }
  })

  async function upsert (client, profileData) {
    return await client.query({
      data: {
        "query": `mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
                    checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
                      checkoutBranding {
                        designSystem {
                          # This property group applies to global corner radius token values
                          cornerRadius {
                            small
                            base
                            large
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
                  
        "variables": {
          "checkoutProfileId": profileData?.id,
          "checkoutBrandingInput": {
            "designSystem": {
              "cornerRadius": {
                "small": 3,
                "base": 5,
                "large": 30
              }
            },
            "customizations": {
              "global": {
                "cornerRadius": profileData?.customizations.global?.cornerRadius,
                "typography": {
                  "letterCase": profileData?.customizations.global?.typography?.letterCase,
                  "kerning": profileData?.customizations.global?.typography?.kerning
                }
              },
              "header": {
                "alignment": profileData?.customizations?.header?.alignment,
                "position": profileData?.customizations?.header?.position
              },
              "main": {
                "colorScheme": profileData?.customizations?.main?.colorScheme
              },
              "orderSummary": {
                "colorScheme": profileData?.customizations?.orderSummary?.colorScheme
              },
              "control": {
                "border": profileData?.customizations?.control?.border,
                "cornerRadius": profileData?.customizations?.control?.cornerRadius,
                "color": profileData?.customizations?.control?.color,
                "labelPosition": profileData?.customizations?.control?.labelPosition
              },
              "textField": {
                "border": profileData?.customizations?.textField?.border,
                "typography": {
                  "font": profileData?.customizations?.textField?.typography?.font,
                  "kerning": profileData?.customizations?.textField?.typography?.kerning,
                  "size": profileData?.customizations?.textField?.typography?.size,
                  "letterCase": profileData?.customizations?.textField?.typography?.letterCase,
                  "weight": profileData?.customizations?.textField?.typography?.weight
                }
              },
              "select": {
                "border": profileData?.customizations?.select?.border,
                "typography": {
                  "font": profileData?.customizations?.select?.typography?.font,
                  "kerning": profileData?.customizations?.select?.typography?.kerning,
                  "letterCase": profileData?.customizations?.select?.typography?.letterCase,
                  "size": profileData?.customizations?.select?.typography?.size,
                  "weight": profileData?.customizations?.select?.typography?.weight
                }
              },
              "checkbox": {
                "cornerRadius": profileData?.customizations?.checkbox?.cornerRadius
              },
              "primaryButton": {
                "background": profileData?.customizations?.primaryButton?.background,
                "border": profileData?.customizations?.primaryButton?.border,
                "cornerRadius": profileData?.customizations?.primaryButton?.cornerRadius,
                "blockPadding": profileData?.customizations?.primaryButton?.blockPadding,
                "inlinePadding": profileData?.customizations?.primaryButton?.inlinePadding,
                "typography": {
                  "font": profileData?.customizations?.primaryButton?.typography?.font,
                  "kerning": profileData?.customizations?.primaryButton?.typography?.kerning,
                  "letterCase": profileData?.customizations?.primaryButton?.typography?.letterCase,
                  "size": profileData?.customizations?.primaryButton?.typography?.size,
                  "weight": profileData?.customizations?.primaryButton?.typography?.weight
                }
              },
              "secondaryButton": {
                "background": profileData?.customizations?.secondaryButton?.background,
                "border": profileData?.customizations?.secondaryButton?.border,
                "cornerRadius": profileData?.customizations?.secondaryButton?.cornerRadius,
                "blockPadding": profileData?.customizations?.secondaryButton?.blockPadding,
                "inlinePadding": profileData?.customizations?.secondaryButton?.inlinePadding,
                "typography": {
                  "font": profileData?.customizations?.secondaryButton?.typography?.font,
                  "kerning": profileData?.customizations?.secondaryButton?.typography?.kerning,
                  "letterCase": profileData?.customizations?.secondaryButton?.typography?.letterCase,
                  "size": profileData?.customizations?.secondaryButton?.typography?.size,
                  "weight": profileData?.customizations?.secondaryButton?.typography?.weight
                }
              },
              "headingLevel1": {
                "typography": {
                  "font": profileData?.customizations?.headingLevel1?.typography?.font,
                  "kerning": profileData?.customizations?.headingLevel1?.typography?.kerning,
                  "letterCase": profileData?.customizations?.headingLevel1?.typography?.letterCase,
                  "size": profileData?.customizations?.headingLevel1?.typography?.size,
                  "weight": profileData?.customizations?.headingLevel1?.typography?.weight
                }
              },
              "headingLevel2": {
                "typography": {
                  "font": profileData?.customizations?.headingLevel2?.typography?.font,
                  "kerning": profileData?.customizations?.headingLevel2?.typography?.kerning,
                  "letterCase": profileData?.customizations?.headingLevel2?.typography?.letterCase,
                  "size": profileData?.customizations?.headingLevel2?.typography?.size,
                  "weight": profileData?.customizations?.headingLevel2?.typography?.weight
                }
              },
              "headingLevel3": {
                "typography": {
                  "font": profileData?.customizations?.headingLevel3?.typography?.font,
                  "kerning": profileData?.customizations?.headingLevel3?.typography?.kerning,
                  "letterCase": profileData?.customizations?.headingLevel3?.typography?.letterCase,
                  "size": profileData?.customizations?.headingLevel3?.typography?.size,
                  "weight": profileData?.customizations?.headingLevel3?.typography?.weight
                }
              }

            }
          }
        },
      },
    })
  }

  async function getCurrent (client, profileId) {
    return await client.query({
      data: `
          query {
              checkoutBranding(checkoutProfileId: "${profileId}") {
                  designSystem { 
                    # This property group applies to global corner radius token values
                    cornerRadius {
                      small
                      base
                      large
                    }

                    colors {
                      global {
                        # This global accent property applies to the color of all links and interactive components
                        accent
                      }
                      schemes {
                        # This color scheme applies to the main checkout form
                        scheme1 {
                          base {
                            background
                            text
                          }
                          # This color group applies to primary buttons within this color scheme
                          primaryButton {
                            background
                            text
                            accent
                          }
                        }
                        # This color scheme applies to the order summary
                        scheme2 {
                          base {
                            background
                            text
                          }
                        }
                      }
                    }

                    # This property group applies to global typography font faces, sizes, and weights
                    typography {
                      size {
                        base
                        ratio
                      }
                      primary {
                        base {
                          sources
                          weight
                        }
                      }
                      secondary {
                        base {
                          sources
                          weight
                        }
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
                    }
                    main{
                      colorScheme
                    }

                    orderSummary{
                      colorScheme
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
}
