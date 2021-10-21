import './style.scss';

const HowItWorks= () =>
{
  return(
  <div class = "appbarWrapper ">
      <div class="mdc-card my-card">
      <p class = "my-card-title">میخوای دوره هامون رو ببینی؟</p>
      <div class="my-card__media mdc-card__media mdc-card__media--16-9">
        <img src= "https://8pic.ir/uploads/apple-learning.gif" alt="HIWmedia" class="my-card__media"/></div>
      <p class="my-card-content">--توضیحات--</p>
      </div>

      <div class="mdc-card my-card">
      <p class = "my-card-title">چجوری تو کلاسها ثبت نام کنیم؟</p>
      <div class="my-card__media mdc-card__media mdc-card__media--16-9">
        <img src= "https://8pic.ir/uploads/Dino-Learning.gif" alt="HIWmedia" class="my-card__media"/></div>
      <p class="my-card-content">--توضیحات--</p>
      </div>

      <div class="mdc-card my-card">
      <p class = "my-card-title">یکم فضای کلاسها و چالشها رو با هم ببینیم؟</p>
      <div class="my-card__media mdc-card__media mdc-card__media--16-9">
        <img src= "https://8pic.ir/uploads/Thoughts-in-my-Mind-.gif" alt="HIWmedia" class="my-card__media"/></div>
      <p class="my-card-content">--توضیحات--</p>
      </div>
    </div>
  );

}
export default HowItWorks;


