import * as React from 'react';
import Navbar from '../Navbar';
import studentCoins from '../../assets/images/studentCoins.png';
import myCions from '../../assets/images/myCoins.png';
import coin from '../../assets/images/coin.png';
import { convertNumberToPersian } from '../../utils/helpers';
import './style.scss';

function StudentCoins(){
    return(
        <div>
            <Navbar color='#dc143c'/>
                <div className='mainCoins'>
                    <div className='studentCoins'>
                        <p>سکه های من</p>
                        <img src={studentCoins} alt='StudentCoins' className='studentCoins__media'/>  
                    </div>
                    <div className='myCoins'>
                        <img src={myCions} alt='MyCoins' className='myCoins__media'/>
                        <div className='inArow'>
                            <p className='pinki__content'>{convertNumberToPersian(`${200} تا`)}</p>
                            <p><img src={coin} alt='coin' className='pinki__media'/></p>
                            <p className='pinki__content'>برام باقی مونده!</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default StudentCoins;