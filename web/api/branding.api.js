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
              "colors": {
                "global": {
                  "brand": profileData?.designSystem?.colors?.global?.brand,
                  "accent": profileData?.designSystem?.colors?.global?.accent,
                  "success": profileData?.designSystem?.colors?.global?.success,
                  "info": profileData?.designSystem?.colors?.global?.info,
                  "warning": profileData?.designSystem?.colors?.global?.warning,
                  "critical": profileData?.designSystem?.colors?.global?.critical,
                  "decorative": profileData?.designSystem?.colors?.global?.decorative,
                },
                "schemes": {
                  "scheme1": {
                    "base": {
                      "background": profileData?.designSystem?.colors?.schemes?.scheme1?.base?.background,
                      "border": profileData?.designSystem?.colors?.schemes?.scheme1?.base?.border,
                      "text": profileData?.designSystem?.colors?.schemes?.scheme1?.base?.text,
                      "icon": profileData?.designSystem?.colors?.schemes?.scheme1?.base?.icon,
                      "decorative": profileData?.designSystem?.colors?.schemes?.scheme1?.base?.decorative,
                      "accent": profileData?.designSystem?.colors?.schemes?.scheme1?.base?.accent,
                    },
                    "control": {
                      "text": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.text,
                      "background": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.background,
                      "border": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.border,
                      "icon": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.icon,
                      "decorative": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.decorative,
                      "accent": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.accent,
                      "selected": {
                        "text": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.text,
                        "background": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.background,
                        "border": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.border,
                        "icon": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.icon,
                        "decorative": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.decorative,
                        "accent": profileData?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.accent,
                      }
                    },
                    "primaryButton": {
                      "text": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.text,
                      "background": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.background,
                      "border": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.border,
                      "decorative": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.decorative,
                      "icon": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.icon,
                      "accent": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.accent,
                      "hover": {
                        "text": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.text,
                        "background": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.background,
                        "border": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.border,
                        "decorative": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.decorative,
                        "icon": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.icon,
                        "accent": profileData?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.accent,
                      }
                    },
                    "secondaryButton": {
                      "text": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.text,
                      "background": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.background,
                      "border": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.border,
                      "decorative": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.decorative,
                      "icon": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.icon,
                      "accent": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.accent,
                      "hover": {
                        "text": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.text,
                        "background": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.background,
                        "border": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.border,
                        "decorative": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.decorative,
                        "icon": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.icon,
                        "accent": profileData?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.accent,
                      }
                    },    
                  },
        
                  "scheme2": {
                    "base": {
                      "background": profileData?.designSystem?.colors?.schemes?.scheme2?.base?.background,
                      "border": profileData?.designSystem?.colors?.schemes?.scheme2?.base?.border,
                      "text": profileData?.designSystem?.colors?.schemes?.scheme2?.base?.text,
                      "icon": profileData?.designSystem?.colors?.schemes?.scheme2?.base?.icon,
                      "decorative": profileData?.designSystem?.colors?.schemes?.scheme2?.base?.decorative,
                      "accent": profileData?.designSystem?.colors?.schemes?.scheme2?.base?.accent,
                    },
                    "control": {
                      "text": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.text,
                      "background": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.background,
                      "border": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.border,
                      "icon": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.icon,
                      "decorative": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.decorative,
                      "accent": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.accent,
                      "selected": {
                        "text": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.text,
                        "background": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.background,
                        "border": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.border,
                        "icon": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.icon,
                        "decorative": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.decorative,
                        "accent": profileData?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.accent,
                      }
                    },
                    "primaryButton": {
                      "text": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.text,
                      "background": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.background,
                      "border": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.border,
                      "decorative": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.decorative,
                      "icon": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.icon,
                      "accent": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.accent,
                      "hover": {
                        "text": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.text,
                        "background": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.background,
                        "border": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.border,
                        "decorative": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.decorative,
                        "icon": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.icon,
                        "accent": profileData?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.accent,
                      }
                    },
                    "secondaryButton": {
                      "text": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.text,
                      "background": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.background,
                      "border": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.border,
                      "decorative": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.decorative,
                      "icon": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.icon,
                      "accent": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.accent,
                      "hover": {
                        "text": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.text,
                        "background": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.background,
                        "border": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.border,
                        "decorative": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.decorative,
                        "icon": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.icon,
                        "accent": profileData?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.accent,
                      }
                    },    
                  },
        

                }

              },
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
