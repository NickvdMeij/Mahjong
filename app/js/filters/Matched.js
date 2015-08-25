module.exports 				= function ()
{
	return function (arr, matched)
	{
		var toReturn 		= [];

		angular.forEach(arr, function (level, levelKey)
		{
			var rows 		= [];

			angular.forEach(level, function (row, rowKey)
			{
				var tiles 	= [];

				angular.forEach(row, function (tile, tileKey)
				{
					if (tile.matched == matched)
					{
						toReturn.push(tile);
					} 
				}, tiles);

			}, rows);

		}, toReturn);

		return toReturn;
	}
};