import dynamic from 'next/dynamic';

// Динамический импорт компонента с отключением SSR
const FaqBlock = dynamic(() => import('./ImageBox'), { ssr: false });

export default FaqBlock;
