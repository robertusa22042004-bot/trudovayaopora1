import React, { useState, useEffect } from 'react';
import { Page, ServiceItem, JobPosition } from './types';
import { SERVICES, JOBS, PRICING_TIERS, COMPANY_NAME, COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS } from './constants';
import AIChatWidget from './components/AIChatWidget';

// -- Sub-Components --

const Navigation = ({ currentPage, setPage, isMenuOpen, setIsMenuOpen }: any) => {
  const links = [
    { id: Page.HOME, label: 'О компании' }, 
    { id: Page.SERVICES, label: 'Услуги' },
    { id: Page.PRICING, label: 'Прайс' },
    { id: Page.JOBS, label: 'Вакансии' },
    { id: Page.CONTACT, label: 'Контакты' },
    { id: Page.APPLICATION, label: 'Заявка' },
  ];

  return (
    <nav className="bg-slate-950/90 backdrop-blur-md text-white sticky top-0 z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => setPage(Page.HOME)}>
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center mr-3 shadow-glow transition-transform group-hover:scale-105">
                <span className="text-2xl">🏗️</span>
            </div>
            <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tighter text-white uppercase leading-none">ТРУДОВАЯ</span>
                <span className="font-bold text-sm tracking-widest text-brand-500 uppercase leading-none">ОПОРА</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-6">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`${(currentPage === link.id || (link.id === Page.SERVICES && currentPage === Page.SERVICE_DETAIL)) ? 'text-brand-400' : 'text-slate-300 hover:text-white'} transition-all px-3 py-2 text-xs lg:text-sm font-bold tracking-wide uppercase hover:bg-white/5 rounded-md`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-white/10">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { setPage(link.id); setIsMenuOpen(false); }}
                className={`${currentPage === link.id ? 'bg-brand-600/20 text-brand-500' : 'text-slate-300 hover:bg-white/5 hover:text-white'} block w-full text-left px-4 py-3 rounded-lg text-sm font-bold tracking-wide uppercase transition-colors`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setPage }: any) => (
  <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-white text-2xl font-extrabold tracking-tight mb-6 uppercase">{COMPANY_NAME}</h3>
        <p className="mb-6 text-slate-500 max-w-sm leading-relaxed">Надежность. Качество. Оперативность. Мы берем на себя самую тяжелую работу, чтобы вы могли сосредоточиться на главном.</p>
        <div className="flex space-x-4">
           <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all cursor-pointer border border-slate-800">VK</div>
           <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all cursor-pointer border border-slate-800">TG</div>
        </div>
      </div>
      <div>
        <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Навигация</h3>
        <ul className="space-y-3">
          <li><button onClick={() => setPage(Page.SERVICES)} className="hover:text-brand-500 transition-colors">Услуги</button></li>
          <li><button onClick={() => setPage(Page.PRICING)} className="hover:text-brand-500 transition-colors">Прайс-лист</button></li>
          <li><button onClick={() => setPage(Page.JOBS)} className="hover:text-brand-500 transition-colors">Вакансии</button></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Контакты</h3>
        <ul className="space-y-4">
          <li className="flex items-center group">
              <span className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center mr-3 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">📞</span> 
              <span className="group-hover:text-white transition-colors">{COMPANY_PHONE}</span>
          </li>
          <li className="flex items-center group">
              <span className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center mr-3 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">📧</span> 
              <span className="group-hover:text-white transition-colors">{COMPANY_EMAIL}</span>
          </li>
          <li className="flex items-start group">
              <span className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center mr-3 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors flex-shrink-0">📍</span> 
              <span className="group-hover:text-white transition-colors">{COMPANY_ADDRESS}</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-16 pt-8 border-t border-slate-900 text-center text-sm text-slate-600">
      &copy; {new Date().getFullYear()} {COMPANY_NAME}. Все права защищены.
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
    const TESTIMONIALS = [
        { name: "Алексей Петров", role: "Частный заказчик", text: "Отличная работа! Ребята приехали вовремя, быстро загрузили весь строительный мусор. Цены адекватные, без скрытых доплат." },
        { name: "ООО 'СтройГрад'", role: "Застройщик", text: "Сотрудничаем на постоянной основе. Грузчики всегда трезвые, бригадиры адекватные. Документооборот без задержек. Рекомендуем." },
        { name: "Елена Смирнова", role: "Владелец офиса", text: "Нужно было срочно организовать переезд офиса в выходной день. Все сделали аккуратно, мебель разобрали и собрали. Спасибо!" },
        { name: "Игорь Василенко", role: "Логистическая компания", text: "Выручили с разгрузкой фуры ночью. Машина пришла с опозданием, но бригада дождалась и все быстро разгрузила. Профессионалы." }
    ];

    return (
      <div className="animate-fade-in">
        {/* Hero */}
        <div className="relative bg-slate-950 overflow-hidden h-[600px] flex items-center">
            <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop" alt="Industrial Background" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                    <div className="inline-block bg-brand-600/20 border border-brand-500/30 rounded-full px-4 py-1 mb-6">
                        <span className="text-brand-400 font-bold text-xs uppercase tracking-widest">Профессиональный аутсорсинг</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                        ТЯЖЕЛАЯ РАБОТА <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">НАША ЗАБОТА</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light">
                        Предоставляем квалифицированный персонал для строительных, погрузочных и ландшафтных работ. 
                        Ростов-на-Дону и область.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => setPage(Page.CONTACT)} className="bg-brand-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-500 transition-all shadow-glow hover:translate-y-[-2px] uppercase tracking-wide">
                            Рассчитать стоимость
                        </button>
                        <button onClick={() => setPage(Page.SERVICES)} className="group bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all uppercase tracking-wide flex items-center justify-center">
                            Наши услуги <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Features */}
        <div className="py-24 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight mb-4">ПОЧЕМУ ВЫБИРАЮТ НАС</h2>
                    <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-premium border border-slate-100 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform text-brand-600">⚡</div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">Оперативность</h3>
                        <p className="text-slate-600 leading-relaxed">Подача машины и бригады в кратчайшие сроки. Работаем 24/7 без праздников и выходных.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-premium border border-slate-100 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform text-brand-600">💰</div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">Честные цены</h3>
                        <p className="text-slate-600 leading-relaxed">Фиксированная стоимость, прозрачные сметы. Никаких скрытых платежей. Система скидок.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-premium border border-slate-100 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform text-brand-600">🛡️</div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">Гарантия качества</h3>
                        <p className="text-slate-600 leading-relaxed">Только проверенный персонал, граждане РФ. Материальная ответственность за ваше имущество.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Testimonials */}
        <div className="py-24 bg-slate-950 text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">ОТЗЫВЫ КЛИЕНТОВ</h2>
                        <p className="text-slate-400">Что говорят о нас заказчики</p>
                    </div>
                    <div className="hidden md:block">
                        <button className="text-brand-500 font-bold hover:text-brand-400 transition-colors">Читать все отзывы →</button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-brand-500/50 transition-colors flex flex-col">
                            <div className="flex text-brand-500 mb-4">★★★★★</div>
                            <p className="text-slate-300 italic mb-6 text-sm leading-relaxed flex-grow">"{t.text}"</p>
                            <div className="border-t border-white/10 pt-4">
                                <div className="font-bold text-white text-sm">{t.name}</div>
                                <div className="text-xs text-brand-500 uppercase tracking-wide mt-1">{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
};

