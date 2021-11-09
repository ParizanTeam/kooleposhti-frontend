import './style.scss';

const MyClassesFooter = () => {
  return (
    <div
      className="MCappbarWrapperforfooter"
      style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >

      <div className="MCmy-footer__bylove">
        <span className="MCmy-footer__content__s">ساخته شده با</span>
        <div className="MCmy-footer__content__h">
          <span>&hearts;</span>
        </div>
        <span className="MCmy-footer__content__s">در ایران</span>
      </div>
    </div>
  );
};
export default MyClassesFooter;
