# **Technical Guide and Launch Strategy for SvelteKit SEO on cardenaspacheco.es**

The successful launch of a new website, particularly one built using a modern framework like SvelteKit, requires meticulous attention to both foundational SEO principles and platform-specific technical configurations. This report details the necessary steps, from initial domain verification with Arsys to advanced SvelteKit architectural patterns for maximizing visibility and establishing topical authority.

## **I. The Critical Launch Phase: Domain, Verification, and Security**

This initial phase establishes the foundational link between the domain registrar (Arsys), the search engine (Google), and the hosting environment, prioritizing security and indexability.

### **1\. Domain Acquisition Context: Leveraging the.es ccTLD**

The selection of the .es country-code Top-Level Domain (ccTLD) for cardenaspacheco.es provides an immediate and powerful geographical signal to Google and other search engines. Google relies heavily on ccTLDs to determine a site’s target locale, making .es a strong, explicit indication that the content is intended for the Spanish market.1 This is particularly important because Google has deprecated the manual International Targeting report in Google Search Console (GSC).2 Consequently, the site must now rely almost entirely on the ccTLD and the content's language (Spanish) to reinforce its geographic relevance.

The strong geographical signal of the .es ccTLD necessitates proactive planning for future scale. While the site primarily targets Spain, if future expansion includes other Spanish-speaking markets (e.g., Mexico, Argentina, or a global Spanish audience), relying solely on the .es TLD may inadvertently restrict reach outside of Spain. To prevent this, a necessary defensive measure involves planning for hreflang implementation. The site should define language-country combinations (e.g., es-mx, es-ar) and, crucially, include an x-default tag. The x-default tag captures users whose location or language preference does not match an explicit variant, ensuring a broad but strategically targeted presence, even when only one primary language is live.3

### **2\. Google Search Console (GSC) Setup and Verification**

GSC serves as the essential communication channel and monitoring dashboard between the domain and Google Search. The first critical step is verifying ownership.

#### **Creating a Domain Property**

The owner should create a Domain Property in GSC. This verification type encompasses the entire domain (cardenaspacheco.es), regardless of whether it is accessed via HTTP or HTTPS, or with or without the www subdomain. Utilizing a Domain Property simplifies long-term management and ensures comprehensive data aggregation.4

#### **Verification Method: DNS TXT Record**

Since the domain is registered with Arsys, the preferred and most robust verification method is adding a unique TXT record to the domain's DNS zone.4 This process demonstrates irrefutable ownership of the domain.

#### **Action Guide: Verifying Ownership via Arsys DNS TXT Record**

The verification process requires interacting directly with the Arsys domain management interface:

- **Step 1: Obtain the TXT Record:** Generate the unique verification string provided by GSC during the setup process. In the verification popup, the TXT record type should be selected.4
- **Step 2: Access Arsys DNS Management:** Log into the Arsys Control Panel and locate the DNS management settings. This section is typically labeled **Entradas DNS** (DNS Entries).6
- **Step 3: Add the TXT Record:**
  - Select the option to **Añadir entrada DNS** (Add DNS entry).6
  - Choose **TXT** as the record type.7
  - In the **Name/Host** field, input @ to signify the root domain (cardenaspacheco.es) or leave it blank, depending on the specific formatting required by the Arsys interface.5
  - In the **Value/Text** field, paste the _exact_ unique string copied from the GSC setup screen.4
  - The **TTL (Time to Live)** should generally be left at the default setting (e.g., 3600 seconds) unless a rapid change is specifically needed.5
- **Step 4: Propagation and Verification:** Save the changes and allow time for DNS propagation across the internet, which can range from a few minutes up to 72 hours.7 Once the changes are propagated, return to GSC and click the "Verificar" (Verify) button. A successful verification message confirms the link between the site and Google.9

Table 1 details the required configuration fields:

Table 1: Arsys DNS TXT Record Configuration for GSC Verification

| Google Search Console Field (TXT Record) | Arsys DNS Panel Equivalent   | Value Input                                                         | Notes |
| :--------------------------------------- | :--------------------------- | :------------------------------------------------------------------ | :---- |
| **Type**                                 | TXT (Text)                   | Must select this record type.                                       | 5     |
| **Name/Host**                            | @ or leave blank             | Target the root domain (cardenaspacheco.es). Follow Arsys's format. | 5     |
| **Value/Text**                           | (Unique Verification String) | The exact string provided by GSC.                                   | 4     |
| **TTL (Time to Live)**                   | Default (e.g., 3600 seconds) | Use default unless rapid change is needed.                          | 5     |

