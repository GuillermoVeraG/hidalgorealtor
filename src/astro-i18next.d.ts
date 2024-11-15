declare module "astro-i18next" {
  // Si sabes cómo es la estructura del objeto de configuración, declara sus tipos aquí.
  export interface AstroI18nextConfig {
    // Agrega las propiedades del objeto de configuración que conozcas
    defaultLocale: string;
    locales: string[];

    i18nextServer: {
      debug: boolean;
    };
  }

  // Asegúrate de que 'astro-i18next' exporte una función, objeto o clase
  const astroI18next: {
    init: (config: AstroI18nextConfig) => void;
    // Aquí puedes agregar otras funciones o propiedades si las conoces.
  };

  export = astroI18next;
}
