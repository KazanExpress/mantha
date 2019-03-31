const common: IOptions = {
  title: 'Mantha project',
  appMountId: 'app',
  lang: 'en',
  favicon: 'assets/favicon.ico',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ],
  mobile: true
};

export default (mode: 'production' | 'development') => {
  const other: IOptions = mode === 'development' ? {
    meta: [
      // Dev meta tags here
      {
        name: 'robots',
        content: 'NOINDEX, NOFOLLOW'
      }
    ]
  } : {
    meta: [
      // Prod meta tags here
    ]
  };

  const mergedMeta = [ ...common.meta, ...other.meta ];
  const mergedOptions = { ...common, ...other };
  mergedOptions.meta = mergedMeta;

  return mergedOptions;
};


export interface IOptions {
  /**
   * The title to use for the generated HTML document
   */
  title?: string;

  /**
   * The <div> element id on which you plan to mount a JavaScript app
   */
  appMountId?: string;

  /**
   * A small snippet of HTML that will be inserted in the <div> element the appMountId is attached to
   */
  appMountHtmlSnippet?: string;

  /**
   * Adjust the URL for relative URLs in the document
   */
  baseHref?: string;

  /**
   * A small snippet of HTML that will be inserted in the head element.
   */
  headHtmlSnippet?: string;

  /**
   * A small snippet of HTML that will be inserted in the body element.
   */
  bodyHtmlSnippet?: string;

  /**
   * Insert the webpack-dev-server hot reload script at this host:port/path; e.g., http://localhost:8080
   */
  devServer?: string;

  /**
   * Track usage of your site via Google Analytics
   */
  googleAnalytics?: {
    trackingId: string;

    /**
     * Log a pageview event after the analytics code loads
     */
    pageViewOnLoad?: boolean;
  };

  /**
   * Meta tags as array of objects
   */
  meta: Meta;

  /**
   *  Sets appropriate meta tag for page scaling
   */
  mobile?: boolean;

  /**
   * String identifying your content language.
   */
  lang?: string;

  /**
   * Array of <link> elements.
   *
   * - If an array element is a string, the value is assigned to the href attribute and the rel attribute is set to "stylesheet";
   * - If an array element is an object, the object's properties and values are used as the attribute names and values, respectively;
   */
  links?: Array<ILinkClass | string>;

  /**
   * For use with inline-manifest-webpack-plugin
   */
  inlineManifestWebpackName?: string;

  /**
   * Array of external script imports to include on page.
   *
   * - If an array element is a string, the value is assigned to the src attribute and the type attribute is set to "text/javascript";
   * - If an array element is an object, the object's properties and values are used as the attribute names and values, respectively;
   */
  scripts?: Array<IScriptClass | string>;

  /**
   * The file to write the HTML to. Defaults to index.html. You can specify a subdirectory here too (eg: assets/admin.html).
   */
  filename?: string;

  /**
   * Adds the given favicon path to the output HTML.
   *
   * Path should be relative to '<rootDir>/src'
   */
  favicon?: string;
}

export interface ILinkClass {
  href: string;
  rel?: string;
  sizes?: string;
  type?: string;
}

export type Meta = Array<{
  name: string;
  content: string;
}>;

export interface IScriptClass {
  src: string;
  type?: string;
}

