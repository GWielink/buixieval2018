export default function (backers, showAll) {
    return backers
        .map(backer => (Object.assign({}, backer, {
            contributed: parseFloat(backer.contributed, 10),
            reverse: Math.random () > 0.5,
        })))
        .filter( backer => ( showAll ? true : backer.contributed > 0))
        .sort((a, b) => (b.contributed - a.contributed));
}
