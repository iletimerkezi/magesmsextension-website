// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ücretsiz Magento SMS Eklentisi - İleti Merkezi',
  tagline: 'Magento SMS modülü, kullanıcılarınıza daha kaliteli bir müşteri deneyimi sunmanız için tasarlanmıştır. Hemen deneyin.',
  url: 'https://magesmsextension.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'iletimerkezi', // Usually your GitHub org/user name.
  projectName: 'magesmsextension-website', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        // blog: {
        //   showReadingTime: true,
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
			colorMode: {
				defaultMode: 'light',
				disableSwitch: true,
				respectPrefersColorScheme: false,
			},
      navbar: {
        // style: 'dark',
        title: '',
        logo: {
          alt: 'Magento SMS Logo',
          src: 'img/magento-logo.png',
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'right',
          //   label: 'Tutorial',
          // },
          // {
          //   to:
          //   '/blog',
          //   label: 'Blog',
          //   position: 'right'
          // },
          {
            type: 'localeDropdown',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'İletiMerkezi Logo',
          src: 'img/iletimerkezi-logo.png',
          href: 'https://www.iletimerkezi.com',
          // width: 160,
          // height: 51,
        },
        links: [
          {
            title: 'Çözümler',
            items: [
              {
                label: 'Opencart SMS',
                href: 'http://opencartsms.com/',
              },
              {
                label: 'Prestashop SMS',
                href: 'http://prestashopsms.com/',
              },
              {
                label: 'Magento SMS',
                href: 'http://magesmsextension.com/',
              },
              {
                label: 'WHMCS SMS',
                href: 'https://www.whmcssms.com/',
              },
              {
                label: 'Woocommerce SMS',
                href: 'https://www.woocommercesms.com/',
              },
              {
                label: 'Excel SMS',
                href: 'https://www.excelsmseklentisi.com/',
              },
            ],
          },
          {
            title: 'Geliştirici & Yazılımcılar',
            items: [
              {
                label: 'SMS API',
                href: 'https://a2psmsapi.com/',
              },
              {
                label: 'Hesap Oluştur',
                href: 'https://www.iletimerkezi.com/panel/auth/signup?ref=whmcssms.com',
              }
            ],
          },
          {
            title: 'Biz Kimiz?',
            items: [
              {
                label: 'İletişim',
                href: 'https://www.iletimerkezi.com/iletisim',
              },
              {
                label: 'Hakkımızda',
                href: 'https://www.iletimerkezi.com/hakkimizda',
              },
            ],
          },
        ],
        copyright: `Magesmsextension SMS T.C. Bilgi Teknolojileri ve İletişim Kurumu (BTK) tarafından yetkilendirilmiş işletmeci olan eMarka İletişim ve Bilgi Teknolojileri A.Ş. ye ait bir markadır.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