### **3\. Essential Security Configuration (HTTPS and HSTS)**

Modern SEO is inseparable from security and trust (E-A-T). All contemporary websites must be served exclusively over HTTPS. While most SvelteKit hosting environments automatically provision SSL/TLS certificates, an additional layer of security, HTTP Strict-Transport-Security (HSTS), is strongly recommended.

#### **HTTP Strict-Transport-Security (HSTS) Implementation**

HSTS ensures that the browser will only connect to the domain using HTTPS, bypassing any potentially insecure initial HTTP redirects.10 This prevents man-in-the-middle attacks and blocks users from overriding security certificate warnings, which is a critical signal of trustworthiness.11

The strongest HSTS policy, recommended for all production sites, is:  
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload  
This policy sets the duration for one year (max-age=31536000), applies the rule to all subdomains, and signals the site’s willingness to be included in major browser preload lists.12

HSTS must be implemented as an HTTP response header, separate from the HTML document's \<head\> section.11 For SvelteKit projects, which are typically deployed via adapters to platforms like Vercel or Netlify, implementation options include:

1. **Hosting Platform Configuration:** Setting the HSTS header via the host provider’s configuration files (e.g., a vercel.json or Netlify headers file) is often the most reliable way to enforce it at the edge infrastructure level.14
2. **SvelteKit Server Hooks:** If the site is self-hosted or requires custom server logic, the src/hooks.server.js file can be used to globally intercept server responses and inject the header via the SvelteKit handle function.13

### **4\. Integrating Web Analytics (GA4)**

Before launch, Google Analytics 4 (GA4) must be properly configured to track indexing success, traffic sources, and user behavior from the first day.15 Implementing GA4 allows for long-term monitoring of content strategy effectiveness and performance improvements. The GA4 tracking script should be inserted across all pages, typically within the main

src/routes/+layout.svelte file inside a \<svelte:head\> block. Care must be taken to ensure non-critical scripts, such as analytics, are loaded asynchronously or deferred to minimize any adverse impact on Core Web Vitals performance.16

## **II. SvelteKit Technical SEO Architecture Blueprint**

SvelteKit offers intrinsic advantages for technical SEO, but achieving optimal search performance requires specific architectural patterns to manage metadata, indexation, and structured data effectively.

### **1\. Ensuring Indexability and Crawl Control**

SvelteKit is fundamentally advantageous for SEO because it employs Server-Side Rendering (SSR) by default. SSR ensures that search engine crawlers reliably receive fully rendered HTML content, which is indexed "more frequently and reliably" than content rendered primarily using client-side JavaScript.17

#### **Crawl Budget Optimization: Implementing a Strategic robots.txt Endpoint**

A crucial initial optimization for a new domain with limited crawl equity involves managing the crawl budget—the number of pages a search engine crawler will process within a given time. SvelteKit applications often utilize JavaScript bundles and internal JSON API responses that, while necessary for functionality, consume crawl budget without contributing indexable content.18 Redirecting the crawler's focus toward valuable HTML content accelerates indexation of important pages.

To achieve this, the robots.txt file should be dynamically served via a SvelteKit endpoint (src/routes/robots.txt/+server.ts).20

**Recommended robots.txt Structure (Disallowing Non-Indexable Assets):**

Plaintext

User-agent: \*  
Disallow: /\*.js$  
Disallow: /\*.json  
Disallow: /analytics.json

Sitemap:

The directives Disallow: /\*.js$ and Disallow: /\*.json instruct the crawler to ignore JavaScript bundles and generic JSON API endpoints, thereby optimizing the crawl budget.18 It is important to remember that critical CSS and other resources necessary for rendering the page should not be blocked.19 The inclusion of the

Sitemap: directive provides the crawler with an explicit path to the site's structured content roadmap.

### **2\. Canonicalization and URL Consistency**

