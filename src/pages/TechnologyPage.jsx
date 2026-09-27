import { useNavigate } from "react-router-dom";

export default function TechnologyPage() {
  const navigate = useNavigate();

  const agents = [
    {
      number: "01",
      title: "Customer Shopping Agent",
      text:
        "Helps customers discover products, search the marketplace, browse categories, manage wishlist and cart, move through checkout and track orders using natural conversation.",
    },
    {
      number: "02",
      title: "Customer Support Agent",
      text:
        "Handles post-purchase assistance such as order status, delivery questions, returns, refunds, payment questions and other customer-service requests.",
    },
    {
      number: "03",
      title: "Admin Intelligence Agent",
      text:
        "Lets business users ask questions about revenue, orders, customers, trending products and inventory using structured analytics tools connected to business data.",
    },
  ];

  const flow = [
    {
      title: "Speak",
      text:
        "The customer or admin asks PakShop for something naturally.",
    },
    {
      title: "Understand",
      text:
        "The AI agent determines the intent, context and correct capability to use.",
    },
    {
      title: "Execute",
      text:
        "A connected tool performs the real storefront, support or analytics action.",
    },
    {
      title: "Update",
      text:
        "The application and assistant response reflect the actual result.",
    },
  ];

  const architectureLayers = [
    {
      label: "Experience Layer",
      title: "React Commerce Interface",
      text:
        "The storefront, admin dashboard and dedicated technology experience are built with React and Vite.",
      items: [
        "Customer Storefront",
        "Admin Dashboard",
        "Responsive UI",
      ],
    },
    {
      label: "Conversational Layer",
      title: "AIROMOB Voice SDK",
      text:
        "AIROMOB provides the conversational interface and connects natural user requests with PakShop's specialized agents.",
      items: [
        "Voice Interaction",
        "Intent Understanding",
        "Agent Context",
      ],
    },
    {
      label: "Agent Layer",
      title: "Specialized AI Agents",
      text:
        "Different agents are responsible for customer shopping, customer support and business analytics.",
      items: [
        "Shopping Agent",
        "Support Agent",
        "Admin Agent",
      ],
    },
    {
      label: "Action Layer",
      title: "PakShop Tools",
      text:
        "Agents use deterministic tools instead of pretending actions happened. Tools connect AI intent to real application logic.",
      items: [
        "Product Search",
        "Cart & Wishlist",
        "Checkout",
        "Order Tracking",
        "Analytics Queries",
      ],
    },
    {
      label: "Data Layer",
      title: "API & Business Data",
      text:
        "Commerce and analytics tools access structured application data through backend services and database-backed workflows.",
      items: [
        "Node.js APIs",
        "MongoDB",
        "Orders",
        "Products",
        "Customers",
      ],
    },
  ];

  const technologies = [
    "React",
    "Vite",
    "AIROMOB Voice SDK",
    "JavaScript",
    "React Router",
    "Node.js",
    "Express",
    "MongoDB",
    "REST APIs",
    "Vercel",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8f5",
        color: "#123f32",
        fontFamily: "inherit",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(16px)",
          borderBottom:
            "1px solid rgba(18, 63, 50, 0.08)",
        }}
      >
        <div
          style={{
            width: "min(1180px, 88%)",
            margin: "0 auto",
            minHeight: "74px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              border: "none",
              background: "transparent",
              color: "#123f32",
              display: "flex",
              alignItems: "center",
              gap: "11px",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                background: "#123f32",
                color: "#e3c578",
                fontWeight: "800",
                fontSize: "17px",
              }}
            >
              P
            </span>

            <span
              style={{
                fontSize: "21px",
                fontWeight: "800",
              }}
            >
              PakShop
            </span>
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              border:
                "1px solid rgba(18,63,50,0.14)",
              background: "#ffffff",
              color: "#123f32",
              borderRadius: "999px",
              padding: "11px 18px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            ← Back to Store
          </button>
        </div>
      </header>

      <main
        style={{
          width: "min(1180px, 88%)",
          margin: "0 auto",
          padding: "84px 0 100px",
        }}
      >
        {/* HERO */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.25fr) minmax(280px, 0.75fr)",
            gap: "60px",
            alignItems: "center",
            marginBottom: "90px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 18px",
                color: "#b28a45",
                fontSize: "11px",
                fontWeight: "900",
                letterSpacing: "0.18em",
              }}
            >
              PAKSHOP TECHNOLOGY
            </p>

            <h1
              style={{
                margin: 0,
                maxWidth: "760px",
                fontSize:
                  "clamp(44px, 6vw, 76px)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                fontWeight: "500",
              }}
            >
              Commerce powered by
              <span
                style={{
                  display: "block",
                  marginTop: "8px",
                  color: "#b28a45",
                }}
              >
                intelligent agents.
              </span>
            </h1>

            <p
              style={{
                maxWidth: "720px",
                margin: "30px 0 0",
                color: "#66766f",
                fontSize: "17px",
                lineHeight: 1.8,
              }}
            >
              PakShop combines a modern
              multi-category commerce
              experience with
              conversational AI,
              specialized agents,
              deterministic action tools
              and structured business
              data.
            </p>
          </div>

          <div
            style={{
              padding: "28px",
              borderRadius: "24px",
              background: "#ffffff",
              border:
                "1px solid rgba(18,63,50,0.08)",
              boxShadow:
                "0 20px 60px rgba(18,63,50,0.07)",
            }}
          >
            <p
              style={{
                margin: "0 0 16px",
                color: "#9b7a3b",
                fontSize: "10px",
                fontWeight: "900",
                letterSpacing: "0.16em",
              }}
            >
              AGENTIC COMMERCE
            </p>

            <div
              style={{
                fontSize: "26px",
                fontWeight: "800",
                lineHeight: 1.35,
                marginBottom: "18px",
              }}
            >
              Ask PakShop.
              <br />
              PakShop acts.
            </div>

            <p
              style={{
                margin: 0,
                color: "#748079",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              The assistant does more
              than answer questions.
              Connected tools can update
              the storefront, manage
              shopping state and query
              business analytics.
            </p>
          </div>
        </section>

        {/* AGENTS */}
        <section
          style={{
            marginBottom: "84px",
          }}
        >
          <div
            style={{
              marginBottom: "28px",
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                color: "#b28a45",
                fontSize: "10px",
                fontWeight: "900",
                letterSpacing: "0.16em",
              }}
            >
              SPECIALIZED AGENTS
            </p>

            <h2
              style={{
                margin: 0,
                fontSize:
                  "clamp(30px, 4vw, 44px)",
                letterSpacing: "-0.025em",
              }}
            >
              One platform. Different
              responsibilities.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "18px",
            }}
          >
            {agents.map(
              ({
                number,
                title,
                text,
              }) => (
                <article
                  key={number}
                  style={{
                    background: "#ffffff",
                    padding: "28px",
                    borderRadius: "20px",
                    border:
                      "1px solid rgba(18,63,50,0.08)",
                    boxShadow:
                      "0 12px 30px rgba(18,63,50,0.04)",
                  }}
                >
                  <span
                    style={{
                      color: "#b28a45",
                      fontSize: "10px",
                      fontWeight: "900",
                    }}
                  >
                    {number}
                  </span>

                  <h3
                    style={{
                      margin:
                        "17px 0 12px",
                      fontSize: "19px",
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#718078",
                      fontSize: "13px",
                      lineHeight: 1.75,
                    }}
                  >
                    {text}
                  </p>
                </article>
              )
            )}
          </div>
        </section>

        {/* FLOW */}
        <section
          style={{
            padding:
              "clamp(34px, 5vw, 56px)",
            background: "#123f32",
            color: "#ffffff",
            borderRadius: "26px",
            marginBottom: "84px",
            boxShadow:
              "0 25px 60px rgba(18,63,50,0.14)",
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              color: "#dfbe72",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "0.16em",
            }}
          >
            INTERACTION FLOW
          </p>

          <h2
            style={{
              margin:
                "0 0 34px",
              fontSize:
                "clamp(28px, 4vw, 44px)",
              fontWeight: "500",
              letterSpacing:
                "-0.025em",
            }}
          >
            Speak → Understand → Execute
            → Update
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            {flow.map(
              ({ title, text }) => (
                <div
                  key={title}
                  style={{
                    padding: "22px",
                    borderRadius: "15px",
                    background:
                      "rgba(255,255,255,0.08)",
                    border:
                      "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      marginBottom: "9px",
                      color: "#f1d796",
                      fontSize: "13px",
                    }}
                  >
                    {title}
                  </strong>

                  <p
                    style={{
                      margin: 0,
                      color:
                        "rgba(255,255,255,0.72)",
                      fontSize: "12px",
                      lineHeight: 1.65,
                    }}
                  >
                    {text}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section
          style={{
            marginBottom: "84px",
          }}
        >
          <div
            style={{
              maxWidth: "760px",
              marginBottom: "34px",
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                color: "#b28a45",
                fontSize: "10px",
                fontWeight: "900",
                letterSpacing: "0.16em",
              }}
            >
              SYSTEM ARCHITECTURE
            </p>

            <h2
              style={{
                margin: "0 0 16px",
                fontSize:
                  "clamp(30px, 4vw, 44px)",
                letterSpacing: "-0.03em",
              }}
            >
              From conversation to real
              application actions.
            </h2>

            <p
              style={{
                margin: 0,
                color: "#718078",
                lineHeight: 1.8,
                fontSize: "15px",
              }}
            >
              PakShop separates the
              conversational experience,
              agents, tools and data
              layers so each part has a
              clear responsibility.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            {architectureLayers.map(
              ({
                label,
                title,
                text,
                items,
              }) => (
                <div
                  key={title}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "180px minmax(220px, 0.8fr) 1.4fr",
                    gap: "28px",
                    alignItems: "center",
                    padding: "24px 26px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    border:
                      "1px solid rgba(18,63,50,0.08)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "block",
                        marginBottom:
                          "8px",
                        color: "#b28a45",
                        fontSize: "9px",
                        fontWeight: "900",
                        letterSpacing:
                          "0.12em",
                      }}
                    >
                      {label}
                    </span>

                    <strong
                      style={{
                        fontSize: "17px",
                      }}
                    >
                      {title}
                    </strong>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      color: "#718078",
                      fontSize: "12px",
                      lineHeight: 1.65,
                    }}
                  >
                    {text}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      flexWrap: "wrap",
                    }}
                  >
                    {items.map(
                      (item) => (
                        <span
                          key={item}
                          style={{
                            padding:
                              "8px 10px",
                            borderRadius:
                              "999px",
                            background:
                              "#f3f5f1",
                            border:
                              "1px solid rgba(18,63,50,0.06)",
                            fontSize:
                              "10px",
                            fontWeight:
                              "800",
                            color:
                              "#466057",
                          }}
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* STACK */}
        <section
          style={{
            padding: "38px",
            borderRadius: "24px",
            background: "#efe9dc",
            border:
              "1px solid rgba(178,138,69,0.14)",
            marginBottom: "78px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: "#9b7330",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "0.16em",
            }}
          >
            TECHNOLOGY STACK
          </p>

          <h2
            style={{
              margin: "0 0 26px",
              fontSize:
                "clamp(27px, 4vw, 38px)",
            }}
          >
            Built with modern web and AI
            technologies.
          </h2>

          <div
            style={{
              display: "flex",
              gap: "9px",
              flexWrap: "wrap",
            }}
          >
            {technologies.map(
              (technology) => (
                <span
                  key={technology}
                  style={{
                    padding:
                      "10px 14px",
                    borderRadius:
                      "999px",
                    background:
                      "#ffffff",
                    color: "#123f32",
                    border:
                      "1px solid rgba(18,63,50,0.08)",
                    fontSize: "11px",
                    fontWeight: "800",
                  }}
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            textAlign: "center",
            padding: "30px 0 10px",
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              color: "#b28a45",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "0.15em",
            }}
          >
            EXPERIENCE PAKSHOP
          </p>

          <h2
            style={{
              margin: "0 0 15px",
              fontSize:
                "clamp(30px, 4vw, 42px)",
            }}
          >
            See the technology in action.
          </h2>

          <p
            style={{
              maxWidth: "600px",
              margin:
                "0 auto 25px",
              color: "#718078",
              lineHeight: 1.7,
            }}
          >
            Return to the storefront and
            use PakShop's conversational
            shopping assistant to search,
            browse and manage the
            shopping journey.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              border: "none",
              background: "#123f32",
              color: "#ffffff",
              borderRadius: "999px",
              padding: "14px 24px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow:
                "0 12px 28px rgba(18,63,50,0.14)",
            }}
          >
            Explore PakShop →
          </button>
        </section>
      </main>

      <style>
        {`
          @media (max-width: 900px) {
            main > section:first-child {
              grid-template-columns: 1fr !important;
              gap: 28px !important;
            }
          }

          @media (max-width: 850px) {
            section div[style*="repeat(3"] {
              grid-template-columns: 1fr !important;
            }

            section div[style*="repeat(4"] {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 720px) {
            div[style*="180px minmax"] {
              grid-template-columns: 1fr !important;
              gap: 14px !important;
            }
          }

          @media (max-width: 560px) {
            section div[style*="repeat(4"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}