function saveScore(key, value) {
  localStorage.setItem('lf_' + key, value);
}
function getScore(key) {
  var v = localStorage.getItem('lf_' + key);
  return v ? parseFloat(v) : null;
}

var BENCHMARK = {
  reaction:   { pro: 225, avg: 350 },
  aim:        { pro: 92,  avg: 65  },
  apm:        { pro: 350, avg: 150 },
  peripheral: { pro: 165, avg: 151 }
};

function calcDimScore(value, pro, avg, lowerIsBetter) {
  if (lowerIsBetter) {
    if (value <= pro) return 100;
    if (value >= avg) return 0;
    return Math.round((avg - value) / (avg - pro) * 100);
  } else {
    if (value >= pro) return 100;
    if (value <= avg) return 0;
    return Math.round((value - avg) / (pro - avg) * 100);
  }
}

function calcOverall(scores) {
  var total = 0, count = 0;
  for (var k in scores) {
    if (scores[k] !== null) { total += scores[k]; count++; }
  }
  if (count === 0) return 0;
  return Math.round(total / count);
}

function getRating(overall) {
  if (overall >= 85) return { level: '职业候选', desc: '接近职业青训门槛，值得认真考虑' };
  if (overall >= 70) return { level: '准职业',   desc: '有天赋基础，需要系统训练' };
  if (overall >= 50) return { level: '进阶玩家', desc: '高于平均，但离职业有明确差距' };
  if (overall >= 30) return { level: '普通水平', desc: '大部分玩家的区间，多练能进步' };
  return { level: '休闲水平', desc: '可能受设备或状态影响，休息后再试' };
}
