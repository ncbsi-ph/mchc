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
                colorTextSecondary: '#5B741A',
              },
              components: {
                Collapse: {
                  headerBg: '#ffffff',
                },
                Menu: {
                  darkItemBg: '#E18E26',
                  darkItemSelectedColor: '#5B741A !important',
                  itemSelectedBg: '#E18E26 !important',
                  itemSelectedColor: '#FAE341 !important',
                },
                Breadcrumb: {
                  itemColor: '#FFFFFF',
                  linkColor: '#FFFFFF',
                  linkHoverColor: '#FFFFFF',
                  colorBgTextHover: '#E18E26',
                  lastItemColor: '#FFFF00',
                  separatorColor: '#FFFF00',
                },
                Dropdown: {
                  controlItemBgActive: '#eff71a',
                  controlItemBgActiveHover: '#eff71a',
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
