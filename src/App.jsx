import React, { useState, useReducer, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Search, Plus, Star, Clock, Flame, BookOpen, Calendar, ShoppingCart, FolderOpen,
  Settings, Home, ChevronRight, Trash2, Edit3, Copy, Share2, Printer, X, Check,
  Heart, ChevronDown, Filter, LayoutGrid, List, Sun, Moon, UtensilsCrossed
} from 'lucide-react';

// ============ SAMPLE DATA ============
const SAMPLE_RECIPES = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with eggs, pecorino, guanciale, and black pepper.',
    category: 'Dinner',
    cuisine: 'Italian',
    difficulty: 'Medium',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    calories: 520,
    ingredients: ['400g spaghetti', '200g guanciale', '4 egg yolks + 2 whole eggs', '100g Pecorino Romano', 'Black pepper', 'Salt'],
    steps: ['Bring large pot of salted water to boil. Cook spaghetti until al dente.', 'Cut guanciale into strips. Fry in pan until crispy.', 'Whisk eggs with grated pecorino and pepper.', 'Reserve 1 cup pasta water. Drain pasta, add to guanciale pan off heat.', 'Add egg mixture, toss quickly. Add pasta water if needed. Serve immediately.'],
    stepTimes: [0, 0, 0, 0, 0],
    tags: ['pasta', 'quick', 'comfort food'],
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    rating: 4.5,
    notes: '',
    is_favorite: true,
    date_created: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy tomato-based curry with tender spiced chicken.',
    category: 'Dinner',
    cuisine: 'Indian',
    difficulty: 'Medium',
    prepTime: 30,
    cookTime: 35,
    servings: 6,
    calories: 380,
    ingredients: ['1.5 kg chicken breast', '200ml yogurt', '2 tbsp tikka paste', '400g canned tomatoes', '100ml cream', 'Onion, garlic, ginger', 'Garam masala', 'Cilantro'],
    steps: ['Marinate chicken in yogurt and tikka paste for 1 hour.', 'Grill or broil chicken until charred. Set aside.', 'Sauté onion, garlic, ginger. Add tomatoes and spices.', 'Simmer 15 min, blend until smooth. Add cream and chicken.', 'Garnish with cilantro. Serve with rice or naan.'],
    stepTimes: [0, 10, 5, 15, 0],
    tags: ['curry', 'indian', 'dairy'],
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    rating: 5,
    notes: '',
    is_favorite: true,
    date_created: '2024-02-01T10:00:00Z',
  },
  {
    id: '3',
    title: 'Avocado Toast with Poached Eggs',
    description: 'Creamy avocado on sourdough with perfectly poached eggs.',
    category: 'Breakfast',
    cuisine: 'American',
    difficulty: 'Easy',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    calories: 320,
    ingredients: ['2 slices sourdough', '1 ripe avocado', '2 eggs', 'Lemon juice', 'Salt, pepper', 'Red pepper flakes', 'Microgreens'],
    steps: ['Toast bread until golden.', 'Mash avocado with lemon, salt, pepper.', 'Poach eggs in simmering water 3–4 min.', 'Spread avocado on toast. Top with eggs, flakes, greens.'],
    stepTimes: [3, 0, 4, 0],
    tags: ['breakfast', 'vegetarian', 'quick'],
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800',
    rating: 4.5,
    notes: '',
    is_favorite: false,
    date_created: '2024-02-10T10:00:00Z',
  },
  {
    id: '4',
    title: 'Beef Tacos with Fresh Salsa',
    description: 'Seasoned ground beef in soft tortillas with homemade salsa.',
    category: 'Dinner',
    cuisine: 'Mexican',
    difficulty: 'Easy',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    calories: 450,
    ingredients: ['500g ground beef', 'Taco seasoning', '8 soft tortillas', 'Tomatoes', 'Onion', 'Cilantro', 'Lime', 'Lettuce', 'Sour cream', 'Cheese'],
    steps: ['Brown beef, add taco seasoning and water. Simmer.', 'Dice tomatoes, onion, cilantro. Mix with lime for salsa.', 'Warm tortillas. Fill with beef, salsa, lettuce, cream, cheese.'],
    stepTimes: [10, 0, 0],
    tags: ['mexican', 'quick', 'family'],
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
    rating: 4,
    notes: '',
    is_favorite: false,
    date_created: '2024-01-20T10:00:00Z',
  },
  {
    id: '5',
    title: 'Hummus with Tahini',
    description: 'Silky smooth chickpea dip with tahini and lemon.',
    category: 'Snack',
    cuisine: 'Middle Eastern',
    difficulty: 'Easy',
    prepTime: 10,
    cookTime: 0,
    servings: 6,
    calories: 180,
    ingredients: ['2 cans chickpeas', '1/4 cup tahini', '3 tbsp olive oil', '2 cloves garlic', '2 lemons', 'Cumin', 'Paprika', 'Parsley'],
    steps: ['Drain chickpeas, reserve liquid.', 'Blend chickpeas, tahini, oil, garlic, lemon juice until smooth.', 'Add reserved liquid to reach desired consistency.', 'Serve with paprika, olive oil, parsley.'],
    stepTimes: [0, 0, 0, 0],
    tags: ['vegan', 'gluten-free', 'dip'],
    imageUrl: 'https://images.unsplash.com/photo-1633965187383-7b2d6a1c2c3d?w=800',
    rating: 5,
    notes: '',
    is_favorite: true,
    date_created: '2024-02-05T10:00:00Z',
  },
  {
    id: '6',
    title: 'Thai Green Curry',
    description: 'Aromatic green curry with vegetables and jasmine rice.',
    category: 'Dinner',
    cuisine: 'Thai',
    difficulty: 'Medium',
    prepTime: 25,
    cookTime: 20,
    servings: 4,
    calories: 420,
    ingredients: ['Green curry paste', '400ml coconut milk', 'Chicken or tofu', 'Bamboo shoots', 'Thai basil', 'Fish sauce', 'Palm sugar', 'Jasmine rice'],
    steps: ['Fry 2 tbsp curry paste in wok until fragrant.', 'Add coconut milk, bring to simmer.', 'Add protein, bamboo shoots. Cook 10 min.', 'Season with fish sauce, sugar. Add basil. Serve with rice.'],
    stepTimes: [2, 2, 10, 0],
    tags: ['thai', 'curry', 'dairy-free'],
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
    rating: 4.5,
    notes: '',
    is_favorite: false,
    date_created: '2024-01-25T10:00:00Z',
  },
  {
    id: '7',
    title: 'Chocolate Lava Cakes',
    description: 'Warm chocolate cakes with molten centers.',
    category: 'Dessert',
    cuisine: 'French',
    difficulty: 'Medium',
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    calories: 480,
    ingredients: ['200g dark chocolate', '100g butter', '3 eggs', '50g sugar', '30g flour', 'Pinch salt', 'Butter and cocoa for ramekins'],
    steps: ['Melt chocolate and butter. Cool slightly.', 'Whisk eggs and sugar. Fold in chocolate, then flour.', 'Butter ramekins, dust with cocoa. Fill 3/4.', 'Bake 220°C 10–12 min. Rest 1 min, invert.'],
    stepTimes: [5, 2, 0, 12],
    tags: ['dessert', 'chocolate', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
    rating: 5,
    notes: '',
    is_favorite: true,
    date_created: '2024-02-12T10:00:00Z',
  },
  {
    id: '8',
    title: 'Greek Salad',
    description: 'Fresh cucumbers, tomatoes, feta, olives, and oregano.',
    category: 'Lunch',
    cuisine: 'Greek',
    difficulty: 'Easy',
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    calories: 220,
    ingredients: ['Cucumbers', 'Tomatoes', 'Red onion', 'Kalamata olives', '200g feta', 'Oregano', 'Olive oil', 'Lemon', 'Salt'],
    steps: ['Chop cucumbers, tomatoes, onion. Add olives.', 'Cube feta, add to bowl.', 'Dress with oil, lemon, oregano, salt. Toss gently.'],
    stepTimes: [5, 0, 0],
    tags: ['vegetarian', 'gluten-free', 'salad'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
    rating: 4,
    notes: '',
    is_favorite: false,
    date_created: '2024-01-18T10:00:00Z',
  },
  {
    id: '9',
    title: 'Japanese Miso Soup',
    description: 'Traditional dashi-based soup with tofu and seaweed.',
    category: 'Lunch',
    cuisine: 'Japanese',
    difficulty: 'Easy',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    calories: 80,
    ingredients: ['Dashi stock', '3 tbsp miso paste', 'Silken tofu', 'Wakame seaweed', 'Green onions', 'Optional: mushrooms'],
    steps: ['Bring dashi to gentle simmer.', 'Soak wakame in water 5 min. Cube tofu.', 'Dissolve miso in ladle of broth. Add to pot.', 'Add tofu, wakame. Serve with green onions.'],
    stepTimes: [5, 0, 2, 0],
    tags: ['japanese', 'vegan option', 'soup'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    rating: 4.5,
    notes: '',
    is_favorite: false,
    date_created: '2024-02-08T10:00:00Z',
  },
  {
    id: '10',
    title: 'Pancakes with Maple Syrup',
    description: 'Fluffy buttermilk pancakes, perfect for weekend brunch.',
    category: 'Breakfast',
    cuisine: 'American',
    difficulty: 'Easy',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    calories: 350,
    ingredients: ['2 cups flour', '2 tbsp sugar', '2 tsp baking powder', '1.5 cups buttermilk', '2 eggs', '4 tbsp melted butter', 'Maple syrup', 'Berries'],
    steps: ['Mix dry ingredients. Whisk wet in another bowl.', 'Fold wet into dry. Rest 5 min.', 'Cook on griddle until bubbles form. Flip.', 'Serve with butter, syrup, berries.'],
    stepTimes: [3, 5, 5, 0],
    tags: ['breakfast', 'vegetarian', 'brunch'],
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
    rating: 4.5,
    notes: '',
    is_favorite: true,
    date_created: '2024-02-14T10:00:00Z',
  },
  {
    id: '11',
    title: 'Lamb Kofta with Yogurt Sauce',
    description: 'Spiced lamb skewers with cucumber-yogurt dip.',
    category: 'Dinner',
    cuisine: 'Middle Eastern',
    difficulty: 'Medium',
    prepTime: 25,
    cookTime: 15,
    servings: 4,
    calories: 410,
    ingredients: ['500g ground lamb', 'Onion', 'Parsley', 'Cumin', 'Coriander', 'Allspice', 'Greek yogurt', 'Cucumber', 'Mint', 'Lemon'],
    steps: ['Grate onion, squeeze. Mix lamb with herbs and spices.', 'Form into logs on skewers. Chill 15 min.', 'Grill 4–5 min per side.', 'Mix yogurt, cucumber, mint, lemon for sauce. Serve.'],
    stepTimes: [10, 0, 8, 0],
    tags: ['middle eastern', 'grill', 'gluten-free'],
    imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',
    rating: 5,
    notes: '',
    is_favorite: false,
    date_created: '2024-01-22T10:00:00Z',
  },
  {
    id: '12',
    title: 'Caprese Stuffed Chicken',
    description: 'Chicken breast stuffed with mozzarella, tomato, and basil.',
    category: 'Dinner',
    cuisine: 'Italian',
    difficulty: 'Medium',
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    calories: 380,
    ingredients: ['4 chicken breasts', 'Mozzarella', 'Tomatoes', 'Fresh basil', 'Balsamic glaze', 'Olive oil', 'Garlic', 'Italian herbs'],
    steps: ['Butterfly chicken. Season inside.', 'Layer mozzarella, tomato, basil. Fold and secure.', 'Sear in pan, then bake 25 min at 180°C.', 'Drizzle balsamic. Serve with salad.'],
    stepTimes: [10, 2, 25, 0],
    tags: ['italian', 'gluten-free', 'low-carb'],
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800',
    rating: 4.5,
    notes: '',
    is_favorite: true,
    date_created: '2024-02-18T10:00:00Z',
  },
  {
    id: '13',
    title: 'Vegetable Stir-Fry',
    description: 'Quick veggie stir-fry with soy-ginger sauce.',
    category: 'Dinner',
    cuisine: 'Asian',
    difficulty: 'Easy',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    calories: 180,
    ingredients: ['Broccoli', 'Bell peppers', 'Snap peas', 'Carrots', 'Soy sauce', 'Ginger', 'Garlic', 'Sesame oil', 'Rice'],
    steps: ['Cut vegetables uniformly. Mix soy, ginger, garlic, 2 tbsp water.', 'Heat wok, stir-fry veggies in batches. Set aside.', 'Add sauce, return veggies. Toss. Drizzle sesame oil.', 'Serve over rice.'],
    stepTimes: [10, 5, 2, 0],
    tags: ['vegan', 'quick', 'asian'],
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    rating: 4,
    notes: '',
    is_favorite: false,
    date_created: '2024-02-16T10:00:00Z',
  },
  {
    id: '14',
    title: 'Berry Parfait',
    description: 'Layers of yogurt, granola, and fresh berries.',
    category: 'Breakfast',
    cuisine: 'American',
    difficulty: 'Easy',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    calories: 280,
    ingredients: ['Greek yogurt', 'Granola', 'Mixed berries', 'Honey', 'Mint'],
    steps: ['Layer yogurt in glasses.', 'Add granola, then berries. Repeat.', 'Drizzle honey. Garnish with mint.'],
    stepTimes: [0, 0, 0],
    tags: ['breakfast', 'vegetarian', 'quick'],
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    rating: 4,
    notes: '',
    is_favorite: false,
    date_created: '2024-02-20T10:00:00Z',
  },
];

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer', 'Soup', 'Salad'];
const CUISINES = ['Italian', 'Mexican', 'Indian', 'Thai', 'Japanese', 'Greek', 'Middle Eastern', 'American', 'French', 'Asian'];
const DIETARY_TAGS = ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'low-carb'];
const GROCERY_CATEGORIES = ['Produce', 'Dairy', 'Meat', 'Pantry', 'Spices', 'Frozen', 'Bakery', 'Other'];

// ============ UTILITIES ============
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function fuzzyMatch(text, query) {
  if (!query.trim()) return true;
  const t = (text || '').toLowerCase();
  const q = query.toLowerCase().trim();
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) {
    if (t[j] === q[i]) i++;
  }
  return i === q.length;
}

