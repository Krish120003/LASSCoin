import styled from 'styled-components';
import Link from 'next/link';


const Foo = styled.nav`
    height: 80px;
    background: #000;
    color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `;

const StyledLink = styled.a`
    padding: 0rem 2rem;
`

const Navbar = () => {
    return (
        <Foo>
            <div> 
                <Link href='/'>
                    <StyledLink> Wallet </StyledLink> 
                </Link>
            </div>
            <div> 
                <Link href='/'>
                    <StyledLink> Global Transactions </StyledLink> 
                </Link>
            </div>
        </Foo>
    );
};

export default Navbar;