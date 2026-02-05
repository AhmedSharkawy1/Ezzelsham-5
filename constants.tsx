
import { MenuSection } from './types';

// Exporting additions constants first so they can be used in MENU_DATA
export const PIZZA_FATAYER_ADDITIONS = {
  id: 'additions-pizza',
  title: 'إضافات البيتزا',
  emoji: '🍕',
  image: 'https://8upload.com/image/d9d3414a04c36730/471562158_1313078253444825_1855177796693410775_n.jpg',
  items: [
    { name: 'إضافة زيتون', prices: ['10'] },
    { name: 'إضافة حشو أطراف', prices: ['20'] },
    { name: 'إضافة جبنة', prices: ['15'] },
    { name: 'إضافة مشروم', prices: ['15'] },
    { name: 'إضافة صوص رانش', prices: ['15'] },
  ]
};

export const CREPE_ADDITIONS = {
  id: 'additions-crepe',
  title: 'إضافات الكريب والسندوتشات',
  emoji: '✨',
  image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=60&w=800',
  items: [
    { name: 'سيخ كفتة', prices: ['35'] },
    { name: 'سيخ شيش', prices: ['35'] },
    { name: 'قطعة برجر', prices: ['30'] },
    { name: 'قطعة بانية', prices: ['15'] },
    { name: 'قطعة زنجر', prices: ['30'] },
    { name: 'شاورما', prices: ['30'] },
    { name: 'فاهيتا', prices: ['25'] },
    { name: 'جبنة', prices: ['15'] },
    { name: 'بطاطس', prices: ['10'] },
    { name: 'خضار', prices: ['10'] },
  ]
};

