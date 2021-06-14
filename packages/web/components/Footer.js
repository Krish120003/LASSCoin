import styled from 'styled-components'


const Foo = styled.nav`
    height: 80px;
    background: #E6E6FA;
    `;

const Footer = () => {
    return (
        <Foo>
            <h1> Footer </h1>
        </Foo>
    );
};

export default Footer;