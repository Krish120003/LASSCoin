import styled from 'styled-components';
import Link from 'next/link';


const Foo = styled.nav`
    height: 80px;
    background: #E6E6FA;
    `;

const Navbar = () => {
    return (
        <Foo>
            <div> 
                <Link href='/'>
                    <a> Wallet </a> 
                </Link>
            </div>
            <div> 
                <Link href='/'>
                    <a> Global Transactions </a> 
                </Link>
            </div>
        </Foo>
    );
};

export default Navbar;