Canonical tags are essential for instructing search engines on the preferred version of a page, consolidating ranking signals, and mitigating duplicate content penalties arising from URL variations (e.g., trailing slashes, www vs. non-www, or tracking parameters).22 While SvelteKit handles trailing slash normalization automatically 17, explicit canonical tags are still mandatory for comprehensive protection.

#### **SvelteKit Canonical Implementation Pattern**

To implement dynamic and reliable canonical tags, the URL path must be captured during server rendering and injected into the HTML \<head\>:

1. **Data Retrieval (src/routes/+layout.server.js):** The URL components are accessed via the load function on the server side:  
   JavaScript  
   export const load \= async ({ url }) \=\> {  
    return {  
    pathname: url.pathname,  
    fullUrl: url.href  
    };  
   };  
   \`\`\` \[23\]

2. **Rendering the Canonical Tag (src/routes/+layout.svelte):** The canonical tag is rendered in the root layout file, using the path data and a constant for the preferred site URL:  
   Svelte  
   \<script\>  
    import { page } from '$app/stores';  
    export let data;  
    const SITE_URL \= 'https://cardenaspacheco.es';  
   \</script\>

   \<svelte:head\>  
    {\#key $page.url.pathname}  
           \<link rel="canonical" href="{SITE\_URL}{$page.url.pathname}" /\>  
    {/key}  
   \</svelte:head\>

   \<slot /\>  
   \`\`\` \[23\]

Crucially, the canonical link is wrapped in a {\#key $page.url.pathname} block. This forces Svelte to re-evaluate and replace the canonical tag whenever the URL changes during SvelteKit’s client-side navigation (soft routing). Without this mechanism, the tag might not reliably update, potentially causing Google to index incorrect canonical URLs.23

### **3\. Mastering Dynamic Metadata and OpenGraph Tags**

Metadata directly impacts the Click-Through Rate (CTR) from search results. Every page requires a unique, well-optimized \<title\> (ideally under 60 characters) and \<meta name="description"\> (around 150-160 characters) that includes targeted keywords and is compelling enough to encourage users to visit.25

The standard approach in SvelteKit is to return metadata from the page’s load function and use it within a \<svelte:head\> block in the respective component or layout.17

#### **Implementing OpenGraph (OG) and Twitter Card Tags**

OpenGraph and Twitter Card tags control how the content appears when shared on social media platforms, providing rich link previews. These tags define the title, description, and preview image (og:image). It is best practice to centralize this logic into a dedicated Svelte component (e.g., SeoComponent.svelte).27

The component structure dynamically pulls page information, including the URL, ensuring that the shared links are correct:

HTML

\<meta property\="og:url" content\="https://cardenaspacheco.es{$page.url.pathname.toString()}"\>  
\<meta property\="og:type" content\="website"\>  
\<meta property\="og:title" content\="{title}"\>  
\<meta property\="og:description" content\="{description}"\>  
\<meta property\="og:image" content\="{image}"\>  
\<meta name\="twitter:card" content\="summary_large_image"\>  
\`\`\` \[27\]

This component-based strategy receives props (title, description, image) populated by the server-side \`load\` functions, making metadata management scalable and reliable across the application.\[27\]

\#\#\# 4\. Sitemap Generation for Dynamic Routes

Sitemaps are critical for establishing a structured roadmap of the site’s indexable content, ensuring search engines efficiently discover all relevant pages, which is especially beneficial for new domains with evolving architectures.\[17, 21\]

\#\#\#\# Technical Implementation: Generating \`sitemap.xml\` via \`+server.ts\`

The sitemap must be served as \`sitemap.xml\` \[28\] and its location must be referenced in \`robots.txt\` (as demonstrated in Section II.1). Due to SvelteKit's file-based routing, the sitemap is generated by creating a special directory structure: \`src/routes/sitemap.xml/+server.ts\`.\[28\]

This endpoint utilizes an asynchronous \`GET\` function to dynamically construct and return the XML content. If \`cardenaspacheco.es\` includes dynamic content (e.g., listings or blog posts), the \`+server.ts\` file must execute logic to fetch all necessary URLs (e.g., from an API or database) and include them in the generated XML structure.\[21\] The endpoint must set the correct HTTP header: \`Content-Type: application/xml\`.

\#\#\# 5\. Structured Data Implementation (Schema.org JSON-LD)

Structured data, provided via Schema.org vocabulary, helps search engines interpret the content’s meaning and context, significantly increasing the probability of earning Rich Results (e.g., Organization information, FAQs, Breadcrumbs) in the Search Engine Results Pages (SERPs).\[29\]

The preferred method is using JSON-LD (JavaScript Object Notation for Linked Data), which is placed within a \`\<script type\="application/ld+json"\>\` tag inside the HTML \`\<head\>\`.\[30\]

\#\#\#\# SvelteKit JSON-LD Injection Pattern

In SvelteKit, dynamically constructed JSON-LD payloads must be stringified and injected raw into the \`\<svelte:head\>\` using the \`{@html...}\` directive.\[30\]

A component strategy involves defining the schema object in JavaScript, stringifying it, and safely injecting the necessary script tag structure:

\`\`\`svelte  
\<script\>  
 // Data fetched from load function  
 export let schemaOrgObject;  
 let jsonLdString \= JSON.stringify(schemaOrgObject);  
 // Splitting the closing tag safely prevents Svelte parsing errors  
 let jsonLdScript \= \`  
 \<script type="application/ld+json"\>  
 ${jsonLdString}  
 ${'\<'}/script\>  
 \`;  
\</script\>

\<svelte:head\>  
 {@html jsonLdScript}  
\</svelte:head\>  
\`\`\` \[30\]

The site should begin with fundamental schemas such as \`Organization\` (or \`Person\` for a portfolio site) and \`WebSite\` on the homepage. Connecting social media profiles within these schemas helps Google understand the entity behind the content, contributing to the site’s E-A-T profile and establishing a Knowledge Graph presence.\[30\]

\#\# III. Strategic Content Foundation and Authority Building

Technical readiness must be immediately followed by a targeted content strategy. For a new domain, the primary challenge is achieving visibility in a competitive search landscape.

\#\#\# 1\. New Domain Keyword Research Methodology

A new domain cannot successfully compete against established high-authority websites for broad, high-volume terms.\[31\] The initial content strategy must be tactical, focusing on achievable goals.

\#\#\#\# Prioritizing Long-Tail and Low-Difficulty Keywords

The initial focus must be on keywords characterized by low SEO difficulty (KD) and high user intent, typically found in long-tail phrases (queries with four or more words).\[25, 32, 33\] High Search Volume (SV) keywords are highly competitive and expensive; attempting to rank for them initially will likely result in zero organic traffic.\[31, 34\]

\*\*Actionable Step:\*\* Utilize professional tools (e.g., Ahrefs, KWFinder, Ubersuggest) to filter terms specifically by low KD.\[25, 33, 35\] These terms, while having lower search volume individually, offer quicker initial ranking opportunities, driving early traffic and allowing the domain to build authority. The terms should then be clustered based on explicit user intent (e.g., informational, commercial, transactional) to align content with specific stages of the buyer journey.\[31, 36\]

Table 2 illustrates the necessary shift in keyword prioritization for a new domain:

Table 2: New Domain Keyword Prioritization Matrix

| \*\*Keyword Type\*\*                       | \*\*Difficulty\*\* | \*\*Search Volume (SV)\*\* | \*\*Goal for cardenaspacheco.es\*\*                                                | \*\*Timeframe\*\*        |
| ------------------------------------------ | ------------------ | -------------------------- | ---------------------------------------------------------------------------------- | ------------------------ |
| \*\*High SV, High Difficulty\*\*           | High               | High                       | Avoid—Too competitive for a new domain.                                            | Long-term (6-12+ months) |
| \*\*Low SV, Low Difficulty (Long-Tail)\*\* | Low                | Low-Medium                 | \*\*Primary Target:\*\* Quick wins, initial traffic, immediate authority building. | Short-term (0-6 months)  |
| \*\*Questions/Problem-Based\*\*            | Varies             | Varies                     | \*\*High Intent:\*\* Directly address user problems, essential for Topic Clusters. | Short-term (0-6 months)  |

\#\#\# 2\. Building E-E-A-T

The fundamental driver of organic performance is content quality. Google’s evaluation of content centers on E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).\[37\] Content execution must be exceptional, designed to rank, convert, and educate the audience.\[25, 31\]

To reinforce E-A-T, the structural components implemented in Section II.5 play a role. Strategic use of Schema.org, linking content to verifiable authors or organizations, helps Google recognize the entity providing the information, thereby signaling expertise and authority.\[29, 30\]

\#\#\# 3\. The Pillar and Cluster Content Model

The Topic Cluster content model is a structural approach that signals topical authority to search engines while improving user experience through organized content architecture.\[38, 39\]

\#\#\#\# Defining Pillars and Clusters

1\. \*\*Pillar Pages:\*\* These are comprehensive, standalone, high-level pages covering a broad topic (e.g., "The Complete Guide to Spanish Real Estate"). They aim to secure backlinks and capture users at the top of the funnel (awareness stage).\[38, 40\]  
2\. \*\*Cluster Pages:\*\* These are in-depth articles focusing on specific, granular subtopics derived from the pillar (e.g., "Navigating Spanish Inheritance Tax for Foreigners"). These pages target users in the middle and bottom of the marketing funnel.\[39, 40\]

\#\#\#\# Strategic Internal Linking

The relationship between pillar and cluster pages is formalized through a reciprocal internal linking strategy, which is the foundational element of the model.\[39, 41\] The structure of internal links is used by Google to understand the hierarchy and interconnectedness of content.

For the site to establish topical authority quickly, internal links must be bidirectional: the Pillar page must link to all relevant Cluster pages, and every Cluster page must link back to its Pillar page.\[41\] This interconnected web explicitly signals to search engines that the Pillar Page serves as the authoritative resource on the overarching topic, which improves its chances of ranking higher for broad keywords.\[41\] Links must use descriptive, keyword-rich anchor text and be strategically placed within the content body, rather than in generic footers or sidebars.\[41\]

\#\# IV. Performance Optimization and Core Web Vitals (CWV)

Core Web Vitals (CWV)—specifically Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP)—are crucial ranking signals that measure user experience.\[17, 26\] SvelteKit offers an inherently high-performing foundation due to its compilation approach and SSR.\[17\]

\#\#\# 1\. Leveraging SvelteKit for Speed

SvelteKit's design introduces minimal overhead, making it easier to meet high performance standards compared to frameworks relying on a virtual DOM.\[17\] Performance must be continuously audited using tools like Google’s PageSpeed Insights and Lighthouse.\[17\]

\#\#\# 2\. Optimizing Largest Contentful Paint (LCP)

LCP measures the time it takes for the largest content element (often a main image or block of text) to become visible in the viewport.

\#\#\#\# Advanced Image Strategy

Images typically constitute the largest files and are often the primary cause of poor LCP scores.\[42\] Optimization requires generating modern, compressed formats (WebP and AVIF), creating multiple sizes for responsive delivery across various screen dimensions, and ensuring effective caching.\[16, 43\]

The most effective SvelteKit implementation involves using the \`@sveltejs/enhanced-img\` plugin. This specialized tool automates image processing during the build process, serving smaller formats (AVIF/WebP), automatically generating responsive sizes, and crucially, setting the intrinsic width and height of the image tags. Setting explicit dimensions prevents layout shifts, making this a critical optimization for both LCP and CLS.\[43\]

\#\#\# 3\. Minimizing Cumulative Layout Shift (CLS)

CLS measures the visual stability of a page. Unexpected shifting of content during loading significantly harms user experience and search rankings.

\#\#\#\# Font Loading Strategy

External fonts, particularly those from Google Fonts, frequently cause CLS if not handled correctly because they can delay rendering until fully loaded.\[42\]

To mitigate this risk, it is recommended to self-host fonts (Fontsource is a common Svelte practice) and utilize the CSS property \`font-display: swap\`. This ensures the text remains immediately visible using a fallback font while the custom font loads.\[16, 42\] Furthermore, SvelteKit allows for advanced font preloading: the \`handle\` hook can be leveraged to call \`resolve\` with a preload filter, ensuring critical fonts are prioritized and improving LCP while minimizing CLS.\[44\]

It is also crucial to reserve space for any dynamically loaded content (such as ads or embeds) using CSS properties like \`min-height\` or \`min-width\` to prevent content below it from shifting unexpectedly once the element loads.\[16\]

\#\#\# 4\. Improving First Input Delay (FID) / Interaction to Next Paint (INP)

These metrics evaluate page responsiveness and interactivity. While Svelte's compilation efficiency provides a strong foundation, further JavaScript optimization is essential. This includes minifying and compressing JavaScript bundles.\[16\] Non-critical scripts, such as analytics or consent banners, should be loaded strategically using the \`defer\` or \`async\` attributes to prevent them from blocking the main thread and impacting initial user interaction latency.\[16\]

Table 3 summarizes the CWV optimization strategy:

Table 3: Core Web Vitals Optimization Checklist for SvelteKit

| \*\*Metric\*\*  | \*\*Optimization Goal\*\*                        | \*\*SvelteKit Technical Implementation\*\*                                                           | \*\*SEO Impact/Benefit\*\*                                 |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| \*\*LCP\*\*     | Improve perceived loading speed of main content. | Use \`@sveltejs/enhanced-img\` for AVIF/WebP and responsive sizing.                                  | Faster primary content visibility, better ranking signal.  |
| \*\*CLS\*\*     | Stabilize page content during loading.           | Self-host fonts with \`font-display: swap\`. Use explicit \`width\`/\`height\` attributes on images. | Improved user experience, avoiding layout shift penalties. |
| \*\*INP/FID\*\* | Ensure smooth responsiveness to user input.      | Leverage Svelte compilation efficiency; defer/async non-critical JS scripts.                         | Better user interaction rating, lower bounce rate.         |

\#\# V. Final Pre-Flight and Maintenance Checklist

The launch preparation concludes with essential administrative checks and establishes the necessary feedback loops for long-term SEO health.

\#\#\# 1\. Pre-Launch Checklist

\* \*\*404 Error Page:\*\* A custom and helpful \`src/routes/\[...404\]/+page.svelte\` should be created to gracefully handle broken links and non-existent URLs.\[45\]  
\* \*\*Redirects:\*\* Implement necessary 301 redirects for any URLs that have changed or for domain consolidation.\[45\]  
\* \*\*Link Integrity:\*\* Conduct a full scan of the site to identify and resolve any broken internal or external links (404s).\[25, 26, 45\]  
\* \*\*Compatibility Testing:\*\* Verify that the design and functionality are consistent across all major browsers and devices to ensure a positive user experience.\[26, 45\]  
\* \*\*Favicon and Title:\*\* Ensure the favicon is correctly configured and the homepage \`\<title\>\` tag is set.\[45\]  
\* \*\*Form Functionality:\*\* Rigorously test all contact and conversion forms to confirm they are operational.\[45\]

\#\#\# 2\. Legal Requirements

Given the public-facing nature of the domain and its \`.es\` TLD, compliance with regional data privacy laws, such as GDPR, is mandatory. Essential legal pages must be created, published, and linked prominently, including a Privacy Policy, Terms of Service, and a mechanism for cookie consent.\[45\]

\#\#\# 3\. Ongoing GSC Monitoring (The Operational Feedback Loop)

Google Search Console is the operational hub for post-launch monitoring, providing direct visibility into how Google views and processes the website.\[15\] Continuous monitoring is essential to detect and resolve technical issues quickly.

\#\#\#\# Immediate Key Monitoring Reports:

\* \*\*Coverage Report:\*\* This report verifies which pages have been successfully indexed. The owner must rapidly resolve any \`Excluded\` or \`Error\` pages, specifically monitoring for instances where canonical tags are failing to consolidate duplicate variations.  
\* \*\*Crawl Stats Report:\*\* Immediately after launch, this report must be reviewed, focusing on the "Crawl requests by file type" section. A successful implementation of the specialized \`robots.txt\` (Section II.1) should demonstrate a low percentage of requests spent on JavaScript and JSON files, validating the crawl budget optimization strategy.\[18\]  
\* \*\*Core Web Vitals Report:\*\* Monitor mobile and desktop CWV performance to detect any performance regressions that may occur post-deployment.  
\* \*\*Performance Report:\*\* Use this report to track initial ranking keywords, verifying that the strategic focus on long-tail, low-difficulty terms (Section III.1) is yielding initial impressions and clicks.\[34\]

\#\# VI. Conclusions and Recommendations

The successful establishment of \`cardenaspacheco.es\` requires a balanced execution of SvelteKit-specific technical architecture and a targeted content strategy.

The foundational security and verification steps—specifically the use of the \`.es\` ccTLD for geographic targeting and the Arsys DNS TXT record for GSC verification—must be completed first, backed by mandatory HSTS header configuration.

On the technical front, the SvelteKit implementation should leverage SSR by default, implement dynamic canonical tags using the \`{\#key}\` structure for reliable soft navigation updates, and enforce crawl budget efficiency by disallowing unnecessary JS/JSON crawling via the \`robots.txt\` \`+server.ts\` endpoint. Metadata management should be centralized using a dedicated component for OpenGraph and Schema.org JSON-LD injection, particularly prioritizing \`Organization\` and \`WebSite\` schemas to build E-A-T.

The immediate content strategy must be disciplined, focusing exclusively on low-difficulty, long-tail keywords structured within a Pillar and Cluster model. The reciprocal internal linking structure between Pillars and Clusters is critical for quickly establishing topical authority in the eyes of the search engine.

Finally, persistent monitoring of the GSC Coverage and Crawl Stats reports will serve as the necessary feedback loop to ensure the technical implementations are working correctly and that the site is maximizing its limited initial crawl budget.

#### **Obras citadas**

1. Managing Multi-Regional and Multilingual Sites | Google Search Central | Documentation, fecha de acceso: septiembre 27, 2025, [https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
2. The International Targeting report is deprecated \- Search Console Help, fecha de acceso: septiembre 27, 2025, [https://support.google.com/webmasters/answer/12474899?hl=en](https://support.google.com/webmasters/answer/12474899?hl=en)
3. Hreflang: The Easy Guide for Beginners \- Ahrefs, fecha de acceso: septiembre 27, 2025, [https://ahrefs.com/blog/hreflang-tags/](https://ahrefs.com/blog/hreflang-tags/)
4. Verify your site ownership \- Search Console Help, fecha de acceso: septiembre 27, 2025, [https://support.google.com/webmasters/answer/9008080?hl=en](https://support.google.com/webmasters/answer/9008080?hl=en)
5. How to Add a TXT Record to Your DNS Server for Domain Verification and Email Authentication \- ID123, fecha de acceso: septiembre 27, 2025, [https://www.id123.io/knowledgebase/adding-a-txt-record-to-a-dns-server/](https://www.id123.io/knowledgebase/adding-a-txt-record-to-a-dns-server/)
6. Verificar tu dominio con Google \- Centro de Soporte \- Arsys, fecha de acceso: septiembre 27, 2025, [https://www.arsys.es/soporte/correo/verificar-tu-dominio-con-google](https://www.arsys.es/soporte/correo/verificar-tu-dominio-con-google)
7. How to create a DNS TXT record \- SecureAuth Product Docs, fecha de acceso: septiembre 27, 2025, [https://docs.secureauth.com/arculix/en/how-to-create-a-dns-txt-record.html](https://docs.secureauth.com/arculix/en/how-to-create-a-dns-txt-record.html)
8. ¿Qué es un registro TXT de DNS y cómo crearlo? | Blog de Arsys, fecha de acceso: septiembre 27, 2025, [https://www.arsys.es/blog/que-es-un-registro-txt-de-dns-y-como-crearlo](https://www.arsys.es/blog/que-es-un-registro-txt-de-dns-y-como-crearlo)
9. Cómo verificar tu dominio en Google paso a paso usando un registro DNS TXT en tu hosting (Guía) \- YouTube, fecha de acceso: septiembre 27, 2025, [https://www.youtube.com/watch?v=fNN03ApS-8E](https://www.youtube.com/watch?v=fNN03ApS-8E)
10. HTTP Strict Transport Security \- The HTTPS-Only Standard, fecha de acceso: septiembre 27, 2025, [https://https.cio.gov/hsts/](https://https.cio.gov/hsts/)
11. Strict-Transport-Security header \- HTTP \- MDN, fecha de acceso: septiembre 27, 2025, [https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)
12. HTTP Strict Transport Security \- OWASP Cheat Sheet Series, fecha de acceso: septiembre 27, 2025, [https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html)
13. SvelteKit Static Site HTTP Headers | Rodney Lab, fecha de acceso: septiembre 27, 2025, [https://dev.to/askrodney/sveltekit-static-site-http-headers-2g6j](https://dev.to/askrodney/sveltekit-static-site-http-headers-2g6j)
14. HSTS header \- Help \- Vercel Community, fecha de acceso: septiembre 27, 2025, [https://community.vercel.com/t/hsts-header/14985](https://community.vercel.com/t/hsts-header/14985)
15. Website Launch Checklist: What to Double Check Before You Go Live \- Story Reimagined, fecha de acceso: septiembre 27, 2025, [https://www.storyreimagined.org/blog/website-launch-checklist-what-to-double-check-before-you-go-live](https://www.storyreimagined.org/blog/website-launch-checklist-what-to-double-check-before-you-go-live)
16. Enhancing Web Performance with Core Web Vitals Optimization | Leapcell, fecha de acceso: septiembre 27, 2025, [https://leapcell.io/blog/enhancing-web-performance-with-core-web-vitals-optimization](https://leapcell.io/blog/enhancing-web-performance-with-core-web-vitals-optimization)
17. SEO • Docs \- Svelte, fecha de acceso: septiembre 27, 2025, [https://svelte.dev/docs/kit/seo](https://svelte.dev/docs/kit/seo)
18. Robots.txt file for SvelteKit projects \- Scott Spence, fecha de acceso: septiembre 27, 2025, [https://scottspence.com/posts/robots-txt-file-for-sveltekit-projects](https://scottspence.com/posts/robots-txt-file-for-sveltekit-projects)
19. Mastering robots.txt: A Comprehensive Guide to Optimizing Crawl Budget and Enhancing SEO | by Teamcode | Medium, fecha de acceso: septiembre 27, 2025, [https://medium.com/@teamcode20233/mastering-robots-txt-a-comprehensive-guide-to-optimizing-crawl-budget-and-enhancing-seo-593228484068](https://medium.com/@teamcode20233/mastering-robots-txt-a-comprehensive-guide-to-optimizing-crawl-budget-and-enhancing-seo-593228484068)
20. What's the best way to add a robots.txt file to a SvelteKit project? \- Stack Overflow, fecha de acceso: septiembre 27, 2025, [https://stackoverflow.com/questions/72188193/whats-the-best-way-to-add-a-robots-txt-file-to-a-sveltekit-project](https://stackoverflow.com/questions/72188193/whats-the-best-way-to-add-a-robots-txt-file-to-a-sveltekit-project)
21. How to create a dynamic sitemap.xml for your Sveltekit app. \- DEV Community, fecha de acceso: septiembre 27, 2025, [https://dev.to/n3rd/how-to-create-a-dynamic-sitemapxml-for-your-sveltekit-app-3c1f](https://dev.to/n3rd/how-to-create-a-dynamic-sitemapxml-for-your-sveltekit-app-3c1f)
22. Canonical Tag: Definition, Examples & Best Practices \- Moz, fecha de acceso: septiembre 27, 2025, [https://moz.com/learn/seo/canonicalization](https://moz.com/learn/seo/canonicalization)
23. SvelteKit SEO | Webjeda, fecha de acceso: septiembre 27, 2025, [https://webjeda.com/blog/sveltekit-seo](https://webjeda.com/blog/sveltekit-seo)
24. Add meta tags to dynamic page in sveltekit \- Stack Overflow, fecha de acceso: septiembre 27, 2025, [https://stackoverflow.com/questions/78048621/add-meta-tags-to-dynamic-page-in-sveltekit](https://stackoverflow.com/questions/78048621/add-meta-tags-to-dynamic-page-in-sveltekit)
25. SEO Best Practices for 2025: Rank Higher with Smart Strategy | Svitla Systems, fecha de acceso: septiembre 27, 2025, [https://svitla.com/blog/seo-best-practices/](https://svitla.com/blog/seo-best-practices/)
26. The Definitive Checklist for Your New Website Launch, fecha de acceso: septiembre 27, 2025, [https://www.trajectorywebdesign.com/blog/website-launch-checklist](https://www.trajectorywebdesign.com/blog/website-launch-checklist)
27. How you guys manage Metadata/SEO in svelte kit? : r/sveltejs \- Reddit, fecha de acceso: septiembre 27, 2025, [https://www.reddit.com/r/sveltejs/comments/1e1bcb6/how_you_guys_manage_metadataseo_in_svelte_kit/](https://www.reddit.com/r/sveltejs/comments/1e1bcb6/how_you_guys_manage_metadataseo_in_svelte_kit/)
