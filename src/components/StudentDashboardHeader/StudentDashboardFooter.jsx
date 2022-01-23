import './style.scss';

const StudentDashboardFooter = ({styles}) => {
  return (
    <div
      className="MCappbarWrapperforfooter make-center"
      style={styles}
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
export default StudentDashboardFooter;
