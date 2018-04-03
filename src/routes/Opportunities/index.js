import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Menu from '../../components/Menu';
import displayEuro from '../../functions/display-euro';

const personalOpportunities = [{
    cost: 5,
    text: 'Get 25 Buixieval stickers'
}, {
    cost: 10,
    text: 'Get a team cap. (decoration can be earned)'
}, {
    cost: 15,
    text: 'Spot on the Capstok'
}, {
    cost: 25,
    text: 'BuixievalTimer on Buixieval board',
}];

const teamOpportunities = [{
    cost: 0.68,
    text: 'Free beer!',
},{
    cost: 50,
    text: 'Buixieval stickers',
}, {
    cost: 100,
    text: 'Franckenfruit',
}, {
    cost: 450,
    text: 'Buixieval stripe system',
}, {
    cost: 500,
    text: 'Livestream',
}, {
    cost: 1000,
    text: 'Daniëlle',
}];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 15px;
    height: calc(100vh - 50px);
`;

const Tr = styled.tr`
    margin-top: 2px;
    background-color: #000;
    font-size: 27px;
`;

const PinkTable = styled.table`
    color: #FF99FF;
`;

const BlueTable = styled.table`
    color: #01FFFF;
`;

const Td = styled.td`
    padding: 10px;
`;

const H2 = styled.h2`
    color: #000;
`;

const Opportunities = ({ dominantTeam }) => {
    const DominantTable = dominantTeam === 'p' ? PinkTable : BlueTable;
    return (
        <div>
            <Menu/>
            <Container>
                <div>
                    <H2>Individual opportunities</H2>
                    <DominantTable>
                        <tbody>
                        {personalOpportunities.map((opportunity, i) => (
                            <Tr key={i}>
                                <Td style={{ paddingRight: 10 }}>{displayEuro(opportunity.cost)}</Td>
                                <Td>{opportunity.text}</Td>
                            </Tr>

                        ))}
                        </tbody>
                    </DominantTable>
                </div>

                <div>
                    <H2>Collective opportunities</H2>
                    <DominantTable>
                        <tbody>
                        {teamOpportunities.map((opportunity, i) => (
                            <Tr key={i}>
                                <Td style={{ paddingRight: 10 }}>{displayEuro(opportunity.cost)}</Td>
                                <Td>{opportunity.text}</Td>
                            </Tr>
                        ))}
                        </tbody>
                    </DominantTable>
                </div>
            </Container>
        </div>
    )
};

const mapStateToProps = state => ({
    dominantTeam: state.dominantTeam,
});

export default connect(mapStateToProps)(Opportunities);