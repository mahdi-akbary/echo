import { supabase } from "../supabase/service.js";

export default function brandingApiEndPoints(app, shopify) {
  app.get("/api/branding", async (req, res) => {
    const { session } = res.locals.shopify;
    const client = new shopify.api.clients.Graphql({ session });
    try {
      const { body: { data: { checkoutProfiles: { edges } } } } = await client.query({
        data: `query checkoutProfiles {
                        checkoutProfiles(first: 10) {
                            edges {
                                node {
                                    id
                                    isPublished
                                }
                            }
                        }
                    }`
      });
      const publishedProfile = edges.find(edge => edge.node.isPublished == true)
      res.status(200).send(publishedProfile.node);
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
      const response = await upsert(client, body.id)
      res.status(200).send(response);
    } catch (error) {
      console.error(error?.response)
      res.status(500).send({ message: error.message });
    }
  })

  async function upsert(client, profileId) {
    console.log(profileId, '<<<<<')
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
                          colorPalette {
                            # This property group applies to the body background
                            # (For example, the checkout loading page or payment processing page)
                            canvas {
                              background
                              foreground
                            }
                            # This property group applies to the main checkout form
                            color1 {
                              background
                              foreground
                            }
                            # This property group applies to the order summary
                            color2 {
                              background
                              foreground
                            }
                            # This property group applies to the primary button
                            primary {
                              accent
                              foreground
                              background
                            }
                            # This property group applies to the color of links and interactive components
                            interactive {
                              accent
                              foreground
                              background
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
                        # This property group applies globally to all instances of the inner properties
                          global {
                            cornerRadius
                            typography {
                              letterCase
                            }
                          }
                          # This property group applies to the header layout containing your brand's name and logo
                          header {
                              alignment
                              position
                          }
                          # headingLevel property groups apply to the full heirarchy of headings in checkout
                          headingLevel1 {
                            typography {
                              weight
                              font
                              letterCase
                              size
                            }
                          }
                          headingLevel2 {
                            typography {
                              weight
                              font
                              letterCase
                            }
                          }
                          # This property group applies to the look and feel of the primary checkout call-to-action
                          primaryButton {
                            cornerRadius
                            typography {
                              letterCase
                              weight
                              font
                              size
                            }
                            blockPadding
                            inlinePadding
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
          "checkoutProfileId": profileId,
          "checkoutBrandingInput": {
            "designSystem": {
              "cornerRadius": {
                "large": 30,
                "base": 25
              },
              "colorPalette": {
                "canvas": {
                  "background": "#FFE926",
                  "foreground": "#ff0000"
                },
                "color1": {
                  "background": "#FFFAFD",
                  "foreground": "#ff0000"
                },
                "color2": {
                  "background": "#FFF5FB",
                  "foreground": "#2E001E"
                },
                "primary": {
                  "accent": "#1773B0",
                  "background": "#FF9CDD",
                  "foreground": "#2E001E"
                },
                "interactive": {
                  "accent": "#D10088",
                  "foreground": "#D10088",
                  "background": null
                }
              },
              "typography": {
                "size": {
                  "base": 16,
                  "ratio": 1.4
                },
                "primary": {
                  "shopifyFontGroup": {
                    "name": "Sans-serif"
                  }
                },
                "secondary": {
                  "shopifyFontGroup": {
                    "name": "Oswald"
                  }
                }
              }
            },
            "customizations": {
              "global": {
                "cornerRadius": "NONE",
                "typography": {
                  "letterCase": "NONE"
                }
              },
              "header": {
                "alignment": "CENTER",
                "position": "START"
              },
              "headingLevel1": {
                "typography": {
                  "weight": "BOLD",
                  "font": "SECONDARY",
                  "letterCase": "UPPER",
                  "size": "LARGE"
                }
              },
              "headingLevel2": {
                "typography": {
                  "size": "EXTRA_LARGE",
                  "kerning": "LOOSE",
                  "letterCase": "UPPER"
                }
              },
              "primaryButton": {
                "cornerRadius": "BASE",
                "typography": {
                  "letterCase": "UPPER",
                  "weight": "BASE",
                  "font": "SECONDARY",
                  "size": "MEDIUM"
                },
                "blockPadding": "TIGHT",
                "inlinePadding": "BASE"
              }
            }
          }
        },
      },
    })
  }



  async function getCurrent(client, profileId) {
    console.log(profileId, '<<<<<')
    return await client.query({
      data: `
          query {
              checkoutBranding(checkoutProfileId: "${profileId}") {
                  designSystem { 
                        cornerRadius {
                            small
                            base
                            large
                          }
                          colorPalette {
                            # This property group applies to the body background
                            # (For example, the checkout loading page or payment processing page)
                            canvas {
                              background
                              foreground
                            }
                            # This property group applies to the main checkout form
                            color1 {
                              background
                              foreground
                            }
                            # This property group applies to the order summary
                            color2 {
                              background
                              foreground
                            }
                            # This property group applies to the primary button
                            primary {
                              accent
                              foreground
                              background
                            }
                            # This property group applies to the color of links and interactive components
                            interactive {
                              accent
                              foreground
                              background
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
                  # This property group applies globally to all instances of the inner properties
                    global {
                      cornerRadius
                      typography {
                        letterCase
                      }
                    }
                    # This property group applies to the header layout containing your brand's name and logo
                    header {
                        alignment
                        position
                    }
                    # headingLevel property groups apply to the full heirarchy of headings in checkout
                    headingLevel1 {
                      typography {
                        weight
                        font
                        letterCase
                        size
                      }
                    }
                    headingLevel2 {
                      typography {
                        weight
                        font
                        letterCase
                      }
                    }
                    # This property group applies to the look and feel of the primary checkout call-to-action
                    primaryButton {
                      cornerRadius
                      typography {
                        letterCase
                        weight
                        font
                        size
                      }
                      blockPadding
                      inlinePadding
                    }
                  }
              }
          }
            `,
    })
  }
}
