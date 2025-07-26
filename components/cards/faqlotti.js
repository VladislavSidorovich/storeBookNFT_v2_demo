import dynamic from 'next/dynamic';

// Динамический импорт компонента с отключением SSR
const FaqBlock = dynamic(() => import('./card'), { ssr: false });
const FaqBlock = dynamic(() => import('./cardList'), { ssr: false });

export default FaqBlock;
