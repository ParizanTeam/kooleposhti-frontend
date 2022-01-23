import * as React from 'react';
import Navbar from '../Navbar';
import studentCoins from '../../assets/images/studentCoins.png';
import myCions from '../../assets/images/myCoins.png';
import coin from '../../assets/images/coin.png';
import { convertNumberToPersian,formatPrice } from '../../utils/helpers';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import axios from '../../utils/axiosConfig';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { baseUrl } from '../../utils/constants';
import './style.scss';
import ReactLoading from 'react-loading';
import coinTree from '../../assets/images/coinTree.png';
import './style.scss';

function StudentCoins(){
    const [coins, setCoins] = useState('?');
    const [loading, setLoading] = useState(true);
  
    const MySource = `${baseUrl}/accounts/wallet/mywallet/`;
    useEffect(() => {
      axios
        .get(MySource)
        .then(res => {
            setCoins(res.data.balance);
          console.log('coins', res.data.balance);
          setLoading(false);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }, []);
    return(
        <div className='sooratiii'>
            <Navbar color='#dc143c'/>
               <div className='mainCoins'>
                    {/* <div className='studentCoins'>
                        <p>سکه های من</p>
                        <img src={coinTree} alt='StudentCoins' className='studentCoins__media'/>  
    </div>*/}
                <img src={coinTree} alt='coinTree' className='coinTree'/>
                <div className='byMyself'>
                    {/*<div className='myCoins'>*/}
                        <img src={studentCoins} alt='MyCoins' className='byMyself__media'/>
                        <div className='inArow'>
                        <CountUp
                            className="pinki__content"
                            start={0}
                            end={coins}
                            formattingFn={coins => formatPrice(convertNumberToPersian(coins)) + ' تا'}
                            duration={coins === null ? 2.75 : 0}
                            separator=" "
                            prefix=""
                            suffix="تا"
                            />
                            <p><img src={coin} alt='coin' className='pinki__media'/></p>
                            <p className='pinki__content'>برام باقی مونده!</p>
                        </div>
                    {/*</div>*/}
                </div></div>
        </div>
    )
}
export default StudentCoins;