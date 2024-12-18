const M_PI=3.14159265358979323;
function transformLat(x, y)
{
	let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
	ret += (20.0 *Math.sin(6.0 * x * M_PI) + 20.0 *Math.sin(2.0 * x * M_PI)) * 2.0 / 3.0;
	ret += (20.0 *Math.sin(y * M_PI) + 40.0 *Math.sin(y / 3.0 * M_PI)) * 2.0 / 3.0;
	ret += (160.0 *Math.sin(y / 12.0 * M_PI) + 320 *Math.sin(y * M_PI / 30.0)) * 2.0 / 3.0;
	return ret;
}

function transformLon(x, y)
{
	let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 *Math.sqrt(Math.abs(x));
	ret += (20.0 *Math.sin(6.0 * x * M_PI) + 20.0 *Math.sin(2.0 * x * M_PI)) * 2.0 / 3.0;
	ret += (20.0 *Math.sin(x * M_PI) + 40.0 *Math.sin(x / 3.0 * M_PI)) * 2.0 / 3.0;
	ret += (150.0 *Math.sin(x / 12.0 * M_PI) + 300.0 *Math.sin(x / 30.0 * M_PI)) * 2.0 / 3.0;
	return ret;
}

// World Geodetic System ==> Mars Geodetic System
// 坐标格式为：[Lon, Lat]
export function WGS2GCJTransform(wgs_pos)
{
    let wgLon=wgs_pos[0];
    let wgLat=wgs_pos[1];

	const a = 6378245.0;
	const ee = 0.00669342162296594323;

	let dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
	let dLon = transformLon(wgLon - 105.0, wgLat - 35.0);

	let radLat = wgLat / 180.0 * M_PI;
	let magic =Math.sin(radLat);
	magic = 1 - ee * magic * magic;

	let sqrtMagic =Math.sqrt(magic);
	dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic *sqrtMagic) * M_PI);
	dLon = (dLon * 180.0) / (a /sqrtMagic *Math.cos(radLat) * M_PI);

    let mgLon = wgLon + dLon;
	let mgLat = wgLat + dLat;
    return [mgLon,mgLat];
}