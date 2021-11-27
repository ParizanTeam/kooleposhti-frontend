import './style.scss';

const TheFooter = () => {
  return (
    <div
      className="Thefooter"
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >

      <div className="the-footer__bylove">
        <span className="the-footer__content__s">ساخته شده با</span>
        <div className="the-footer__content__h">
          <span>&hearts;</span>
        </div>
        <span className="the-footer__content__s">در ایران</span>
      </div>
    </div>
  );
};
export default TheFooter;