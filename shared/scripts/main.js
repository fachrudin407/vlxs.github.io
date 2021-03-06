(function() {

angular.module('app', [ 'ui.bootstrap', 'ngStorage' ])
    .controller('MainController', function($scope, $timeout, $sce, $localStorage, $canvas, CHARACTERS, RANKINGS, RANKING_ORDER) {

        CHARACTERS = CHARACTERS.map(function(c) {
            if (c.constructor == String)
                return { name: c, file: c.toLowerCase() + '.png' };
            return c;
        });

        $scope.characters = angular.extend([ ], CHARACTERS);
        $scope.characters.sort(function(x,y) { return x.name.localeCompare(y.name); });

        $scope.availableRankings = RANKINGS;

        /***********************/

        var usedRankings = { };
        CHARACTERS.map(function(x) { if (x.default) usedRankings[x.default] = true; });
        usedRankings = Object.keys(usedRankings);

        while (usedRankings.length < Math.min(5, RANKING_ORDER.length)) {
            var ranking = null;
            do { ranking = RANKING_ORDER[Math.floor(Math.random() * RANKING_ORDER.length)]; }
            while (usedRankings.indexOf(ranking) !== -1);
            usedRankings.push(ranking);
        }

        $scope.rankings = { };
        for (var i=0;i<CHARACTERS.length;++i) {
            CHARACTERS[i].fileStr = $sce.trustAsHtml('<img src="assets/' + CHARACTERS[i].file + '" class="hoverImg">')
            if (CHARACTERS[i].hasOwnProperty('default')) continue;
            CHARACTERS[i].default = usedRankings[Math.floor(Math.random() * usedRankings.length)];
        }
        CHARACTERS.forEach(function(c) { $scope.rankings[c.name] = c.default });

        /***********************/

        $scope.update = function() {
            $canvas.update($scope.rankings);
        };

        $scope.download = function() {
            var link = document.createElement('a');
            link.href = $('#canvas')[0].toDataURL('image/jpeg');
            link.download = 'ranking.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        /***********************/

        if ($localStorage.rankings) angular.extend($scope.rankings, $localStorage.rankings);
        $localStorage.rankings = $scope.rankings;

        $scope.$on('$includeContentLoaded', function() {
            $timeout($scope.update);
        });

    });

})();
