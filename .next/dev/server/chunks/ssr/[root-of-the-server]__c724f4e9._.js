module.exports = [
  '[project]/src/app/favicon.ico.mjs { IMAGE => "[project]/src/app/favicon.ico (static in ecmascript, tag client)" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)',
  (__turbopack_context__) => {
    __turbopack_context__.n(
      __turbopack_context__.i(
        '[project]/src/app/favicon.ico.mjs { IMAGE => "[project]/src/app/favicon.ico (static in ecmascript, tag client)" } [app-rsc] (structured image object, ecmascript)'
      )
    );
  },
  "[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/shared/lib/no-fallback-error.external.js",
      () => require("next/dist/shared/lib/no-fallback-error.external.js")
    );

    module.exports = mod;
  },
  "[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)",
  (__turbopack_context__) => {
    __turbopack_context__.n(
      __turbopack_context__.i(
        "[project]/src/app/layout.tsx [app-rsc] (ecmascript)"
      )
    );
  },
  "[project]/src/data/content.json (json)",
  (__turbopack_context__) => {
    __turbopack_context__.v({
      restaurant: { name: "Johnny G's", established: "1975" },
      opening: {
        heading: "We are",
        highlight: "Open!",
        description:
          "We’re fully open and ready to welcome you—just like our restaurant, our website is getting a little tune-up to bring its full personality to life.",
      },
      hours: {
        breakfast: { title: "Breakfast", time: "7:00 AM – 4:00 PM" },
        dinner: { title: "Dinner and Jazz", time: "7:00 PM – 12:00 AM" },
      },
      reservations: {
        phone: { display: "Reserve a Table", tel: "+16473683877" },
      },
      social: {
        heading: "Stay Updated on Events",
        email: "mailto:johnnygs478@gmail.com",
        links: [
          {
            platform: "Email",
            url: "mailto:johnnygs478@gmail.com",
            ariaLabel: "Send us an email",
          },
          {
            platform: "Instagram",
            url: "https://www.instagram.com/johnnygscafe?igsh=OXRmNTR3c3hmZTc5",
            ariaLabel: "Follow us on Instagram",
          },
          {
            platform: "Facebook",
            url: "https://www.facebook.com/johnny.g.s.823880/?rdid=PUUSh9StKwqlYzpJ",
            ariaLabel: "Follow us on Facebook",
          },
        ],
      },
      footer: { tagline: '"Where every meal tells a story"' },
    });
  },
  "[project]/src/app/page.tsx [app-rsc] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => Home]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)"
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-rsc] (ecmascript) <export default as Phone>"
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-rsc] (ecmascript) <export default as Instagram>"
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-rsc] (ecmascript) <export default as Mail>"
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-rsc] (ecmascript) <export default as Music>"
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$content$2e$json__$28$json$29$__ =
      __turbopack_context__.i("[project]/src/data/content.json (json)");
    (() => {
      const e = new Error("Cannot find module '@/lib/utils'");
      e.code = "MODULE_NOT_FOUND";
      throw e;
    })();
    // Facebook icon component since lucide-react deprecated it
    const Facebook = ({ className }) =>
      /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "svg",
        {
          className: className,
          viewBox: "0 0 24 24",
          fill: "currentColor",
          xmlns: "http://www.w3.org/2000/svg",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "path",
            {
              d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
            },
            void 0,
            false,
            {
              fileName: "[project]/src/app/page.tsx",
              lineNumber: 13,
              columnNumber: 5,
            },
            ("TURBOPACK compile-time value", void 0)
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/app/page.tsx",
          lineNumber: 7,
          columnNumber: 3,
        },
        ("TURBOPACK compile-time value", void 0)
      );
    // TikTok icon component since lucide-react doesn't have it
    const TikTok = ({ className }) =>
      /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "svg",
        {
          className: className,
          viewBox: "0 0 24 24",
          fill: "currentColor",
          xmlns: "http://www.w3.org/2000/svg",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "path",
            {
              d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
            },
            void 0,
            false,
            {
              fileName: "[project]/src/app/page.tsx",
              lineNumber: 25,
              columnNumber: 5,
            },
            ("TURBOPACK compile-time value", void 0)
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/app/page.tsx",
          lineNumber: 19,
          columnNumber: 3,
        },
        ("TURBOPACK compile-time value", void 0)
      );
    const iconMap = {
      Email:
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__[
          "Mail"
        ],
      Instagram:
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__[
          "Instagram"
        ],
      Facebook,
      TikTok,
    };
    function Home() {
      const { restaurant, opening, hours, reservations, social, footer } =
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$content$2e$json__$28$json$29$__[
          "default"
        ];
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "main",
        {
          className: cn(
            "h-screen min-h-screen text-[#B29738] relative overflow-hidden",
            "bg-cover bg-center bg-no-repeat"
          ),
          style: {
            backgroundImage: "url('/assets/imgs/background-pattern.png')",
          },
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "absolute inset-0 opacity-5 bg-[url('/vintage-paper-texture.png')] bg-no-repeat bg-cover mix-blend-overlay",
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 47,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#011A0C]/80",
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 49,
                columnNumber: 7,
              },
              this
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "h-full w-full bg-[#011A0C]/10 backdrop-blur-sm",
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "h-full w-full flex flex-col items-center",
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: cn(
                          // Container sizing
                          "max-w-[1000px] w-[calc(100%-20px)] md:w-auto", // Layout
                          "h-full flex flex-col items-center justify-between", // Background & effects
                          "bg-[#011A0C]/70 backdrop-blur-lg", // Spacing
                          "px-2 md:px-6 pt-4 md:pt-12 my-4 mx-4 pb-2 md:pb-6", // Border & shadow
                          "border-[4px] border-[#B29738]",
                          "shadow-[0_0_20px_rgba(178,151,56,0.5),0_0_40px_rgba(178,151,56,0.3)]"
                        ),
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "relative text-center space-y-2 md:space-y-4",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "h1",
                                  {
                                    className: cn(
                                      "font-yellowtail text-5xl md:text-8xl tracking-wider",
                                      "text-[#B29738] drop-shadow-[0_0_30px_rgba(178,151,56,0.3)]"
                                    ),
                                    children: restaurant.name,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "p",
                                  {
                                    className:
                                      "font-serif text-xl md:text-2xl italic tracking-wide text-[#B29738]/80",
                                    children: ["Est. ", restaurant.established],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "absolute bottom-0 flex items-center justify-center mb-20",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "h-px w-24 bg-gradient-to-r from-transparent to-[#d4a574]",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/page.tsx",
                                          lineNumber: 78,
                                          columnNumber: 17,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__[
                                          "Music"
                                        ],
                                        {
                                          className: "w-8 h-8 text-[#d4a574]",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/page.tsx",
                                          lineNumber: 79,
                                          columnNumber: 17,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "h-px w-24 bg-gradient-to-l from-transparent to-[#d4a574]",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/page.tsx",
                                          lineNumber: 80,
                                          columnNumber: 17,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName: "[project]/src/app/page.tsx",
                              lineNumber: 67,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "",
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "h2",
                                {
                                  className: cn(
                                    "font-fjalla-one text-3xl md:text-4xl text-center mb-4 text-balance"
                                  ),
                                  children: [
                                    opening.heading,
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className:
                                          "text-5xl md:text-7xl italic",
                                        children: [" ", opening.highlight],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName: "[project]/src/app/page.tsx",
                                  lineNumber: 86,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName: "[project]/src/app/page.tsx",
                              lineNumber: 85,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "w-full",
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "flex flex-col md:flex-row gap-4 justify-between font-fjalla-one",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className: "text-center",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "h3",
                                            {
                                              className:
                                                "text-2xl text-[#B29738] tracking-wide",
                                              children: hours.breakfast.title,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/page.tsx",
                                              lineNumber: 99,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "h-px bg-[#B29738]/30 max-w-10 md:max-w-[120px] mx-auto my-2",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/page.tsx",
                                              lineNumber: 100,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-md md:text-xl text-[#8a7329] font-light",
                                              children: hours.breakfast.time,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/page.tsx",
                                              lineNumber: 101,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className: "text-center",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "h3",
                                            {
                                              className:
                                                "font-display text-2xl text-[#B29738] tracking-wide",
                                              children: hours.dinner.title,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/page.tsx",
                                              lineNumber: 106,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "h-px bg-[#B29738]/30 max-w-10 md:max-w-[120px] mx-auto my-2",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/page.tsx",
                                              lineNumber: 107,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-md md:text-xl text-[#8a7329] font-light",
                                              children: hours.dinner.time,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/page.tsx",
                                              lineNumber: 108,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName: "[project]/src/app/page.tsx",
                                  lineNumber: 96,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName: "[project]/src/app/page.tsx",
                              lineNumber: 95,
                              columnNumber: 13,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "footer",
                            {
                              className: "w-full pb-2 md:pb-4",
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "flex justify-between items-center gap-4",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className: "flex gap-10",
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "a",
                                          {
                                            href: `tel:${reservations.phone.tel}`,
                                            className: cn(
                                              "inline-flex items-center gap-2",
                                              "text-[#B29738] hover:text-[#B29738]/80 transition-colors group"
                                            ),
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__[
                                                  "Phone"
                                                ],
                                                {
                                                  className:
                                                    "w-12 h-12 md:w-10 md:h-10 group-hover:animate-pulse",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/page.tsx",
                                                  lineNumber: 126,
                                                  columnNumber: 21,
                                                },
                                                this
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className:
                                                    "hidden md:block md:text-xxl font-medium tracking-wide",
                                                  children:
                                                    reservations.phone.display,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/page.tsx",
                                                  lineNumber: 127,
                                                  columnNumber: 21,
                                                },
                                                this
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/app/page.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className:
                                          "flex justify-between gap-4 flex-wrap",
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className:
                                              "flex items-center justify-center gap-3",
                                            children: social.links.map(
                                              (link) => {
                                                const Icon =
                                                  iconMap[link.platform];
                                                const isEmail =
                                                  link.platform === "Email";
                                                return /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "a",
                                                  {
                                                    href: link.url,
                                                    target: isEmail
                                                      ? "_self"
                                                      : "_blank",
                                                    rel: isEmail
                                                      ? undefined
                                                      : "noopener noreferrer",
                                                    className: "group",
                                                    "aria-label":
                                                      link.ariaLabel,
                                                    children: /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "div",
                                                      {
                                                        className: cn(
                                                          "w-10 h-10 border border-[#B29738]/50 rounded-full",
                                                          "flex items-center justify-center",
                                                          "hover:bg-[#B29738] hover:border-[#B29738] transition-all duration-300"
                                                        ),
                                                        children:
                                                          Icon &&
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            Icon,
                                                            {
                                                              className: cn(
                                                                "w-6 h-6 text-[#B29738]",
                                                                "group-hover:text-[#011A0C] transition-colors"
                                                              ),
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/page.tsx",
                                                              lineNumber: 153,
                                                              columnNumber: 31,
                                                            },
                                                            this
                                                          ),
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/page.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 27,
                                                      },
                                                      this
                                                    ),
                                                  },
                                                  link.platform,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 25,
                                                  },
                                                  this
                                                );
                                              }
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 19,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName: "[project]/src/app/page.tsx",
                                  lineNumber: 115,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName: "[project]/src/app/page.tsx",
                              lineNumber: 114,
                              columnNumber: 13,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 54,
                        columnNumber: 11,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9,
                  },
                  this
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 52,
                columnNumber: 7,
              },
              this
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/app/page.tsx",
          lineNumber: 39,
          columnNumber: 5,
        },
        this
      );
    }
  },
  "[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)",
  (__turbopack_context__) => {
    __turbopack_context__.n(
      __turbopack_context__.i(
        "[project]/src/app/page.tsx [app-rsc] (ecmascript)"
      )
    );
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c724f4e9._.js.map
