export default function (backers, showAll) {
    return backers
        .map(backer => (Object.assign({}, backer, {
            contributed: parseInt(backer.contributed, 10)
        })))
        .filter( backer => ( showAll ? true : backer.contributed > 0))
        .sort((a, b) => (b.contributed - a.contributed));
}