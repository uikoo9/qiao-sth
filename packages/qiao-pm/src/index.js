// ua
import ua from 'qiao-ua';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-pm');

// go
function go() {
  // root
  const rootDiv = document.getElementById('root');
  logger.info('init class', 'rootDiv', rootDiv);
  if (!rootDiv) return;

  // ua
  const userAgent = navigator.userAgent;
  logger.info('init class', 'userAgent', userAgent);
  if (!userAgent) return;

  // infos
  const infos = ua(userAgent);
  logger.info('init class', 'infos', infos);

  // class
  if (!infos.isMobile) {
    logger.info('init class', 'add class pc');
    rootDiv.classList.add('pc');
  } else {
    logger.info('init class', 'add class mobile');
    rootDiv.classList.add('mobile');

    const remEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const remFunc = () => {
      // w
      const docEl = document.documentElement;
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) {
        logger.info('rem', 'need clientWidth');
        return;
      }

      // calc
      const fontSize = 20 * (clientWidth / 320);
      if (fontSize > 40) {
        logger.info('rem', 'large then 40 px');
        return;
      }

      // set
      docEl.style.fontSize = fontSize + 'px';
    };

    // event
    if (!document.addEventListener) {
      logger.info('rem', 'need document.addEventListener');
      return;
    }
    window.addEventListener(remEvent, remFunc, false);
    remFunc();
    logger.info('rem', 'ok');
  }
}
go();
