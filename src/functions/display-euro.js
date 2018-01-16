export default function displayEuro (amount) {
   return new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(amount);
}