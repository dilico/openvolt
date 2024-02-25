'use client';

import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M24.7652 14.5222C24.7652 14.6399 24.7449 14.7542 24.7059 14.8616H24.7042L24.6651 14.9588L24.6024 15.1038L24.5684 15.1788L23.4809 17.7045L23.4758 17.7199L23.464 17.7472L22.4986 19.9881L22.48 20.0307L22.3035 20.4417C22.2119 20.5662 22.1474 20.7095 22.1203 20.8664L21.5129 22.2785L21.4959 22.3177L20.3202 25.0532L20.081 25.6057L20.0488 25.6825L19.9928 25.8121L19.9402 25.9383C19.7807 26.247 19.4652 26.4618 19.1004 26.4738H16.2502C16.0025 26.4601 15.7768 26.3527 15.6106 26.1873C15.4324 26.0082 15.3221 25.7609 15.3221 25.4881C15.3221 25.3704 15.3425 25.2561 15.3815 25.1504L15.4273 25.0463L15.4884 24.9048L15.5206 24.8281L16.3876 22.8174L16.6013 22.3211L16.6183 22.2819L17.5854 20.0341L17.6023 19.9915L18.5677 17.7506L18.5863 17.708L19.5873 15.3801L20.0013 14.4165L20.0335 14.3449L20.0827 14.2289L20.1574 14.055C20.3134 13.7719 20.6019 13.574 20.9395 13.5468H23.9119C24.392 13.6081 24.7669 14.0243 24.7669 14.5274L24.7652 14.5222Z" fill="black"/>
                    <path d="M23.0517 1.98231C23.0517 2.08634 23.0364 2.19037 23.0059 2.28247L22.9279 2.45983L22.877 2.5775L22.8464 2.64742L18.1741 13.5007L18.1571 13.5433L17.8246 14.3159L16.3655 17.7028L16.3486 17.7454L16.1348 18.2434C16.0669 18.344 16.016 18.4583 15.9889 18.5828L15.3832 19.9881L15.3662 20.0307L14.7674 21.4155L14.7351 21.4922L14.6757 21.627L14.6299 21.7327C14.6181 21.7532 14.6079 21.777 14.5943 21.7958C14.4348 22.0687 14.1498 22.2546 13.8156 22.2767H10.9161C10.4055 22.2426 10 21.8146 10 21.291C10 21.1546 10.0271 21.0249 10.0763 20.9073L10.1595 20.7163L10.1917 20.6378L10.4547 20.029L10.4716 19.9864L10.6566 19.5549L11.437 17.7454L11.4557 17.7028L13.2472 13.5433L13.2642 13.5007L13.9242 11.9692L18.2742 1.86464L18.3064 1.7896L18.3607 1.6634L18.4218 1.52015C18.5711 1.23705 18.8561 1.0324 19.1869 0.998291H22.1729C22.6649 1.04945 23.0517 1.47069 23.0517 1.98061V1.98231Z" fill="black"/>
                    <path d="M30.0348 18.7278C30.0348 18.8352 30.0178 18.9375 29.9873 19.0331L29.9143 19.2002L29.8634 19.3196L29.8329 19.3912L29.5767 19.9864L29.5597 20.0273L28.5927 22.275L28.5757 22.316L26.7875 26.4686L26.7706 26.5096L21.7623 38.1388L21.7301 38.2138L21.6673 38.3588L21.63 38.4441C21.4722 38.7681 21.1448 38.9932 20.763 38.9983H17.962C17.4276 38.9898 16.9967 38.5498 16.9967 38.0109C16.9967 37.8796 17.0221 37.7534 17.0696 37.6374L17.0832 37.6067L17.1578 37.4327L17.1901 37.356L21.8607 26.5062L21.8777 26.4652L23.6659 22.3126L23.6828 22.2716L23.9441 21.6628C24.0391 21.5349 24.1053 21.3848 24.1341 21.2211L24.6499 20.0239L24.6668 19.983L25.2589 18.6084L25.2912 18.5351L25.3421 18.4174L25.4167 18.2452C25.5694 17.9655 25.8544 17.7676 26.187 17.7369H29.1424C29.6429 17.783 30.0348 18.2059 30.0348 18.721V18.7278Z" fill="black"/>
                  </svg>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'border-slate-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