const ServicesPage = ({ setServicePage }: { setServicePage: (id: string) => void }) => (
  <div className="py-20 bg-slate-50 animate-fade-in min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
            <h2 className="text-brand-600 font-bold tracking-widest uppercase mb-3 text-sm">Наши компетенции</h2>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                ПОЛНЫЙ СПЕКТР УСЛУГ
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 group cursor-pointer border border-slate-100 flex flex-col" onClick={() => setServicePage(service.id)}>
                    <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                        <img src={`https://picsum.photos/400/300?random=${service.id.length}`} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                             <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-brand-600 transition-colors">{service.title}</h3>
                             <span className="text-3xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-lg">{service.icon}</span>
                        </div>
                        <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">{service.description}</p>
                        <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto">
                            <span className="text-slate-900 font-bold text-sm bg-slate-100 px-3 py-1 rounded-md">{service.priceRange}</span>
                            <span className="text-brand-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                                Подробнее <span>→</span>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </div>
);

const ServiceDetailPage = ({ serviceId, setPage }: { serviceId: string, setPage: (p: Page) => void }) => {
    const service = SERVICES.find(s => s.id === serviceId);

    if (!service) {
        return <div className="py-20 text-center text-xl">Услуга не найдена</div>;
    }

    return (
        <div className="animate-fade-in bg-white">
            {/* Service Hero */}
            <div className="relative bg-slate-950 h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                     <img src={`https://picsum.photos/1200/600?random=${service.id.length}`} alt={service.title} className="w-full h-full object-cover opacity-40 blur-[2px]" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <div className="inline-flex items-center justify-center bg-brand-500/20 border border-brand-500/50 text-brand-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                        Услуги компании
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">{service.title}</h1>
                    <div className="text-white/80 text-lg font-light flex items-center justify-center gap-2">
                        <span>Ориентировочная стоимость:</span>
                        <span className="text-brand-400 font-bold text-2xl">{service.priceRange}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Info */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-slate max-w-none">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                                Описание услуги
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-10">
                                {service.fullDescription}
                            </p>
                            
                            <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wide">Ключевые преимущества</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 transition-colors">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-medium pt-1">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar CTA */}
                    <div className="lg:col-span-4">
                        <div className="bg-slate-900 p-8 rounded-2xl sticky top-28 shadow-2xl text-white overflow-hidden relative">
                            {/* Decor */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500 rounded-full blur-3xl opacity-20"></div>

                            <h3 className="text-2xl font-bold mb-2 relative z-10">Заказать услугу</h3>
                            <p className="text-slate-400 mb-8 text-sm relative z-10">Оставьте заявку и менеджер свяжется с вами для уточнения деталей и расчета стоимости.</p>
                            
                            <div className="space-y-4 mb-8 relative z-10">
                                <button 
                                    onClick={() => setPage(Page.CONTACT)}
                                    className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-500 transition-all shadow-lg flex items-center justify-center gap-2 group"
                                >
                                    <span>Позвонить сейчас</span>
                                    <span className="text-xs opacity-70 group-hover:opacity-100">↗</span>
                                </button>
                                <button 
                                    onClick={() => setPage(Page.APPLICATION)}
                                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                                >
                                    Оставить заявку
                                </button>
                            </div>
                            
                            <div className="border-t border-white/10 pt-6 relative z-10">
                                <div className="flex items-center justify-center text-white text-lg font-bold mb-2">
                                    <span className="mr-2 text-brand-500">📞</span> {COMPANY_PHONE}
                                </div>
                                <div className="text-center text-xs text-slate-500 uppercase tracking-widest">
                                    Работаем без выходных
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other services */}
            <div className="bg-slate-50 py-16 border-t border-slate-200">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Другие услуги</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {SERVICES.filter(s => s.id !== serviceId).slice(0, 3).map(s => (
                            <div 
                                key={s.id} 
                                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-200 cursor-pointer transition-all group"
                                onClick={() => window.location.hash = `#service/${s.id}`}
                            >
                                <div className="font-bold text-slate-900 mb-2 text-lg group-hover:text-brand-600 transition-colors">{s.title}</div>
                                <div className="text-sm text-slate-500 mb-3">{s.description.substring(0, 60)}...</div>
                                <div className="text-sm font-bold text-brand-600">{s.priceRange}</div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>
    );
};

const AboutPage = () => (
    <div className="py-20 bg-white animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
                <div className="mb-12 lg:mb-0">
                     <div className="inline-block bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                         О нас
                     </div>
                     <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-6 tracking-tight">
                        {COMPANY_NAME}
                    </h2>
                    <h3 className="text-2xl text-brand-600 font-bold mb-6">Ваш надежный партнер в мире тяжелых работ</h3>
                    <div className="prose prose-lg text-slate-600 mb-8">
                        <p className="mb-4">
                            Мы предоставляем качественные услуги по предоставлению рабочего персонала и спецтехники в Ростове-на-Дону. Наша цель — избавить вас от тяжелой физической работы, предоставляя сервис европейского уровня.
                        </p>
                        <p>
                            Будь то масштабный переезд офиса, подготовка строительной площадки или сложная такелажная работа — мы подходим к каждой задаче с максимальной ответственностью.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mt-10">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <div className="font-extrabold text-3xl text-brand-600 mb-1">5+ Лет</div>
                            <div className="text-slate-600 text-sm font-medium">Успешной работы</div>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <div className="font-extrabold text-3xl text-brand-600 mb-1">24/7</div>
                            <div className="text-slate-600 text-sm font-medium">Прием заявок</div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-brand-200/50 rounded-2xl transform rotate-3"></div>
                    <img className="relative rounded-2xl shadow-2xl ring-1 ring-slate-900/5" src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" alt="Team working" />
                </div>
            </div>
        </div>
    </div>
);

const PricingPage = () => (
    <div className="py-20 bg-slate-50 animate-fade-in min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 sm:text-5xl tracking-tight">Прайс-лист</h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                    Прозрачное ценообразование без скрытых платежей.
                </p>
            </div>

            <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th scope="col" className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider">Услуга</th>
                            <th scope="col" className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider">Стоимость</th>
                            <th scope="col" className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider hidden sm:table-cell">Примечание</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {PRICING_TIERS.map((tier: any, idx) => (
                            <tr key={idx} className={`hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-slate-900">{tier.name}</td>
                                <td className="px-8 py-6 whitespace-nowrap text-sm text-brand-600 font-extrabold">{tier.price}</td>
                                <td className="px-8 py-6 text-sm text-slate-500 hidden sm:table-cell">{tier.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-10 bg-white border-l-4 border-brand-500 rounded-r-xl p-8 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center">
                    <span className="text-brand-500 mr-2">ℹ️</span> Важная информация
                </h3>
                <p className="text-slate-600">
                    Стоимость может варьироваться в пределах 15% в зависимости от сложности работ, удаленности объекта, наличия лифта (для грузчиков) и формы оплаты. Для точного расчета свяжитесь с менеджером.
                </p>
            </div>
        </div>
    </div>
);

const JobsPage = ({ setPage, setSelectedJob }: { setPage: (p: Page) => void, setSelectedJob: (j: string) => void }) => (
    <div className="py-20 bg-white animate-fade-in">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Вакансии</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Мы ценим честный труд и предлагаем достойную оплату. Присоединяйтесь к нашей команде профессионалов.
                </p>
            </div>
            
            <div className="space-y-8">
                {JOBS.map((job) => (
                    <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-brand-300 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                                <div className="flex flex-wrap gap-3 text-sm font-medium">
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">📍 {job.location}</span>
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">⏱️ {job.type}</span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">💰 {job.salary}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => { setSelectedJob(job.title); setPage(Page.APPLICATION); }}
                                className="mt-6 md:mt-0 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors uppercase text-sm tracking-wide shadow-lg"
                            >
                                Откликнуться
                            </button>
                        </div>
                        <p className="text-slate-600 mb-6 text-lg">{job.description}</p>
                        <div className="bg-slate-50 p-6 rounded-xl">
                            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 block">Требования к кандидату</span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {job.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-center text-sm text-slate-700 font-medium">
                                        <svg className="w-4 h-4 text-brand-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ApplicationPage = ({ selectedJob }: { selectedJob: string }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="py-32 bg-white animate-fade-in text-center px-4 min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full mb-8 flex items-center justify-center animate-bounce-slow">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Заявка успешно отправлена!</h2>
                <p className="text-slate-500 max-w-md mx-auto text-lg">Спасибо за обращение. Наш менеджер свяжется с вами в течение 15 минут.</p>
                <button onClick={() => window.location.reload()} className="mt-8 text-brand-600 font-bold hover:text-brand-800">Вернуться на главную</button>
            </div>
        );
    }

    return (
        <div className="py-20 bg-slate-50 animate-fade-in min-h-screen">
            <div className="max-w-2xl mx-auto px-4 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                    {selectedJob ? `Отклик на вакансию` : 'Оставить заявку'}
                </h1>
                <p className="text-slate-500 mb-8">{selectedJob ? selectedJob : 'Заполните форму, и мы рассчитаем стоимость работ'}</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Ваше имя</label>
                            <input type="text" required className="block w-full rounded-lg border-slate-200 bg-slate-50 p-3 focus:border-brand-500 focus:ring-brand-500 focus:bg-white transition-all outline-none" placeholder="Иван Иванов" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Телефон</label>
                            <input type="tel" required className="block w-full rounded-lg border-slate-200 bg-slate-50 p-3 focus:border-brand-500 focus:ring-brand-500 focus:bg-white transition-all outline-none" placeholder="+7 (999) 000-00-00" />
                        </div>
                    </div>
                    
                    {!selectedJob && (
                        <div className="space-y-2">
                             <label className="block text-sm font-bold text-slate-700">Тип услуги</label>
                             <select className="block w-full rounded-lg border-slate-200 bg-slate-50 p-3 focus:border-brand-500 focus:ring-brand-500 focus:bg-white transition-all outline-none">
                                <option>Заказ услуг грузчиков</option>
                                <option>Вывоз мусора</option>
                                <option>Разнорабочие</option>
                                <option>Ландшафтные работы</option>
                                <option>Другое</option>
                             </select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">Комментарий</label>
                        <textarea rows={4} className="block w-full rounded-lg border-slate-200 bg-slate-50 p-3 focus:border-brand-500 focus:ring-brand-500 focus:bg-white transition-all outline-none" placeholder={selectedJob ? "Расскажите о вашем опыте..." : "Опишите задачу, примерный объем..."}></textarea>
                    </div>
                    
                    {selectedJob && (
                         <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Резюме (опционально)</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Нажмите для загрузки</span> или перетащите файл</p>
                                        <p className="text-xs text-slate-500">PDF, JPG (MAX. 5MB)</p>
                                    </div>
                                    <input type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                    )}

                    <button type="submit" className="w-full bg-brand-600 text-white py-4 px-4 rounded-xl hover:bg-brand-500 font-extrabold transition-all shadow-lg hover:shadow-xl uppercase tracking-wider transform hover:-translate-y-0.5">
                        Отправить заявку
                    </button>
                    <p className="text-xs text-center text-slate-400 mt-4">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
                </form>
            </div>
        </div>
    );
};

const ContactPage = () => (
    <div className="py-20 bg-white animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">Контакты</h1>
                    <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                        Мы всегда на связи. Выберите удобный способ для коммуникации или приезжайте к нам в офис.
                    </p>
                    
                    <div className="space-y-8">
                        <div className="flex items-start group">
                            <div className="flex-shrink-0 w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                📞
                            </div>
                            <div className="ml-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Телефон</h3>
                                <p className="text-brand-600 font-extrabold text-2xl mb-1">{COMPANY_PHONE}</p>
                                <p className="text-sm text-slate-500">Ежедневно с 8:00 до 22:00</p>
                            </div>
                        </div>
                         <div className="flex items-start group">
                            <div className="flex-shrink-0 w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                📧
                            </div>
                            <div className="ml-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                                <p className="text-slate-700 font-medium text-lg">{COMPANY_EMAIL}</p>
                                <p className="text-sm text-slate-500">Для коммерческих предложений</p>
                            </div>
                        </div>
                        <div className="flex items-start group">
                            <div className="flex-shrink-0 w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                📍
                            </div>
                            <div className="ml-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Офис</h3>
                                <p className="text-slate-700 font-medium text-lg">{COMPANY_ADDRESS}</p>
                                <p className="text-sm text-slate-500">Центральный район</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-xl">
                    <h3 className="text-2xl font-bold mb-6 text-slate-900">Быстрая связь</h3>
                    <form className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                            <input type="text" placeholder="Ваше имя" className="w-full p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
                            <input type="text" placeholder="Телефон" className="w-full p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <input type="email" placeholder="Email (не обязательно)" className="w-full p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
                        <select className="w-full p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-slate-600">
                            <option value="">Выберите тему обращения</option>
                            <option value="junk">Заказ услуги</option>
                            <option value="labor">Сотрудничество</option>
                            <option value="other">Вопрос по вакансии</option>
                        </select>
                        <textarea rows={4} placeholder="Текст сообщения..." className="w-full p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"></textarea>
                        <button type="button" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-brand-600 transition-colors uppercase tracking-widest shadow-lg">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

// --- Main App ---

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Handle Hash Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || Page.HOME;
      
      if (hash.startsWith('service/')) {
        const serviceId = hash.split('/')[1];
        setSelectedServiceId(serviceId);
        setCurrentPage(Page.SERVICE_DETAIL);
      } else if (Object.values(Page).includes(hash as Page)) {
        setCurrentPage(hash as Page);
      } else {
        // Default to Home if hash not found, unless it's a detail route not fully matched in enum
        setCurrentPage(Page.HOME);
      }
    };

    // Set initial page
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setPage = (page: Page) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const setServicePage = (serviceId: string) => {
    window.location.hash = `service/${serviceId}`;
    // The useEffect will handle state update
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <HomePage setPage={setPage} />;
      case Page.ABOUT: return <AboutPage />;
      case Page.SERVICES: return <ServicesPage setServicePage={setServicePage} />;
      case Page.SERVICE_DETAIL: return <ServiceDetailPage serviceId={selectedServiceId} setPage={setPage} />;
      case Page.PRICING: return <PricingPage />;
      case Page.JOBS: return <JobsPage setPage={setPage} setSelectedJob={setSelectedJob} />;
      case Page.APPLICATION: return <ApplicationPage selectedJob={selectedJob} />;
      case Page.CONTACT: return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navigation 
        currentPage={currentPage} 
        setPage={setPage} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setPage={setPage} />
      
      {/* GenAI Chat Widget */}
      <AIChatWidget />
    </div>
  );
};

export default App;