function scaleIngredients(ingredients, fromServings, toServings) {
  if (!fromServings || fromServings === toServings) return ingredients;
  const mult = toServings / fromServings;
  return ingredients.map(ing => {
    const match = ing.match(/^([\d./]+)\s*(.*)$/);
    if (match) {
      const num = eval(match[1].replace(/\s/g, ''));
      const scaled = Math.round(num * mult * 100) / 100;
      return (scaled === Math.floor(scaled) ? scaled : scaled.toFixed(2)) + ' ' + match[2];
    }
    return ing;
  });
}

// ============ REDUCERS ============
function recipeReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [...state, { ...action.payload, id: action.payload.id || generateId(), date_created: new Date().toISOString() }];
    case 'UPDATE':
      return state.map(r => r.id === action.payload.id ? { ...r, ...action.payload } : r);
    case 'DELETE':
      return state.filter(r => r.id !== action.payload);
    case 'TOGGLE_FAVORITE':
      return state.map(r => r.id === action.payload ? { ...r, is_favorite: !r.is_favorite } : r);
    case 'SET_RATING':
      return state.map(r => r.id === action.payload.id ? { ...r, rating: action.payload.rating } : r);
    default:
      return state;
  }
}

function collectionReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [...state, { id: generateId(), name: action.payload.name, recipeIds: [] }];
    case 'UPDATE':
      return state.map(c => c.id === action.payload.id ? { ...c, ...action.payload } : c);
    case 'DELETE':
      return state.filter(c => c.id !== action.payload);
    case 'ADD_RECIPE':
      return state.map(c => c.id === action.payload.collectionId
        ? { ...c, recipeIds: c.recipeIds.includes(action.payload.recipeId) ? c.recipeIds : [...c.recipeIds, action.payload.recipeId] }
        : c);
    case 'REMOVE_RECIPE':
      return state.map(c => c.id === action.payload.collectionId
        ? { ...c, recipeIds: c.recipeIds.filter(id => id !== action.payload.recipeId) }
        : c);
    case 'REORDER':
      const { collectionId, fromIndex, toIndex } = action.payload;
      return state.map(c => {
        if (c.id !== collectionId) return c;
        const arr = [...c.recipeIds];
        const [removed] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, removed);
        return { ...c, recipeIds: arr };
      });
    default:
      return state;
  }
}

