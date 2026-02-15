/**
 * Smart Image Mapper
 * Maps keywords in headlines to relevant Unsplash images.
 */

const IMAGE_BANK: Record<string, string[]> = {
    // Tech & AI
    'ai': ['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80'],
    'crypto': ['https://images.unsplash.com/photo-1518546305927-5a440bb11fb3?w=600&q=80', 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&q=80'],
    'bitcoin': ['https://images.unsplash.com/photo-1518546305927-5a440bb11fb3?w=600&q=80'],
    'robot': ['https://images.unsplash.com/photo-1535378437323-95288ac9dd5c?w=600&q=80', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80'],
    'hack': ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80'],
    'data': ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
    'tech': ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'],
    'app': ['https://images.unsplash.com/photo-1551650975-87bd1c836fa5?w=600&q=80'],

    // Politics & Society
    'parliament': ['https://images.unsplash.com/photo-1541872703-74c5963631df?w=600&q=80'],
    'government': ['https://images.unsplash.com/photo-1523293836273-db4b155505c2?w=600&q=80'],
    'vote': ['https://images.unsplash.com/photo-1540910419868-4749453c5e85?w=600&q=80'],
    'law': ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80'],
    'police': ['https://images.unsplash.com/photo-1453873419266-ec6519286356?w=600&q=80'],
    'protest': ['https://images.unsplash.com/photo-1604017369348-18eaf396f63f?w=600&q=80'],
    'crisis': ['https://images.unsplash.com/photo-1542601906990-24ccd08d7455?w=600&q=80'],

    // Science & Nature
    'space': ['https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'],
    'climate': ['https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80'],
    'earth': ['https://images.unsplash.com/photo-1614730341194-75c6074065d6?w=600&q=80'],
    'mars': ['https://images.unsplash.com/photo-1614728853913-1e32005e307a?w=600&q=80'],
    'study': ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80'],
    'virus': ['https://images.unsplash.com/photo-1584036561566-b937500eb070?w=600&q=80'],
    'health': ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80'],

    // Finance & Business
    'market': ['https://images.unsplash.com/photo-1611974765270-ca1258634369?w=600&q=80'],
    'stocks': ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80'],
    'money': ['https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&q=80'],
    'bank': ['https://images.unsplash.com/photo-1501167786225-b3b8aedbdb0c?w=600&q=80'],
    'ceo': ['https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80'],

    // Abstract / Weird
    'toaster': ['https://images.unsplash.com/photo-1585671966141-866763403ebf?w=600&q=80'],
    'fridge': ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80'],
    'appliance': ['https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=600&q=80'],
    'fail': ['https://images.unsplash.com/photo-1515548325946-836e594df568?w=600&q=80'],
    'oops': ['https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&q=80'],
};

const DEFAULTS: Record<string, string[]> = {
    politics: ['https://images.unsplash.com/photo-1529101091760-6149390ea079?w=600&q=80', 'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=600&q=80'],
    science: ['https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80'],
    tech: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'],
    entertainment: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=600&q=80'],
    sports: ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80']
};

export const getSmartImage = (headline: string, category: string): string => {
    const text = headline.toLowerCase();

    // Check for keywords
    for (const [key, urls] of Object.entries(IMAGE_BANK)) {
        if (text.includes(key)) {
            return urls[Math.floor(Math.random() * urls.length)];
        }
    }

    // Fallback to random default for category
    const categoryDefaults = DEFAULTS[category.toLowerCase()] || DEFAULTS.tech;
    return categoryDefaults[Math.floor(Math.random() * categoryDefaults.length)];
};
