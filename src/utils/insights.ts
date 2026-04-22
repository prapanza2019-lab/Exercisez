import { DailyGoals, DailyTotals } from '../types';

export function generateInsights(totals: DailyTotals, goals: DailyGoals): string[] {
  const insights: string[] = [];
  
  if (totals.caloriesConsumed === 0) {
    insights.push("เริ่มต้นบันทึกอาหารเพื่อดูผลประเมินรายวันของคุณ");
    return insights;
  }

  // Calories
  const netDiff = totals.netCalories - goals.calories;
  if (netDiff > 200) {
    insights.push(`แคลอรีเกินเป้าหมายไป ${netDiff} kcal แนะนำให้ลดคาร์บหรือเพิ่มการออกกำลังกาย`);
  } else if (netDiff < -200) {
    insights.push(`แคลอรียังขาดอยู่ ${Math.abs(netDiff)} kcal ทานเพิ่มอีกนิดเพื่อให้พลังงานเพียงพอ`);
  } else {
    insights.push("เยี่ยมมาก! คุณทานแคลอรีได้ตามเป้าหมายอย่างพอดี");
  }

  // Protein
  if (totals.protein_g < goals.protein_g * 0.8) {
    insights.push(`โปรตีนยังขาดอีก ${Math.round(goals.protein_g - totals.protein_g)}g ลองเพิ่มเนื้อสัตว์ ไข่ หรือเวย์โปรตีน`);
  } else if (totals.protein_g > goals.protein_g * 1.2) {
    insights.push("คุณได้รับโปรตีนสูงมากในวันนี้ เหมาะมากถ้ามีการฝึกกล้ามเนื้อ");
  }
  
  // Balance
  const carbRatio = (totals.carbs_g * 4) / (totals.caloriesConsumed || 1);
  if (carbRatio > 0.55) {
    insights.push("สัดส่วนคาร์โบไฮเดรตค่อนข้างสูง ลองบาลานซ์ด้วยผักใบเขียวและโปรตีน");
  }

  if (insights.length < 2) {
    insights.push("สัดส่วนสารอาหารวันนี้บาลานซ์ได้ดีมาก ทำต่อไป!");
  }

  return insights;
}