export const MENU_DATA: MenuSection[] = [
  // 1. Pizza Section
  {
    id: 'pizza',
    title: 'قسم البيتزا',
    emoji: '🍕',
    image: 'https://8upload.com/image/4ebdc316d0203a79/WhatsApp_Image_2026-01-23_at_3.17.51_PM.jpeg',
    subtitles: ['صغير', 'وسط', 'كبير'],
    items: [
      { name: 'بيتزا عز الشام محشية الأطراف', description: 'صوص + موزاريلا + شاورما + فراخ + هوت دوج', prices: ['120', '145', '165'], isPopular: true },
      { name: 'بيتزا الفصول الأربعة', description: 'صوص + موزاريلا + مشروم + فلفل + زيتون', prices: ['90', '110', '135'] },
      { name: 'بيتزا مارجريتا', description: 'صوص + موزاريلا', prices: ['90', '110', '135'] },
      { name: 'بيتزا مشروم', description: 'صوص + موزاريلا + مشروم', prices: ['90', '115', '135'] },
      { name: 'بيتزا سلامي حلواني', description: 'صوص + موزاريلا + سلامي حلواني', prices: ['100', '125', '140'] },
      { name: 'بيتزا هوت دوج', description: 'صوص + موزاريلا + هوت دوج + فلفل + زيتون', prices: ['100', '120', '145'] },
      { name: 'بيتزا سجق فراخ', description: 'صوص + موزاريلا + سجق فراخ + فلفل', prices: ['95', '115', '140'] },
      { name: 'بيتزا ميكس أجبان', description: 'جبنة كيرى + جبنة حلوم + موزاريلا + شيدر', prices: ['110', '130', '145'] },
      { name: 'بيتزا الفراخ', description: 'صوص + موزاريلا + مشروم + فراخ + فلفل', prices: ['110', '135', '155'] },
      { name: 'بيتزا سوبريم', description: 'صوص + موزاريلا + سلامي + هوت دوج', prices: ['110', '135', '155'] },
      { name: 'بيتزا ميكس لحوم', description: 'سلامي حلواني + لحم مفروم + صوص + موزاريلا + هوت دوج', prices: ['110', '135', '155'], isPopular: true },
      { name: 'بيتزا شاورما', description: 'صوص + موزاريلا + شاورما فراخ + خضار', prices: ['110', '135', '155'] },
      { name: 'بيتزا لحم مفروم', description: 'صوص + موزاريلا + لحم مفروم + خضار', prices: ['110', '135', '155'] },
      { name: 'بيتزا كرسبي', description: 'صوص + موزاريلا + كرسبي + خضار', prices: ['110', '135', '155'] },
      { name: 'بيتزا تشيكن رانش', description: 'صوص + صوص رانش + موزاريلا + مشروم + فراخ + فلفل', prices: ['130', '145', '165'] },
      { name: 'بيتزا نصين', description: 'اختيار نوعين بيتزا في نفس الحجم', prices: ['-', '135', '155'] },
    ]
  },
  // 2. Pizza Additions (Visual Section)
  {
    id: 'pizza-additions-section',
    title: 'إضافات البيتزا',
    emoji: '🧀',
    image: PIZZA_FATAYER_ADDITIONS.image,
    items: PIZZA_FATAYER_ADDITIONS.items
  },
  // 3. Shawarma Section
  {
    id: 'shawarma',
    title: 'قسم الشاورما',
    emoji: '🥙',
    image: 'https://8upload.com/image/e84ae3a5d4a69f23/WhatsApp_Image_2026-01-27_at_12.49.18_AM.jpeg',
    items: [
      { name: 'شاورما إكسترا', description: 'إضافة موزاريلا + مشروم', prices: ['100'] },
      { name: 'شاورما كبير', prices: ['85'] },
      { name: 'شاورما صغير', prices: ['75'] },
      { name: 'وجبة شاورما عز الشام العائلي', description: '36 قطعة + تومية + مخلل + بطاطس', prices: ['500'], isPopular: true },
      { name: 'وجبة شاورما عربي', description: 'سندوتش مقطع + تومية + مخلل + بطاطس', prices: ['95'] },
      { name: 'وجبة شاورما عربي دبل', description: '2 سندوتش مقطع + تومية + بطاطس + مخلل', prices: ['185'] },
      { name: 'وجبة ربع كيلو شاورما', description: 'تومية + بطاطس + مخلل + عيش', prices: ['140'] },
      { name: 'فتة شاورما', description: 'تومية + مخلل + أرز + عيش محمص', prices: ['110'] },
      { name: '1 كيلو شاورما', description: 'تومية + بطاطس + مخلل + عيش', prices: ['500'] },
      { name: '½ كيلو شاورما', description: 'تومية + بطاطس + مخلل + عيش', prices: ['250'] },
      { name: 'وجبة شاورما عربي ميني', description: '3 كايزر + تومية + بطاطس + مخلل', prices: ['100'] },
      { name: 'فطيرة عز الشام', description: 'بطاطس + كاتشب', prices: ['130'] },
    ]
  },
  // 4. Crepe Section
  {
    id: 'crepe-savory',
    title: 'قسم الكريب',
    emoji: '🌯',
    image: 'https://8upload.com/image/c5d2123cdfc6b19b/WhatsApp_Image_2026-01-23_at_4.52.49_PM.jpeg',
    items: [
      { name: 'كريب بانية', prices: ['60'], description: 'قطع بانية مقلية + صوص كوكتيل + صوص شيدر + خضار + زيتون + موزاريلا' },
      { name: 'كريب كفتة لحم', prices: ['75'], description: 'كفتة لحم + خضار + صوص كوكتيل + صوص شيدر' },
      { name: 'كريب شاورما', prices: ['90'], description: 'شاورما فراخ + موزاريلا + كريب فاهيتا', isPopular: true },
      { name: 'كريب فاهيتا', prices: ['80'], description: 'قطع دجاج مشوي مع الخضار + صوص صويا + صوص شيدر + صوص كوكتيل + زيتون + موزاريلا' },
      { name: 'كريب مكسيكي', prices: ['80'], description: 'قطع دجاج مشوي مع الخضار + صوص كوكتيل + صوص شيدر + زيتون + موزاريلا', isSpicy: true },
      { name: 'كريب زنجر', prices: ['85'], description: 'قطع دجاج مقلية + صوص شيدر + خضار + زيتون + موزاريلا + شرائح الهاليبينو الحارة', isSpicy: true },
      { name: 'كريب دجاج بالكارى', prices: ['80'], description: 'قطع دجاج مقلية متبلة بالكاري مع الخضار + صوص شيدر + زيتون + موزاريلا' },
      { name: 'كريب كرسبي', prices: ['85'], description: 'قطع دجاج مقلية + صوص شيدر + صوص كوكتيل + خضار + زيتون + موزاريلا' },
      { name: 'كريب شيش طاووق', prices: ['85'], description: 'قطع دجاج مشوية مع الخضار + صوص كاجو + صوص شيدر + زيتون + موزاريلا' },
      { name: 'كريب برجر لحم', prices: ['75'], description: 'قطع برجر لحم مشوية + صوص شيدر + موزاريلا' },
      { name: 'كريب برجر فراخ', prices: ['75'], description: 'قطع برجر فراخ مشوية + صوص شيدر + صوص كوكتيل + موزاريلا' },
      { name: 'كريب ميكس فراخ', prices: ['100'], description: 'برجر فراخ + شاورما + قطع كريسبي + صوص كاجو + صوص كوكتيل + زيتون + صوص شيدر + موزاريلا', isPopular: true },
      { name: 'كريب ميكس لحوم', prices: ['95'], description: 'برجر + هوت دوج + كفتة + خضار + صوص شيدر + موزاريلا' },
      { name: 'كريب سوبريم', prices: ['95'], description: 'رول دجاج محشي ومقلية + صوص شيدر + خضار + زيتون + موزاريلا' },
      { name: 'كريب كرانشي', prices: ['100'], description: 'قطع كريسبي + شرائح سموك تركى مدخن + صوص رانش + صوص شيدر + صوص كوكتيل + خضار + زيتون + ميكس جبن' },
      { name: 'كريب فرانشيسكو', prices: ['100'], description: 'قطع دجاج مشوية مع الخضار + شرائح سموك تركى مدخن + صوص كاجو + صوص شيدر + زيتون + ميكس جبن + مشروم' },
      { name: 'كريب بطاطس', prices: ['45'], description: 'بطاطس مع الخضار + موزاريلا + كاتشب' },
      { name: 'كريب ميكس أجبان', prices: ['70'], description: 'رومى + موزاريلا + بريزيدون + صوصات', isPopular: true },
    ]
  },
  // 5. Meals Section
  {
    id: 'meals',
    title: 'قسم الوجبات',
    emoji: '🍽️',
    image: 'https://8upload.com/image/360d3d5aca564871/543432429_1300645618520964_8531491904870347037_n.jpg',
    items: [
      { name: 'وجبة برجر لحم', description: '2 قطعة كايزر + تومية + مخلل + بطاطس', prices: ['110'] },
      { name: 'وجبة برجر فراخ', description: '2 قطعة كايزر + تومية + مخلل + بطاطس', prices: ['110'] },
      { name: 'وجبة كرسبي', description: '4 قطع كرسبي + تومية + بطاطس + مخلل + عيش', prices: ['130'] },
      { name: 'وجبة زنجر', description: '4 قطع زنجر + سبايسي + تومية + صوص شيدر + مخلل + عيش', prices: ['135'], isSpicy: true },
      { name: 'وجبة شيش مشوي', description: '2 سيخ شيش + تومية + بطاطس + مخلل + عيش', prices: ['135'] },
      { name: 'وجبة ربع كفتة', description: '2 سيخ كفتة + حمص + أرز + مخلل + عيش', prices: ['120'] },
      { name: 'وجبة كرسبي عائلي', description: '12 قطعة كرسبي + حمص + أرز + مخلل + عيش', prices: ['450'] },
      { name: 'وجبة ميكس وراك', description: 'ورك + سيخ كفتة + سيخ شيش + حمص + أرز + سلطة + مخلل + عيش', prices: ['170'] },
      { name: 'وجبة ميكس صدور', description: 'صدر + سيخ كفتة + سيخ شيش + حمص + أرز + سلطة + مخلل + عيش', prices: ['180'] },
      { name: 'وجبة فحم عائلي', description: ' ½ فرخة + ¼ كفتة + ربع شيش + حمص + تومية + أرز + سلطة + مخلل + عيش', prices: ['325'] },
      { name: 'وجبة جامبو', description: '½ فرخة فحم + سيخ كفتة + سيخ شيش + حمص + تومية + أرز + سلطة + مخلل + عيش', prices: ['265'] },
      { name: 'وجبة حواوشي', description: '2 رغيف حواوشي + حمص + مخلل + بطاطس', prices: ['90'] },
      { name: 'وجبة مشكل', description: '2 قطعة كرسبي + سيخ كفتة + سيخ شيش', prices: ['155'] },
      { name: 'وجبة الروقان', description: 'سيخ كفتة + سيخ شيش + تومية + أرز + بطاطس + سلطة + مخلل + عيش', prices: ['125'] },
    ]
  },
  // 6. Western Sandwiches Section
  {
    id: 'western-sandwiches',
    title: 'السندوتشات الغربي',
    description: 'مع كل 3 سندوتشات طبق توميه ومخلل مجاني',
    emoji: '🍔',
    image: 'https://8upload.com/image/f786f814aec16265/486214949_1165330205385840_3724076579101762391_n.jpg',
    items: [
      { name: 'شيش طاووق', prices: ['70'] },
      { name: 'برجر لحمه', prices: ['60'] },
      { name: 'كفته لحمه', prices: ['55'] },
      { name: 'كرسبى', prices: ['70'] },
      { name: 'زنجر', prices: ['70'], isSpicy: true },
      { name: 'برجر دجاج', prices: ['55'] },
      { name: 'فاهيتا دجاج', prices: ['55'] },
      { name: 'مكسيكى', prices: ['55'], isSpicy: true },
    ]
  },
  // 7. Oriental Sandwiches Section
  {
    id: 'oriental-sandwiches',
    title: 'السندوتشات الشرقي',
    description: 'مع كل 3 سندوتشات طبق توميه ومخلل مجاني',
    emoji: '🥪',
    image: 'https://8upload.com/image/e3965990a412e312/WhatsApp_Image_2026-01-23_at_3.17.53_PM__2_.jpeg',
    items: [
      { name: 'بطاطس', prices: ['25'] },
      { name: 'بطاطس موتزاريلا', prices: ['35'] },
      { name: 'بطاطس شيدر', prices: ['35'] },
      { name: 'بيض مقلى مع بطاطس', prices: ['32'] },
      { name: 'بانية مع بطاطس', prices: ['35'] },
      { name: 'ميكس أجبان', prices: ['35'] },
      { name: 'أى إضافة أجبان', prices: ['15'] },
    ]
  },
  // 8. Fatteh Section
  {
    id: 'fatteh',
    title: 'قسم الفتة',
    emoji: 'Rice',
    image: 'https://8upload.com/image/027a04e28a02abb4/623362254_1421949759723882_2483173125438517792_n.jpg',
    items: [
      { name: 'فتة شاورما', description: 'تومية + مخلل + أرز + عيش محمص', prices: ['110'], isPopular: true },
      { name: 'فتة كرسبي', description: 'تومية + مخلل + أرز + عيش محمص', prices: ['130'] },
      { name: 'فتة زنجر', description: 'تومية + مخلل + موزاريلا + أرز + عيش محمص', prices: ['130'] },
      { name: 'فتة شيش', description: 'تومية + مخلل + موزاريلا + أرز + عيش محمص', prices: ['130'] },
      { name: 'فتة فاهيتا', description: 'تومية + مخلل + موزاريلا + أرز + عيش محمص', prices: ['125'] },
    ]
  },
  // 9. Grills Section
  {
    id: 'grills',
    title: 'قسم المشاوي',
    emoji: '🔥',
    image: 'https://8upload.com/image/9860c9169b2874bd/518373252_1260578012527725_3523041179824902478_n.jpg',
    items: [
      { name: '1 كيلو كفتة', description: 'حمص + أرز + مخلل + عيش', prices: ['450'] },
      { name: '½ كيلو كفتة', description: 'حمص + أرز + مخلل + عيش', prices: ['225'] },
      { name: '1 كيلو شيش', description: 'تومية + بطاطس + أرز + مخلل + عيش', prices: ['450'] },
      { name: '½ كيلو شيش', description: 'تومية + بطاطس + أرز + مخلل + عيش', prices: ['225'] },
      { name: 'فرخة شواية', description: 'تومية + بطاطس + أرز + مخلل + عيش', prices: ['185', '340'], labels: ['نصف', 'كاملة'] },
      { name: 'فرخة على الفحم', description: 'تومية + بطاطس + أرز + مخلل + عيش', prices: ['160', '320'], labels: ['نصف', 'كاملة'], isPopular: true },
      { name: 'فرخة شيش على الفحم', description: 'تومية + بطاطس + أرز + مخلل + عيش', prices: ['155', '350'], labels: ['نصف', 'كاملة'] },
      { name: 'عرض سارى', description: 'فرخة على الفحم + ½ كفتة + تومية + بطاطس + أرز + مخلل + عيش', prices: ['450'], isPopular: true },
    ]
  },
  // 10. Broasted Section
  {
    id: 'broasted',
    title: 'قسم البروست',
    emoji: '🍗',
    image: 'https://8upload.com/image/1a3148f521b706d3/484917012_1160961995822661_6816945446321493612_n.jpg',
    items: [
      { name: 'فرخة بروست 8 قطع', description: 'كايزر + تومية + بطاطس + كول سلو + تومية حار + كاتشب', prices: ['350'] },
      { name: 'نصف فرخة بروست 4 قطع', description: 'كايزر + تومية + بطاطس + كول سلو + تومية حار + كاتشب', prices: ['180'] },
    ]
  },
  // 11. Appetizers Section
  {
    id: 'appetizers',
    title: 'قسم المقبلات',
    emoji: '🥗',
    image: 'https://8upload.com/image/3399899fdca73e8f/470205084_1303778584374792_7621280743156804382_n.jpg',
    items: [
      { name: 'طبق تومية صغير', prices: ['15'] },
      { name: 'طبق تومية كبير', prices: ['20'] },
      { name: 'طبق تومية صغير + عيش محمص', prices: ['20'] },
      { name: 'طبق تومية كبير + عيش محمص', prices: ['25'] },
      { name: 'طبق بطاطس صغير', prices: ['15'] },
      { name: 'طبق بطاطس كبير', prices: ['20'] },
      { name: 'طبق مخلل صغير', prices: ['15'] },
      { name: 'طبق مخلل كبير', prices: ['20'] },
      { name: 'طبق كلوسلو صغير', prices: ['15'] },
      { name: 'طبق كلوسلو كبير', prices: ['20'] },
      { name: 'طبق حمص صغير', prices: ['20'] },
      { name: 'طبق حمص كبير', prices: ['25'] },
      { name: 'طبق أرز صغير', prices: ['20'] },
      { name: 'طبق أرز كبير', prices: ['25'] },
      { name: 'ظرف كاتشب', prices: ['1'] },
      { name: 'لقمة صاج', prices: ['3'] },
      { name: 'كيس عيش شامى', prices: ['15'] },
    ]
  },
  // 12. Additions Section
  {
    id: 'additions',
    title: 'قسم الإضافات',
    emoji: '✨',
    image: 'https://8upload.com/image/b9a31294829c5513/WhatsApp_Image_2026-01-23_at_3.17.53_PM.jpeg',
    items: CREPE_ADDITIONS.items
  },
  // 13. Sauces Section
  {
    id: 'sauces',
    title: 'قسم الصوصات',
    emoji: '🧂',
    image: 'https://8upload.com/image/14ccdcd79af11085/WhatsApp_Image_2026-01-23_at_3.17.53_PM__4_.jpeg',
    items: [
      { name: 'صوص شيدر', prices: ['15'] },
      { name: 'صوص رانش', prices: ['15'] },
      { name: 'صوص كوكتيل', prices: ['15'] },
      { name: 'صوص باربيكيو', prices: ['15'] },
      { name: 'صوص كاجو', prices: ['20'] },
    ]
  }
];
