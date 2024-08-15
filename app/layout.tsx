import type { Metadata } from 'next';
import { Inter, Montserrat, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: {
    default: ' Metro Calaca Hospital Corp (MCHC)',
    template: '%s | Metro Calaca Hospital Corp (MLMC)',
  },
  description: '(MCHC)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${montserrat.variable} ${roboto_mono.variable}`}
      >
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#E18E26',
                fontFamily: 'Inter',
                colorTextSecondary: '#1F75FE',
              },
              components: {
                Collapse: {
                  headerBg: '#ffffff',
                },
                Menu: {
                  darkItemBg: '#E18E26',
                  darkItemSelectedColor: '#1F75FE !important',
                  itemSelectedBg: '#E18E26 !important',
                  itemSelectedColor: '#1F75FE !important',
                  darkItemColor: '#ffffff',
                },
                Breadcrumb: {
                  itemColor: '#FFFFFF',
                  linkColor: '#FFFFFF',
                  linkHoverColor: '#FFFFFF',
                  colorBgTextHover: '#E18E26',
                  lastItemColor: '#1F75FE',
                  separatorColor: '#FFFFFF',
                },
                Dropdown: {
                  controlItemBgActive: '#1F75FE',
                  controlItemBgActiveHover: '#1F75FE',
                },
              },
            }}
          >
            <main>{children}</main>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
