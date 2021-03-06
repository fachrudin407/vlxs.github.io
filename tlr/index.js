(function() {

var RANKINGS = [
    { label: 'Too Pure', value: 'P' },
    { label: 'S+', value: 'SS' },
    { label: 'S', value: 'S' },
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'F', value: 'F' },
];

var CHARACTERS = [
    'Aya',
    { name: 'Celine', file: 'celine.png', default: 'P', },
    'Haruna',
    'Kyouko',
    'Lala',
    'Mea',
    'Mikan',
    'Mio',
    'Momo',
    'Nana',
    'Nemesis',
    'Riko',
    'Rin',
    'Risa',
    'Run',
    'Ryouko',
    'Saki',
    'Sephie',
    'Shizu',
    'Tearju',
    { name: 'Yami (darkness)', file: 'darkness.png' },
    'Yami',
    'Yui',
];

var RANKING_ORDER = [ 'P', 'SS', 'S', 'A', 'B', 'C', 'D', 'E', 'F' ];
    
angular.module('app')
    .constant('CHARACTERS', CHARACTERS)
    .constant('RANKINGS', RANKINGS)
    .constant('RANKING_ORDER', RANKING_ORDER)
    .config(function($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('tlr');
    });

})();