// ============ TOAST ============
function ToastSystem({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 no-print" aria-live="polite">
      {toasts.map(t => (
        <div
          key={t.id}
          role="alert"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-up max-w-sm ${
            t.type === 'error' ? 'bg-red-100 text-red-900 dark:bg-red-900/90 dark:text-red-100' :
            t.type === 'info' ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/90 dark:text-blue-100' :
            'bg-sage/20 text-espresso dark:bg-sage/30 dark:text-cream'
          }`}
          style={{ borderLeft: `4px solid ${t.type === 'error' ? '#dc2626' : t.type === 'info' ? '#2563eb' : '#6B8F71'}` }}
        >
          <span className="flex-1">{t.message}</span>
          <button type="button" onClick={() => removeToast(t.id)} className="p-1 rounded hover:opacity-80" aria-label="Dismiss">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ============ SIDEBAR ============
function Sidebar({ currentView, setView, collapsed, setCollapsed, isDark }) {
  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'mealplanner', label: 'Meal Planner', icon: Calendar },
    { id: 'grocery', label: 'Grocery List', icon: ShoppingCart },
    { id: 'collections', label: 'Collections', icon: FolderOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  return (
    <aside
      className={`no-print hidden md:flex flex-col bg-cream dark:bg-espresso border-r border-espresso/10 dark:border-cream/10 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
      style={{ minHeight: '100vh' }}
    >
      <div className="p-4 flex items-center justify-between border-b border-espresso/10 dark:border-cream/10">
        {!collapsed && (
          <span className="font-display font-bold text-lg text-espresso dark:text-cream">RMS</span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-espresso/5 dark:hover:bg-cream/5"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronRight className={`w-5 h-5 text-espresso dark:text-cream transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>
      <nav className="flex-1 p-2" aria-label="Main navigation">
        {nav.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              currentView === id
                ? 'bg-saffron/20 text-saffron dark:bg-saffron/30'
                : 'text-espresso dark:text-cream hover:bg-espresso/5 dark:hover:bg-cream/5'
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

// ============ BOTTOM NAV (MOBILE) ============
function BottomNav({ currentView, setView }) {
  const nav = [
    { id: 'dashboard', icon: Home },
    { id: 'recipes', icon: BookOpen },
    { id: 'mealplanner', icon: Calendar },
    { id: 'grocery', icon: ShoppingCart },
    { id: 'collections', icon: FolderOpen },
    { id: 'settings', icon: Settings },
  ];
  return (
    <nav
      className="md:hidden no-print fixed bottom-0 left-0 right-0 flex justify-around py-2 bg-cream dark:bg-espresso border-t border-espresso/10 dark:border-cream/10 z-50"
      aria-label="Mobile navigation"
    >
      {nav.map(({ id, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => setView(id)}
          className={`p-3 rounded-full ${currentView === id ? 'bg-saffron/20 text-saffron' : 'text-espresso dark:text-cream'}`}
          aria-current={currentView === id ? 'page' : undefined}
        >
          <Icon className="w-6 h-6" />
        </button>
      ))}
    </nav>
  );
}

// ============ RECIPE CARD ============
function RecipeCard({ recipe, onSelect, onEdit, onDuplicate, onDelete, onToggleFavorite, inCollection, onRemoveFromCollection, viewMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isList = viewMode === 'list';
  return (
    <article
      className={`group relative bg-white dark:bg-espresso/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-espresso/5 dark:border-cream/5 ${
        isList ? 'flex gap-4 p-4' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(recipe)}
        className={`block w-full text-left ${isList ? 'flex-1 flex gap-4' : ''}`}
      >
        <div className={`relative ${isList ? 'w-32 h-24 shrink-0 rounded-lg overflow-hidden' : 'aspect-[4/3]'}`}>
          <img
            src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 text-white text-sm">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
            {recipe.rating > 0 && (
              <>
                <Star className="w-4 h-4 fill-current" />
                <span>{recipe.rating}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onToggleFavorite(recipe.id); }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 dark:bg-espresso/90"
            aria-label={recipe.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${recipe.is_favorite ? 'fill-terracotta text-terracotta' : 'text-gray-400'}`} />
          </button>
        </div>
        <div className={`p-4 ${isList ? 'flex-1 min-w-0' : ''}`}>
          <h3 className="font-display font-semibold text-espresso dark:text-cream truncate">{recipe.title}</h3>
          <p className="text-sm text-espresso/70 dark:text-cream/70 mt-1 line-clamp-2">{recipe.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-sage/20 text-sage dark:bg-sage/40">{recipe.category}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-terracotta/20 text-terracotta dark:bg-terracotta/40">{recipe.cuisine}</span>
          </div>
        </div>
      </button>
      <div className={`p-2 ${isList ? 'ml-auto shrink-0' : 'absolute top-2 right-2'}`} ref={ref}>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg hover:bg-espresso/5 dark:hover:bg-cream/5"
          aria-label="Recipe options"
          aria-expanded={menuOpen}
        >
          <ChevronDown className="w-5 h-5 text-espresso dark:text-cream" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-1 py-1 w-48 bg-white dark:bg-espresso rounded-lg shadow-lg border border-espresso/10 dark:border-cream/10 z-10 animate-fade-in">
            <button type="button" onClick={() => { onEdit(recipe); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-espresso/5 dark:hover:bg-cream/5">
              <Edit3 className="w-4 h-4" /> Edit
            </button>
            <button type="button" onClick={() => { onDuplicate(recipe); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-espresso/5 dark:hover:bg-cream/5">
              <Copy className="w-4 h-4" /> Duplicate
            </button>
            {inCollection && onRemoveFromCollection && (
              <button type="button" onClick={() => { onRemoveFromCollection(recipe.id); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-espresso/5 dark:hover:bg-cream/5">
                <X className="w-4 h-4" /> Remove from collection
              </button>
            )}
            <button type="button" onClick={() => { onDelete(recipe.id); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

// ============ RECIPE GRID / LIST ============
function RecipeGrid({ recipes, viewMode, onSelect, onEdit, onDuplicate, onDelete, onToggleFavorite, collectionId, collections, dispatchCollections }) {
  const inCollection = useCallback(
    (recipeId) => collectionId && collections.find(c => c.id === collectionId)?.recipeIds.includes(recipeId),
    [collectionId, collections]
  );
  const removeFromCollection = useCallback(
    (recipeId) => {
      if (collectionId) dispatchCollections({ type: 'REMOVE_RECIPE', payload: { collectionId, recipeId } });
    },
    [collectionId, dispatchCollections]
  );

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <UtensilsCrossed className="w-16 h-16 text-espresso/30 dark:text-cream/30 mb-4" />
        <h3 className="font-display text-xl text-espresso dark:text-cream">No recipes match</h3>
        <p className="text-espresso/70 dark:text-cream/70 mt-2 max-w-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className={viewMode === 'list' ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}>
      {recipes.map(recipe => (
        <div key={recipe.id} className={viewMode === 'list' ? '' : 'relative'}>
          <RecipeCard
            recipe={recipe}
            onSelect={onSelect}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
            viewMode={viewMode}
            inCollection={inCollection(recipe.id)}
            onRemoveFromCollection={collectionId ? removeFromCollection : undefined}
          />
        </div>
      ))}
    </div>
  );
}

// ============ RECIPE FORM (MULTI-STEP MODAL) ============
function RecipeForm({ recipe, onSave, onClose, categories, cuisines }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(recipe ? {
    title: recipe.title,
    description: recipe.description || '',
    category: recipe.category || 'Dinner',
    cuisine: recipe.cuisine || '',
    difficulty: recipe.difficulty || 'Medium',
    prepTime: recipe.prepTime ?? 15,
    cookTime: recipe.cookTime ?? 30,
    servings: recipe.servings ?? 4,
    calories: recipe.calories ?? 0,
    ingredients: recipe.ingredients?.length ? recipe.ingredients : [''],
    steps: recipe.steps?.length ? recipe.steps : [''],
    stepTimes: recipe.stepTimes?.length ? recipe.stepTimes : recipe.steps?.map(() => 0) || [0],
    tags: recipe.tags?.length ? recipe.tags.join(', ') : '',
    imageUrl: recipe.imageUrl || '',
    notes: recipe.notes || '',
    is_favorite: recipe.is_favorite || false,
  } : {
    title: '', description: '', category: 'Dinner', cuisine: '', difficulty: 'Medium',
    prepTime: 15, cookTime: 30, servings: 4, calories: 0,
    ingredients: [''], steps: [''], stepTimes: [0], tags: '', imageUrl: '', notes: '', is_favorite: false,
  });
  const [errors, setErrors] = useState({});

  const update = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const addIngredient = () => setForm(f => ({ ...f, ingredients: [...f.ingredients, ''] }));
  const removeIngredient = (i) => setForm(f => ({ ...f, ingredients: f.ingredients.filter((_, idx) => idx !== i) }));
  const setIngredient = (i, v) => setForm(f => ({ ...f, ingredients: f.ingredients.map((ing, idx) => idx === i ? v : ing) }));
  const addStep = () => setForm(f => ({ ...f, steps: [...f.steps, ''], stepTimes: [...f.stepTimes, 0] }));
  const removeStep = (i) => setForm(f => ({
    ...f,
    steps: f.steps.filter((_, idx) => idx !== i),
    stepTimes: f.stepTimes.filter((_, idx) => idx !== i),
  }));
  const setStepContent = (i, v) => setForm(f => ({ ...f, steps: f.steps.map((s, idx) => idx === i ? v : s) }));
  const setStepTime = (i, v) => setForm(f => ({ ...f, stepTimes: f.stepTimes.map((t, idx) => idx === i ? (parseInt(v, 10) || 0) : t) }));

  const stepsConfig = [
    { title: 'Basics', validate: () => form.title.trim() },
    { title: 'Details', validate: () => true },
    { title: 'Ingredients & Steps', validate: () => form.ingredients.some(i => i.trim()) && form.steps.some(s => s.trim()) },
    { title: 'Extra', validate: () => true },
  ];

  const handleSubmit = () => {
    const err = {};
    if (!form.title.trim()) err.title = 'Title required';
    if (!form.ingredients.some(i => i.trim())) err.ingredients = 'At least one ingredient';
    if (!form.steps.some(s => s.trim())) err.steps = 'At least one step';
    setErrors(err);
    if (Object.keys(err).length) return;
    onSave({
      ...form,
      id: recipe?.id,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      rating: recipe?.rating ?? 0,
      date_created: recipe?.date_created || new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/50 dark:bg-cream/20" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="recipe-form-title">
      <div className="bg-cream dark:bg-espresso rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-espresso/10 dark:border-cream/10">
          <h2 id="recipe-form-title" className="font-display text-xl text-espresso dark:text-cream">{recipe ? 'Edit Recipe' : 'New Recipe'}</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-espresso/5 dark:hover:bg-cream/5" aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex border-b border-espresso/10 dark:border-cream/10">
          {stepsConfig.map((s, i) => (
            <button key={i} type="button" onClick={() => setStep(i)} className={`px-4 py-2 text-sm ${step === i ? 'border-b-2 border-saffron text-saffron' : 'text-espresso/60 dark:text-cream/60'}`}>
              {s.title}
            </button>
          ))}
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Title *</label>
                <input type="text" value={form.title} onChange={e => update('title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" placeholder="Recipe name" />
                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Description</label>
                <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" placeholder="Brief description" />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Image URL</label>
                <input type="url" value={form.imageUrl} onChange={e => update('imageUrl', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" placeholder="https://..." />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Category</label>
                <select value={form.category} onChange={e => update('category', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Cuisine</label>
                <select value={form.cuisine} onChange={e => update('cuisine', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream">
                  <option value="">—</option>
                  {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Difficulty</label>
                <select value={form.difficulty} onChange={e => update('difficulty', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream">
                  {['Easy', 'Medium', 'Hard'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="col-span-2 grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Prep (min)</label>
                  <input type="number" min={0} value={form.prepTime} onChange={e => update('prepTime', parseInt(e.target.value, 10) || 0)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Cook (min)</label>
                  <input type="number" min={0} value={form.cookTime} onChange={e => update('cookTime', parseInt(e.target.value, 10) || 0)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Servings</label>
                  <input type="number" min={1} value={form.servings} onChange={e => update('servings', parseInt(e.target.value, 10) || 1)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Calories</label>
                  <input type="number" min={0} value={form.calories} onChange={e => update('calories', parseInt(e.target.value, 10) || 0)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-espresso dark:text-cream">Ingredients *</label>
                  <button type="button" onClick={addIngredient} className="text-sm text-saffron hover:underline">+ Add</button>
                </div>
                {form.ingredients.map((ing, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={ing} onChange={e => setIngredient(i, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" placeholder="e.g. 200g flour" />
                    <button type="button" onClick={() => removeIngredient(i)} className="p-2 text-red-600" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                {errors.ingredients && <p className="text-red-600 text-sm">{errors.ingredients}</p>}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-espresso dark:text-cream">Steps *</label>
                  <button type="button" onClick={addStep} className="text-sm text-saffron hover:underline">+ Add</button>
                </div>
                {form.steps.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-espresso/60 dark:text-cream/60 w-6">{i + 1}.</span>
                    <input value={s} onChange={e => setStepContent(i, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" placeholder="Step description" />
                    <input type="number" min={0} value={form.stepTimes[i] ?? 0} onChange={e => setStepTime(i, e.target.value)} className="w-16 px-2 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" placeholder="min" title="Step time (min)" />
                    <button type="button" onClick={() => removeStep(i)} className="p-2 text-red-600" aria-label="Remove step"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                {errors.steps && <p className="text-red-600 text-sm">{errors.steps}</p>}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Tags (comma-separated)</label>
                <input type="text" value={form.tags} onChange={e => update('tags', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" placeholder="vegan, quick, gluten-free" />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso dark:text-cream mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => update('notes', e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" placeholder="Personal notes" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_favorite} onChange={e => update('is_favorite', e.target.checked)} className="rounded" />
                <span className="text-espresso dark:text-cream">Favorite</span>
              </label>
            </div>
          )}
        </div>
        <div className="flex justify-between p-4 border-t border-espresso/10 dark:border-cream/10">
          <button type="button" onClick={() => setStep(s => Math.max(0, s - 1))} className="px-4 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 text-espresso dark:text-cream">Back</button>
          {step < 3 ? (
            <button type="button" onClick={() => setStep(s => s + 1)} className="px-4 py-2 rounded-lg bg-saffron text-white">Next</button>
          ) : (
            <button type="button" onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-sage text-white">Save Recipe</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ RECIPE DETAIL (MODAL) ============
function RecipeDetail({ recipe, recipes, onClose, onEdit, onCookingMode, onToggleFavorite, onSetRating, dispatchRecipes, settings, onSelectRelated, onExportJson, onExportMarkdown }) {
  const [servings, setServings] = useState(recipe.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const scaledIngredients = useMemo(
    () => scaleIngredients(recipe.ingredients || [], recipe.servings || 4, servings),
    [recipe.ingredients, recipe.servings, servings]
  );
  const related = useMemo(() => {
    return recipes.filter(r => r.id !== recipe.id && (r.category === recipe.category || r.cuisine === recipe.cuisine)).slice(0, 4);
  }, [recipes, recipe]);

  const toggleIngredient = (i) => setCheckedIngredients(c => ({ ...c, [i]: !c[i] }));
  const handleShare = () => {
    const text = `${recipe.title}\n\n${recipe.description}\n\nIngredients:\n${scaledIngredients.map(i => `• ${i}`).join('\n')}\n\nSteps:\n${(recipe.steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {});
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-espresso/50 dark:bg-cream/20" onClick={onClose} role="dialog" aria-modal="true">
      <div className="min-h-screen flex flex-col items-center p-4 py-8" onClick={e => e.stopPropagation()}>
        <div className="max-w-4xl w-full bg-cream dark:bg-espresso rounded-2xl shadow-xl overflow-hidden print-content">
          <div className="relative aspect-[2/1] max-h-80">
            <img src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="font-display text-3xl md:text-4xl">{recipe.title}</h1>
              <p className="mt-2 opacity-90">{recipe.description}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {recipe.prepTime + recipe.cookTime} min</span>
                <span className="flex items-center gap-1"><Flame className="w-4 h-4" /> {recipe.calories} cal</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-current" /> {recipe.rating || '—'}</span>
                <span>{recipe.cuisine} · {recipe.category}</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button type="button" onClick={() => onToggleFavorite(recipe.id)} className="p-2 rounded-full bg-white/90 dark:bg-espresso/90" aria-label="Favorite">
                <Heart className={`w-5 h-5 ${recipe.is_favorite ? 'fill-terracotta text-terracotta' : ''}`} />
              </button>
              <button type="button" onClick={onEdit} className="p-2 rounded-full bg-white/90 dark:bg-espresso/90" aria-label="Edit"><Edit3 className="w-5 h-5" /></button>
              <button type="button" onClick={handleShare} className="p-2 rounded-full bg-white/90 dark:bg-espresso/90" aria-label="Share"><Share2 className="w-5 h-5" /></button>
              <button type="button" onClick={handlePrint} className="p-2 rounded-full bg-white/90 dark:bg-espresso/90 no-print" aria-label="Print"><Printer className="w-5 h-5" /></button>
              {onExportJson && <button type="button" onClick={() => onExportJson(recipe)} className="p-2 rounded-full bg-white/90 dark:bg-espresso/90 no-print" aria-label="Export JSON">JSON</button>}
              {onExportMarkdown && <button type="button" onClick={() => onExportMarkdown(recipe)} className="p-2 rounded-full bg-white/90 dark:bg-espresso/90 no-print" aria-label="Export Markdown">MD</button>}
              <button type="button" onClick={onClose} className="p-2 rounded-full bg-white/90 dark:bg-espresso/90 no-print" aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl text-espresso dark:text-cream">Ingredients</h2>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-espresso/70 dark:text-cream/70">Servings:</label>
                    <select value={servings} onChange={e => setServings(Number(e.target.value))} className="px-2 py-1 rounded border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream">
                      {[1,2,3,4,6,8,10].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <ul className="space-y-2">
                  {scaledIngredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <button type="button" onClick={() => toggleIngredient(i)} className="shrink-0 w-5 h-5 rounded border border-espresso/30 dark:border-cream/30 flex items-center justify-center" aria-label={`Toggle ${ing}`}>
                        {checkedIngredients[i] ? <Check className="w-3 h-3 text-sage" /> : null}
                      </button>
                      <span className={checkedIngredients[i] ? 'line-through text-espresso/60 dark:text-cream/60' : ''}>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-xl text-espresso dark:text-cream mb-4">Steps</h2>
                <ol className="space-y-3">
                  {(recipe.steps || []).map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-saffron/20 text-saffron flex items-center justify-center font-medium">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {recipe.notes && (
                <div>
                  <h2 className="font-display text-xl text-espresso dark:text-cream mb-2">Notes</h2>
                  <p className="text-espresso/80 dark:text-cream/80">{recipe.notes}</p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-espresso/5 dark:bg-cream/5">
                <h3 className="font-display text-lg text-espresso dark:text-cream mb-2">Nutrition</h3>
                <p className="text-espresso/80 dark:text-cream/80">{recipe.calories} cal per serving · {recipe.servings} servings</p>
              </div>
              <div>
                <h3 className="font-display text-lg text-espresso dark:text-cream mb-2">Rate this recipe</h3>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} type="button" onClick={() => { dispatchRecipes({ type: 'SET_RATING', payload: { id: recipe.id, rating: star } }); }} className="p-1" aria-label={`Rate ${star} stars`}>
                      <Star className={`w-6 h-6 ${(recipe.rating || 0) >= star ? 'fill-saffron text-saffron' : 'text-espresso/30 dark:text-cream/30'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={onCookingMode} className="w-full py-3 rounded-xl bg-saffron text-white font-medium flex items-center justify-center gap-2">
                <UtensilsCrossed className="w-5 h-5" /> Start Cooking Mode
              </button>
              {related.length > 0 && onSelectRelated && (
                <div>
                  <h3 className="font-display text-lg text-espresso dark:text-cream mb-2">Related</h3>
                  <div className="space-y-2">
                    {related.map(r => (
                      <button key={r.id} type="button" onClick={() => onSelectRelated(r)} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-espresso/5 dark:hover:bg-cream/5 text-espresso dark:text-cream text-sm">
                        {r.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ COOKING MODE (FULLSCREEN) ============
function CookingMode({ recipe, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [ingredientsChecked, setIngredientsChecked] = useState({});
  const stepTimes = recipe.stepTimes || recipe.steps?.map(() => 0) || [];
  const totalSteps = (recipe.steps || []).length;
  const timerRef = useRef(null);

  useEffect(() => {
    const mins = stepTimes[stepIndex];
    if (mins > 0) {
      setSecondsLeft(mins * 60);
    } else {
      setSecondsLeft(null);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stepIndex, stepTimes]);

  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft(s => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [secondsLeft]);

  const currentStep = recipe.steps?.[stepIndex];
  const hasNext = stepIndex < totalSteps - 1;
  const hasPrev = stepIndex > 0;

  return (
    <div className="fixed inset-0 z-[60] bg-espresso dark:bg-espresso text-cream flex flex-col" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between p-4 border-b border-cream/10">
        <span className="font-display text-lg">{recipe.title} — Step {stepIndex + 1} of {totalSteps}</span>
        <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-cream/10" aria-label="Exit cooking mode"><X className="w-6 h-6" /></button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <p className="text-2xl md:text-4xl text-center max-w-2xl mb-8">{currentStep}</p>
        {secondsLeft !== null && secondsLeft > 0 && (
          <div className="text-4xl font-mono mb-6">
            {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
        <div className="flex gap-4">
          <button type="button" onClick={() => setStepIndex(s => s - 1)} disabled={!hasPrev} className="px-6 py-3 rounded-xl bg-cream/10 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          {hasNext ? (
            <button type="button" onClick={() => setStepIndex(s => s + 1)} className="px-6 py-3 rounded-xl bg-saffron text-espresso">
              Next Step
            </button>
          ) : (
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl bg-sage text-cream">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ MEAL PLANNER ============
function MealPlanner({ mealPlan, setMealPlan, recipes, onSelectRecipe }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealSlots = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const setSlot = (day, slot, recipeId) => {
    setMealPlan(prev => {
      const next = { ...prev };
      if (!next[day]) next[day] = {};
      next[day][slot] = recipeId || null;
      return next;
    });
  };

  const clearDay = (day) => {
    setMealPlan(prev => {
      const next = { ...prev };
      next[day] = {};
      return next;
    });
  };

  const clearAll = () => setMealPlan({});

  const autoGenerate = () => {
    const plan = {};
    const recipeIds = recipes.map(r => r.id);
    days.forEach(day => {
      plan[day] = {};
      mealSlots.forEach(slot => {
        if (recipeIds.length) {
          const id = recipeIds[Math.floor(Math.random() * recipeIds.length)];
          plan[day][slot] = id;
        }
      });
    });
    setMealPlan(plan);
  };

  const getPlannedRecipes = () => {
    const ids = new Set();
    Object.values(mealPlan).forEach(day => Object.values(day).forEach(id => id && ids.add(id)));
    return recipes.filter(r => ids.has(r.id));
  };
  const planned = getPlannedRecipes();
  const totalCal = planned.reduce((sum, r) => sum + (r.calories || 0) * (r.servings || 1), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-2xl text-espresso dark:text-cream">Weekly Meal Plan</h2>
        <div className="flex gap-2">
          <button type="button" onClick={autoGenerate} className="px-4 py-2 rounded-lg bg-sage text-white text-sm">Auto-generate</button>
          <button type="button" onClick={clearAll} className="px-4 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 text-espresso dark:text-cream text-sm">Clear all</button>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-sage/10 dark:bg-sage/20 text-espresso dark:text-cream">
        <strong>Summary:</strong> {planned.length} recipes planned · ~{totalCal} cal total this week
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-espresso/10 dark:border-cream/10">
              <th className="text-left py-3 px-2 text-espresso/70 dark:text-cream/70 font-medium">Day</th>
              {mealSlots.map(slot => <th key={slot} className="text-left py-3 px-2 text-espresso/70 dark:text-cream/70 font-medium">{slot}</th>)}
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day} className="border-b border-espresso/5 dark:border-cream/5">
                <td className="py-3 px-2 font-medium text-espresso dark:text-cream">{day}</td>
                {mealSlots.map(slot => {
                  const rid = mealPlan[day]?.[slot];
                  const rec = rid ? recipes.find(r => r.id === rid) : null;
                  return (
                    <td key={slot} className="py-2 px-2">
                      <select
                        value={rid || ''}
                        onChange={e => setSlot(day, slot, e.target.value || null)}
                        className="w-full max-w-[140px] text-sm px-2 py-1.5 rounded border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream"
                      >
                        <option value="">—</option>
                        {recipes.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                      </select>
                      {rec && <p className="text-xs text-espresso/60 dark:text-cream/60 mt-0.5">{rec.prepTime + rec.cookTime} min</p>}
                    </td>
                  );
                })}
                <td>
                  <button type="button" onClick={() => clearDay(day)} className="text-xs text-red-600 dark:text-red-400">Clear</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ GROCERY LIST ============
function categorizeIngredient(ing) {
  const lower = ing.toLowerCase();
  if (lower.match(/milk|yogurt|cheese|cream|butter/)) return 'Dairy';
  if (lower.match(/chicken|beef|pork|lamb|meat|fish|shrimp/)) return 'Meat';
  if (lower.match(/flour|sugar|oil|vinegar|rice|pasta|beans|canned/)) return 'Pantry';
  if (lower.match(/paprika|cumin|pepper|salt|oregano|garlic|ginger/)) return 'Spices';
  if (lower.match(/bread|tortilla/)) return 'Bakery';
  return 'Produce';
}

function GroceryList({ mealPlan, recipes, groceryItems, setGroceryItems, addToast }) {
  const [customItem, setCustomItem] = useState('');
  const [checkedPlanKeys, setCheckedPlanKeys] = useState(new Set());
  const plannedRecipeIds = useMemo(() => {
    const ids = new Set();
    Object.values(mealPlan || {}).forEach(day => Object.values(day || {}).forEach(id => id && ids.add(id)));
    return ids;
  }, [mealPlan]);
  const fromRecipes = useMemo(() => {
    const list = [];
    recipes.filter(r => plannedRecipeIds.has(r.id)).forEach(r => {
      (r.ingredients || []).forEach(ing => list.push({ text: ing.trim(), fromRecipe: r.title, planKey: `${r.id}-${ing.trim()}` }));
    });
    return list;
  }, [recipes, plannedRecipeIds]);
  const combined = useMemo(() => {
    const byCat = {};
    GROCERY_CATEGORIES.forEach(c => { byCat[c] = []; });
    fromRecipes.forEach(item => {
      const cat = categorizeIngredient(item.text);
      if (!byCat[cat]) byCat[cat] = [];
      byCat[cat].push({ ...item, isPlan: true, checked: checkedPlanKeys.has(item.planKey) });
    });
    groceryItems.forEach(item => {
      const cat = categorizeIngredient(item.text);
      if (!byCat[cat]) byCat[cat] = [];
      byCat[cat].push({ ...item, isPlan: false, checked: item.checked });
    });
    return byCat;
  }, [fromRecipes, groceryItems, checkedPlanKeys]);

  const toggleItem = (item) => {
    if (item.isPlan) {
      setCheckedPlanKeys(prev => {
        const next = new Set(prev);
        if (next.has(item.planKey)) next.delete(item.planKey);
        else next.add(item.planKey);
        return next;
      });
    } else if (item.id) {
      setGroceryItems(prev => prev.map(it => it.id === item.id ? { ...it, checked: !it.checked } : it));
    }
  };
  const addCustom = () => {
    if (!customItem.trim()) return;
    setGroceryItems(prev => [...prev, { id: generateId(), text: customItem.trim(), checked: false }]);
    setCustomItem('');
  };
  const removeCustom = (id) => setGroceryItems(prev => prev.filter(it => it.id !== id));
  const exportList = () => {
    let text = 'Grocery List\n\n';
    GROCERY_CATEGORIES.forEach(cat => {
      const items = combined[cat].filter(i => !i.checked);
      if (items.length) {
        text += `${cat}:\n${items.map(i => `• ${i.text}`).join('\n')}\n\n`;
      }
    });
    navigator.clipboard.writeText(text);
    addToast?.('List copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-2xl text-espresso dark:text-cream">Grocery List</h2>
        <button type="button" onClick={exportList} className="px-4 py-2 rounded-lg bg-sage text-white text-sm">Copy list</button>
      </div>
      <p className="text-espresso/70 dark:text-cream/70 text-sm">Generated from your current meal plan. Add custom items below.</p>
      <div className="flex gap-2">
        <input type="text" value={customItem} onChange={e => setCustomItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCustom()} placeholder="Add item..." className="flex-1 px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" />
        <button type="button" onClick={addCustom} className="px-4 py-2 rounded-lg bg-saffron text-white">Add</button>
      </div>
      <div className="space-y-4">
        {GROCERY_CATEGORIES.map(cat => {
          const items = combined[cat];
          if (!items.length) return null;
          return (
            <div key={cat}>
              <h3 className="font-medium text-espresso dark:text-cream mb-2">{cat}</h3>
              <ul className="space-y-1">
                {items.map((it, idx) => (
                  <li key={it.id || it.planKey || idx} className="flex items-center gap-2">
                    <button type="button" onClick={() => toggleItem(it)} className="shrink-0 w-5 h-5 rounded border flex items-center justify-center" aria-label={it.checked ? 'Mark unchecked' : 'Mark purchased'}>
                      {it.checked ? <Check className="w-3 h-3 text-sage" /> : null}
                    </button>
                    <span className={it.checked ? 'line-through text-espresso/60 dark:text-cream/60' : ''}>{it.text}</span>
                    {it.id && groceryItems.some(x => x.id === it.id) && (
                      <button type="button" onClick={() => removeCustom(it.id)} className="ml-auto text-red-600 text-sm">Remove</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ COLLECTIONS ============
function Collections({ collections, recipes, dispatchCollections, onSelectRecipe, onAddRecipeToCollection }) {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');

  const addCollection = () => {
    const name = newName.trim() || 'New Collection';
    dispatchCollections({ type: 'ADD', payload: { name } });
    setNewName('');
    setEditingId(null);
  };
  const deleteCollection = (id) => dispatchCollections({ type: 'DELETE', payload: id });
  const getCoverImage = (c) => {
    const firstId = c.recipeIds[0];
    const rec = recipes.find(r => r.id === firstId);
    return rec?.imageUrl;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="font-display text-2xl text-espresso dark:text-cream">Collections</h2>
        <div className="flex gap-2">
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Collection name" className="px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream w-48" />
          <button type="button" onClick={addCollection} className="px-4 py-2 rounded-lg bg-sage text-white">New</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(c => (
          <div key={c.id} className="bg-white dark:bg-espresso/80 rounded-xl overflow-hidden border border-espresso/5 dark:border-cream/5">
            <div className="aspect-video relative bg-espresso/10 dark:bg-cream/10">
              <img src={getCoverImage(c) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} alt="" className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 right-2 text-white font-display font-semibold drop-shadow">{c.name}</div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm text-espresso/70 dark:text-cream/70">{c.recipeIds.length} recipes</span>
              <button type="button" onClick={() => deleteCollection(c.id)} className="text-red-600 text-sm">Delete</button>
            </div>
            <div className="p-3 border-t border-espresso/5 dark:border-cream/5">
              <button type="button" onClick={() => onSelectRecipe({ collectionId: c.id })} className="text-sm text-saffron hover:underline">View recipes</button>
            </div>
          </div>
        ))}
      </div>
      {collections.length === 0 && (
        <div className="text-center py-12 text-espresso/60 dark:text-cream/60">
          <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No collections yet. Create one to group recipes.</p>
        </div>
      )}
    </div>
  );
}

// ============ SEARCH BAR + FILTER PANEL ============
function SearchBar({ value, onChange, recentSearches, onRecentClick }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/50 dark:text-cream/50" />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        placeholder="Search recipes..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream placeholder-espresso/50"
        aria-label="Search recipes"
      />
      {focused && recentSearches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 py-2 bg-white dark:bg-espresso rounded-xl shadow-lg border border-espresso/10 dark:border-cream/10 z-10">
          <p className="px-3 text-xs text-espresso/60 dark:text-cream/60 mb-1">Recent</p>
          {recentSearches.slice(0, 5).map((s, i) => (
            <button key={i} type="button" onClick={() => { onRecentClick(s); setFocused(false); }} className="w-full text-left px-3 py-1.5 hover:bg-espresso/5 dark:hover:bg-cream/5 text-sm">
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPanel({ filters, setFilters, categories, cuisines, clearAll }) {
  const hasActive = Object.values(filters).some(v => v !== undefined && v !== '' && (Array.isArray(v) ? v.length : true));
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Filter className="w-4 h-4 text-espresso/60 dark:text-cream/60" />
      <select value={filters.category || ''} onChange={e => setFilters(f => ({ ...f, category: e.target.value || undefined }))} className="px-2 py-1.5 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-sm text-espresso dark:text-cream">
        <option value="">Category</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={filters.cuisine || ''} onChange={e => setFilters(f => ({ ...f, cuisine: e.target.value || undefined }))} className="px-2 py-1.5 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-sm text-espresso dark:text-cream">
        <option value="">Cuisine</option>
        {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={filters.difficulty || ''} onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value || undefined }))} className="px-2 py-1.5 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-sm text-espresso dark:text-cream">
        <option value="">Difficulty</option>
        {['Easy', 'Medium', 'Hard'].map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <select value={filters.sort || 'newest'} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))} className="px-2 py-1.5 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-sm text-espresso dark:text-cream">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="rating">Rating</option>
        <option value="prepTime">Prep time</option>
        <option value="name">Name A–Z</option>
        <option value="calories">Calories</option>
      </select>
      <label className="flex items-center gap-1.5 text-sm text-espresso dark:text-cream cursor-pointer">
        <input type="checkbox" checked={!!filters.favoritesOnly} onChange={e => setFilters(f => ({ ...f, favoritesOnly: e.target.checked }))} className="rounded" />
        Favorites
      </label>
      {hasActive && (
        <button type="button" onClick={clearAll} className="text-sm text-saffron hover:underline">Clear all</button>
      )}
    </div>
  );
}

// ============ DASHBOARD ============
function Dashboard({ recipes, collections, mealPlan, onSelectRecipe, onSetView }) {
  const featured = useMemo(() => {
    if (!recipes.length) return null;
    const daySeed = new Date().toDateString().split('').reduce((a, c) => ((a << 5) - a) + c.charCodeAt(0), 0);
    return recipes[Math.abs(daySeed) % recipes.length];
  }, [recipes]);
  const favorites = recipes.filter(r => r.is_favorite);
  const recent = [...recipes].sort((a, b) => new Date(b.date_created) - new Date(a.date_created)).slice(0, 4);
  const topRated = [...recipes].filter(r => r.rating > 0).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);
  const plannedCount = Object.values(mealPlan || {}).reduce((sum, day) => sum + Object.values(day || {}).filter(Boolean).length, 0);

  return (
    <div className="space-y-8">
      {featured && (
        <section className="relative rounded-2xl overflow-hidden aspect-[2/1] max-h-80 bg-espresso/10 dark:bg-cream/10">
          <img src={featured.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <p className="text-sm uppercase tracking-wider opacity-90">Recipe of the day</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">{featured.title}</h2>
            <p className="mt-2 opacity-90 max-w-xl">{featured.description}</p>
            <button type="button" onClick={() => onSelectRecipe(featured)} className="mt-4 px-5 py-2.5 rounded-xl bg-saffron text-espresso font-medium">
              View recipe
            </button>
          </div>
        </section>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button type="button" onClick={() => onSetView('recipes')} className="p-4 rounded-xl bg-white dark:bg-espresso/80 border border-espresso/5 dark:border-cream/5 text-left hover:shadow-md transition-shadow">
          <BookOpen className="w-8 h-8 text-sage mb-2" />
          <p className="font-display text-2xl text-espresso dark:text-cream">{recipes.length}</p>
          <p className="text-sm text-espresso/70 dark:text-cream/70">Recipes</p>
        </button>
        <button type="button" onClick={() => onSetView('recipes')} className="p-4 rounded-xl bg-white dark:bg-espresso/80 border border-espresso/5 dark:border-cream/5 text-left hover:shadow-md transition-shadow">
          <Heart className="w-8 h-8 text-terracotta mb-2" />
          <p className="font-display text-2xl text-espresso dark:text-cream">{favorites.length}</p>
          <p className="text-sm text-espresso/70 dark:text-cream/70">Favorites</p>
        </button>
        <button type="button" onClick={() => onSetView('mealplanner')} className="p-4 rounded-xl bg-white dark:bg-espresso/80 border border-espresso/5 dark:border-cream/5 text-left hover:shadow-md transition-shadow">
          <Calendar className="w-8 h-8 text-saffron mb-2" />
          <p className="font-display text-2xl text-espresso dark:text-cream">{plannedCount}</p>
          <p className="text-sm text-espresso/70 dark:text-cream/70">Planned this week</p>
        </button>
        <button type="button" onClick={() => onSetView('collections')} className="p-4 rounded-xl bg-white dark:bg-espresso/80 border border-espresso/5 dark:border-cream/5 text-left hover:shadow-md transition-shadow">
          <FolderOpen className="w-8 h-8 text-sage mb-2" />
          <p className="font-display text-2xl text-espresso dark:text-cream">{collections.length}</p>
          <p className="text-sm text-espresso/70 dark:text-cream/70">Collections</p>
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h3 className="font-display text-xl text-espresso dark:text-cream mb-4">Recently added</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recent.map(r => (
              <button key={r.id} type="button" onClick={() => onSelectRecipe(r)} className="shrink-0 w-40 rounded-xl overflow-hidden border border-espresso/10 dark:border-cream/10 hover:shadow-md transition-shadow">
                <img src={r.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} alt="" className="aspect-square object-cover" />
                <p className="p-2 text-sm font-medium text-espresso dark:text-cream truncate">{r.title}</p>
              </button>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-display text-xl text-espresso dark:text-cream mb-4">Top rated</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {topRated.map(r => (
              <button key={r.id} type="button" onClick={() => onSelectRecipe(r)} className="shrink-0 w-40 rounded-xl overflow-hidden border border-espresso/10 dark:border-cream/10 hover:shadow-md transition-shadow">
                <img src={r.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} alt="" className="aspect-square object-cover" />
                <p className="p-2 text-sm font-medium text-espresso dark:text-cream truncate flex items-center gap-1">
                  <Star className="w-4 h-4 fill-saffron text-saffron" /> {r.rating} {r.title}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
      <section>
        <h3 className="font-display text-xl text-espresso dark:text-cream mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button key={cat} type="button" onClick={() => onSetView('recipes')} className="px-4 py-2 rounded-full bg-sage/20 text-sage dark:bg-sage/40 hover:bg-sage/30 dark:hover:bg-sage/50 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============ SETTINGS PANEL ============
function SettingsPanel({ settings, setSettings, categories, cuisines, setCategories, setCuisines, addToast, onExportAll, onImportJson }) {
  return (
    <div className="max-w-xl space-y-8">
      <h2 className="font-display text-2xl text-espresso dark:text-cream">Settings</h2>
      <section>
        <h3 className="font-medium text-espresso dark:text-cream mb-3">Appearance</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-espresso dark:text-cream">Dark mode</span>
          <button type="button" role="switch" aria-checked={settings.darkMode} onClick={() => { const next = !settings.darkMode; setSettings(s => ({ ...s, darkMode: next })); document.documentElement.classList.toggle('dark', next); addToast('Theme updated', 'success'); }} className={`relative w-12 h-6 rounded-full ${settings.darkMode ? 'bg-saffron' : 'bg-espresso/20 dark:bg-cream/20'}`}>
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.darkMode ? 'left-7' : 'left-1'}`} />
          </button>
        </label>
      </section>
      <section>
        <h3 className="font-medium text-espresso dark:text-cream mb-3">Defaults</h3>
        <label className="block text-sm text-espresso/70 dark:text-cream/70 mb-1">Default servings</label>
        <input type="number" min={1} value={settings.defaultServings} onChange={e => setSettings(s => ({ ...s, defaultServings: parseInt(e.target.value, 10) || 4 }))} className="w-24 px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream" />
      </section>
      <section>
        <h3 className="font-medium text-espresso dark:text-cream mb-3">View</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="view" checked={settings.viewMode === 'grid'} onChange={() => setSettings(s => ({ ...s, viewMode: 'grid' }))} />
            <LayoutGrid className="w-4 h-4" /> Grid
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="view" checked={settings.viewMode === 'list'} onChange={() => setSettings(s => ({ ...s, viewMode: 'list' }))} />
            <List className="w-4 h-4" /> List
          </label>
        </div>
      </section>
      <section>
        <h3 className="font-medium text-espresso dark:text-cream mb-3">Import / Export</h3>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onExportAll} className="px-4 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 text-espresso dark:text-cream text-sm">Export all (JSON)</button>
          <label className="px-4 py-2 rounded-lg bg-sage text-white text-sm cursor-pointer">
            Import JSON
            <input type="file" accept=".json,application/json" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) f.text().then(onImportJson); e.target.value = ''; }} />
          </label>
          <div className="w-full mt-2">
            <p className="text-xs text-espresso/60 dark:text-cream/60 mb-1">Or paste JSON below:</p>
            <textarea id="import-json-paste" rows={3} placeholder='[{"title":"...", ...}]' className="w-full px-3 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 bg-white dark:bg-espresso/50 text-espresso dark:text-cream text-sm font-mono" />
            <button type="button" onClick={() => { const el = document.getElementById('import-json-paste'); if (el?.value) onImportJson(el.value); }} className="mt-1 px-3 py-1.5 rounded-lg bg-saffron/20 text-saffron text-sm">Import from paste</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============ CONFIRM DIALOG ============
function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-espresso/50 dark:bg-cream/20" role="alertdialog" aria-modal="true">
      <div className="bg-cream dark:bg-espresso rounded-xl shadow-xl max-w-sm w-full p-6 animate-slide-up">
        <h3 className="font-display text-lg text-espresso dark:text-cream">{title}</h3>
        <p className="mt-2 text-espresso/80 dark:text-cream/80 text-sm">{message}</p>
        <div className="flex gap-2 mt-6 justify-end">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-espresso/20 dark:border-cream/20 text-espresso dark:text-cream">Cancel</button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ============ APP ============
export default function App() {
  const [recipes, dispatchRecipes] = useReducer(recipeReducer, SAMPLE_RECIPES);
  const [collections, dispatchCollections] = useReducer(collectionReducer, [
    { id: 'c1', name: 'Date Night', recipeIds: ['1', '7', '12'] },
    { id: 'c2', name: 'Quick Weekdays', recipeIds: ['3', '4', '13'] },
  ]);
  const [mealPlan, setMealPlan] = useState({});
  const [groceryItems, setGroceryItems] = useState([]);
  const [settings, setSettings] = useState({
    darkMode: false,
    defaultServings: 4,
    viewMode: 'grid',
    dietaryTags: [],
  });
  const [toasts, setToasts] = useState([]);
  const [view, setView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ sort: 'newest' });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cookingModeRecipe, setCookingModeRecipe] = useState(null);
  const [formRecipe, setFormRecipe] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [collectionViewId, setCollectionViewId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const searchInputRef = useRef(null);

  const addToast = useCallback((message, type = 'success') => {
    const id = generateId();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, []);

  const filteredAndSortedRecipes = useMemo(() => {
    let list = [...recipes];
    if (collectionViewId) {
      const col = collections.find(c => c.id === collectionViewId);
      if (col) list = list.filter(r => col.recipeIds.includes(r.id));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      list = list.filter(r =>
        fuzzyMatch(r.title, q) || fuzzyMatch(r.description, q) ||
        (r.tags || []).some(t => fuzzyMatch(t, q)) ||
        (r.ingredients || []).some(i => fuzzyMatch(i, q))
      );
    }
    if (filters.category) list = list.filter(r => r.category === filters.category);
    if (filters.cuisine) list = list.filter(r => r.cuisine === filters.cuisine);
    if (filters.difficulty) list = list.filter(r => r.difficulty === filters.difficulty);
    if (filters.favoritesOnly) list = list.filter(r => r.is_favorite);
    const sort = filters.sort || 'newest';
    if (sort === 'newest') list.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
    else if (sort === 'oldest') list.sort((a, b) => new Date(a.date_created) - new Date(b.date_created));
    else if (sort === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === 'prepTime') list.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
    else if (sort === 'name') list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    else if (sort === 'calories') list.sort((a, b) => (a.calories || 0) - (b.calories || 0));
    return list;
  }, [recipes, collectionViewId, collections, searchQuery, filters]);

  const categories = useMemo(() => [...new Set([...CATEGORIES, ...recipes.map(r => r.category).filter(Boolean)])].sort(), [recipes]);
  const cuisines = useMemo(() => [...new Set([...CUISINES, ...recipes.map(r => r.cuisine).filter(Boolean)])].sort(), [recipes]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode);
  }, [settings.darkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedRecipe(null);
        setCookingModeRecipe(null);
        setFormRecipe(null);
        setConfirmDelete(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveRecipe = useCallback((data) => {
    if (data.id) {
      dispatchRecipes({ type: 'UPDATE', payload: data });
      addToast('Recipe updated');
    } else {
      const id = generateId();
      dispatchRecipes({ type: 'ADD', payload: { ...data, id, date_created: new Date().toISOString() } });
      addToast('Recipe added');
    }
    setFormRecipe(null);
  }, [addToast]);

  const handleDuplicateRecipe = useCallback((recipe) => {
    const { id, date_created, ...rest } = recipe;
    dispatchRecipes({ type: 'ADD', payload: { ...rest, title: recipe.title + ' (copy)', date_created: new Date().toISOString() } });
    addToast('Recipe duplicated');
  }, [addToast]);

  const handleDeleteRecipe = useCallback((id) => {
    dispatchRecipes({ type: 'DELETE', payload: id });
    setConfirmDelete(null);
    setSelectedRecipe(null);
    addToast('Recipe deleted', 'info');
  }, [addToast]);

  const handleToggleFavorite = useCallback((id) => {
    dispatchRecipes({ type: 'TOGGLE_FAVORITE', payload: id });
  }, []);

  const addToRecentSearch = useCallback((q) => {
    if (!q.trim()) return;
    setRecentSearches(prev => [q.trim(), ...prev.filter(s => s !== q.trim())].slice(0, 10));
  }, []);

  const exportRecipeJson = useCallback((recipe) => {
    const blob = new Blob([JSON.stringify(recipe, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(recipe.title || 'recipe').replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Recipe exported');
  }, [addToast]);

  const exportAllJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(recipes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipes-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    addToast('Backup exported');
  }, [recipes, addToast]);

  const importJson = useCallback((jsonText) => {
    try {
      const data = JSON.parse(jsonText);
      const list = Array.isArray(data) ? data : [data];
      list.forEach(r => {
        const id = r.id || generateId();
        dispatchRecipes({ type: 'ADD', payload: { ...r, id, date_created: r.date_created || new Date().toISOString() } });
      });
      addToast(`Imported ${list.length} recipe(s)`);
    } catch (e) {
      addToast('Invalid JSON', 'error');
    }
  }, [dispatchRecipes, addToast]);

  const exportRecipeMarkdown = useCallback((recipe) => {
    const ing = (recipe.ingredients || []).map(i => `- ${i}`).join('\n');
    const steps = (recipe.steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n');
    const md = `# ${recipe.title}\n\n${recipe.description || ''}\n\n## Ingredients\n\n${ing}\n\n## Steps\n\n${steps}\n`;
    navigator.clipboard.writeText(md);
    addToast('Copied as Markdown');
  }, [addToast]);

  return (
    <div className="min-h-screen bg-cream dark:bg-espresso text-espresso dark:text-cream">
      <div className="flex">
        <Sidebar currentView={view} setView={v => { setView(v); if (v !== 'collections') setCollectionViewId(null); }} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} isDark={settings.darkMode} />
        <main className="flex-1 min-h-screen pb-20 md:pb-0">
          <header className="sticky top-0 z-40 bg-cream/95 dark:bg-espresso/95 backdrop-blur border-b border-espresso/10 dark:border-cream/10 no-print">
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-4">
              <div className="flex-1 flex gap-2">
                <div className="flex-1" ref={searchInputRef}>
                  <SearchBar value={searchQuery} onChange={v => { setSearchQuery(v); addToRecentSearch(v); }} recentSearches={recentSearches} onRecentClick={s => setSearchQuery(s)} />
                </div>
              </div>
              {(view === 'recipes' || collectionViewId) && (
                <FilterPanel filters={filters} setFilters={setFilters} categories={categories} cuisines={cuisines} clearAll={() => setFilters({ sort: 'newest' })} />
              )}
              {view === 'recipes' && (
                <button type="button" onClick={() => setFormRecipe({})} className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-saffron text-espresso font-medium">
                  <Plus className="w-5 h-5" /> Add recipe
                </button>
              )}
            </div>
          </header>
          <div className="p-4 md:p-6 lg:p-8">
            {view === 'dashboard' && <Dashboard recipes={recipes} collections={collections} mealPlan={mealPlan} onSelectRecipe={r => setSelectedRecipe(typeof r === 'object' && r?.id ? r : null)} onSetView={setView} />}
            {view === 'recipes' && (
              <>
                {collectionViewId && (
                  <div className="flex items-center gap-2 mb-4">
                    <button type="button" onClick={() => setCollectionViewId(null)} className="text-saffron hover:underline">← All recipes</button>
                    <span className="text-espresso/60 dark:text-cream/60">|</span>
                    <span className="font-medium">{collections.find(c => c.id === collectionViewId)?.name}</span>
                  </div>
                )}
                <RecipeGrid
                  recipes={filteredAndSortedRecipes}
                  viewMode={settings.viewMode}
                  onSelect={r => setSelectedRecipe(r)}
                  onEdit={r => setFormRecipe(r)}
                  onDuplicate={handleDuplicateRecipe}
                  onDelete={id => setConfirmDelete({ id, title: 'Delete recipe?', message: 'This cannot be undone.' })}
                  onToggleFavorite={handleToggleFavorite}
                  collectionId={collectionViewId}
                  collections={collections}
                  dispatchCollections={dispatchCollections}
                />
              </>
            )}
            {view === 'mealplanner' && <MealPlanner mealPlan={mealPlan} setMealPlan={setMealPlan} recipes={recipes} onSelectRecipe={setSelectedRecipe} />}
            {view === 'grocery' && <GroceryList mealPlan={mealPlan} recipes={recipes} groceryItems={groceryItems} setGroceryItems={setGroceryItems} addToast={addToast} />}
            {view === 'collections' && (
              <Collections
                collections={collections}
                recipes={recipes}
                dispatchCollections={dispatchCollections}
                onSelectRecipe={r => { setView('recipes'); setCollectionViewId(r.collectionId); }}
                onAddRecipeToCollection={() => {}}
              />
            )}
            {view === 'settings' && <SettingsPanel settings={settings} setSettings={setSettings} categories={categories} cuisines={cuisines} setCategories={() => {}} setCuisines={() => {}} addToast={addToast} onExportAll={exportAllJson} onImportJson={importJson} />}
          </div>
        </main>
      </div>
      <BottomNav currentView={view} setView={v => { setView(v); if (v !== 'collections') setCollectionViewId(null); }} />

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          recipes={recipes}
          onClose={() => setSelectedRecipe(null)}
          onEdit={() => { setFormRecipe(selectedRecipe); setSelectedRecipe(null); }}
          onCookingMode={() => setCookingModeRecipe(selectedRecipe)}
          onToggleFavorite={handleToggleFavorite}
          onSetRating={(id, rating) => dispatchRecipes({ type: 'SET_RATING', payload: { id, rating } })}
          dispatchRecipes={dispatchRecipes}
          settings={settings}
          onSelectRelated={r => setSelectedRecipe(r)}
          onExportJson={exportRecipeJson}
          onExportMarkdown={exportRecipeMarkdown}
        />
      )}
      {cookingModeRecipe && <CookingMode recipe={cookingModeRecipe} onClose={() => setCookingModeRecipe(null)} />}
      {formRecipe !== null && <RecipeForm recipe={formRecipe} onSave={handleSaveRecipe} onClose={() => setFormRecipe(null)} categories={categories} cuisines={cuisines} />}
      <ConfirmDialog open={!!confirmDelete} title={confirmDelete?.title} message={confirmDelete?.message} onConfirm={() => confirmDelete && handleDeleteRecipe(confirmDelete.id)} onCancel={() => setConfirmDelete(null)} />
      <ToastSystem toasts={toasts} removeToast={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  );
}
