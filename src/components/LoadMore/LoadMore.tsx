import { ReactElement } from 'react';
import s from './LoadMore.module.css'
import { animateScroll as scroll } from 'react-scroll';

interface LoadMoreProps {
  onMore: () => void;
}

const LoadMore = ({ onMore }: LoadMoreProps): ReactElement => {
    
     const handleScrollToTop = ():void => {
    scroll.scrollToTop({
      duration: 500,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div>
          <button onClick={onMore} className={s.moreBtn}>Load more</button>
          <button onClick={handleScrollToTop}>Scroll to Top</button>
    </div>
  )
}

export default LoadMore
