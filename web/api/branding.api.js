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
              "header": {
                "alignment": profileData?.customizations.header?.alignment,
                "position": profileData?.customizations.header?.position
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
                    header{
                      alignment
                      position
                    }
                  }
              }
          }
            `,
    })
  }
}
