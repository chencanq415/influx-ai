import type { LText } from "@/lib/i18n/dict";

export type ToolCategoryId = "creator" | "creative" | "brand";
export type ToolIconId =
  | "profile"
  | "caption"
  | "hashtag"
  | "calculator"
  | "money"
  | "youtube"
  | "script"
  | "video"
  | "copy"
  | "review"
  | "ideas"
  | "hook"
  | "mail"
  | "audience"
  | "strategy"
  | "roi"
  | "rights";

export type ToolField = {
  id: string;
  label: LText;
  placeholder?: LText;
  type: "text" | "textarea" | "number" | "select" | "file";
  options?: LText[];
};

export type FreeTool = {
  slug: string;
  category: ToolCategoryId;
  platform?: "Instagram" | "TikTok" | "YouTube";
  priority: "P0" | "P1" | "P2";
  icon: ToolIconId;
  title: LText;
  description: LText;
  features: LText[];
  fields: ToolField[];
  examples: LText[];
};

export const toolCategories: Array<{ id: ToolCategoryId; label: LText; description: LText }> = [
  {
    id: "creator",
    label: { zh: "Creator Tools", en: "Creator Tools" },
    description: {
      zh: "达人主页、内容发布与商业价值评估",
      en: "Creator profiles, publishing, and commercial value",
    },
  },
  {
    id: "creative",
    label: { zh: "Creative Tools", en: "Creative Tools" },
    description: {
      zh: "脚本、文案、创意与视频内容生产",
      en: "Scripts, copy, ideas, and video production",
    },
  },
  {
    id: "brand",
    label: { zh: "Brand & Marketing", en: "Brand & Marketing" },
    description: {
      zh: "达人合作、受众策略与营销决策",
      en: "Creator outreach, audience strategy, and decisions",
    },
  },
];

const text = (
  id: string,
  zh: string,
  en: string,
  placeholderZh: string,
  placeholderEn: string,
): ToolField => ({
  id,
  label: { zh, en },
  placeholder: { zh: placeholderZh, en: placeholderEn },
  type: "text",
});
const area = (
  id: string,
  zh: string,
  en: string,
  placeholderZh: string,
  placeholderEn: string,
): ToolField => ({
  id,
  label: { zh, en },
  placeholder: { zh: placeholderZh, en: placeholderEn },
  type: "textarea",
});
const number = (id: string, zh: string, en: string, placeholder = "0"): ToolField => ({
  id,
  label: { zh, en },
  placeholder: { zh: placeholder, en: placeholder },
  type: "number",
});
const select = (
  id: string,
  zh: string,
  en: string,
  options: Array<[string, string]>,
): ToolField => ({
  id,
  label: { zh, en },
  type: "select",
  options: options.map(([z, e]) => ({ zh: z, en: e })),
});
const file = (id: string, zh: string, en: string): ToolField => ({
  id,
  label: { zh, en },
  type: "file",
});

export const freeTools: FreeTool[] = [
  {
    slug: "instagram-bio-generator",
    category: "creator",
    platform: "Instagram",
    priority: "P0",
    icon: "profile",
    title: { zh: "Instagram 简介生成器", en: "Instagram Bio Generator" },
    description: {
      zh: "在 150 字符内生成有辨识度、带 CTA 的 Instagram Bio。",
      en: "Create distinctive, CTA-ready Instagram bios within 150 characters.",
    },
    features: [
      { zh: "生成 5–10 条差异化 Bio", en: "Generate 5–10 differentiated bios" },
      { zh: "专业、幽默、极简等风格", en: "Professional, witty, minimal, and more" },
      { zh: "Emoji、CTA 与字符计数", en: "Emoji, CTA, and character count" },
    ],
    fields: [
      select("account", "账号类型", "Account type", [
        ["个人创作者", "Individual creator"],
        ["品牌账号", "Brand account"],
      ]),
      text(
        "niche",
        "账号定位",
        "Niche",
        "例如：护肤、健身、旅行",
        "e.g. skincare, fitness, travel",
      ),
      select("tone", "表达风格", "Tone", [
        ["专业", "Professional"],
        ["幽默", "Witty"],
        ["极简", "Minimal"],
        ["励志", "Inspirational"],
      ]),
    ],
    examples: [
      {
        zh: "敏感肌也能安心变美 ✨｜真实护肤测评｜合作请 DM",
        en: "Sensitive-skin beauty, made simple ✨ Honest reviews · DM for collabs",
      },
      {
        zh: "少即是多。护肤、生活与一点点光。",
        en: "Less, but better. Skincare, life, and a little glow.",
      },
    ],
  },
  {
    slug: "instagram-caption-generator",
    category: "creator",
    platform: "Instagram",
    priority: "P0",
    icon: "caption",
    title: { zh: "Instagram 文案生成器", en: "Instagram Caption Generator" },
    description: {
      zh: "按场景、语气和长度生成配文与 Hashtag。",
      en: "Generate captions and hashtags by scene, tone, and length.",
    },
    features: [
      { zh: "旅行、美食、时尚、健身等场景", en: "Travel, food, fashion, fitness, and more" },
      { zh: "短、中、故事型三种长度", en: "Short, medium, and story lengths" },
      { zh: "自动匹配 Hashtag", en: "Matched hashtag suggestions" },
    ],
    fields: [
      area(
        "topic",
        "图片描述或关键词",
        "Image description or keywords",
        "描述画面、产品或想表达的情绪",
        "Describe the image, product, or mood",
      ),
      select("scene", "内容场景", "Scene", [
        ["产品推广", "Product promotion"],
        ["旅行", "Travel"],
        ["美食", "Food"],
        ["日常", "Everyday"],
      ]),
      select("length", "文案长度", "Length", [
        ["短", "Short"],
        ["中", "Medium"],
        ["故事型", "Story"],
      ]),
    ],
    examples: [
      {
        zh: "今天的光刚刚好，肌肤也一样。✨ #DailyGlow #SkinFirst",
        en: "The light hit differently today—and so did the glow. ✨ #DailyGlow #SkinFirst",
      },
      {
        zh: "把日常过成值得收藏的一帧。",
        en: "Turning an ordinary day into something worth saving.",
      },
    ],
  },
  {
    slug: "instagram-hashtag-generator",
    category: "creator",
    platform: "Instagram",
    priority: "P0",
    icon: "hashtag",
    title: { zh: "Instagram 标签生成器", en: "Instagram Hashtag Generator" },
    description: {
      zh: "生成大词、中词和长尾词搭配的 30 个标签组合。",
      en: "Build a 30-tag mix of broad, mid-volume, and long-tail hashtags.",
    },
    features: [
      { zh: "按热度分层展示", en: "Grouped by estimated volume" },
      { zh: "行业筛选与图片识别", en: "Industry filter and image input" },
      { zh: "一键复制黄金组合", en: "One-click balanced set" },
    ],
    fields: [
      text(
        "keyword",
        "内容关键词",
        "Content keyword",
        "例如：敏感肌修护",
        "e.g. sensitive skin repair",
      ),
      select("industry", "行业", "Industry", [
        ["美妆", "Beauty"],
        ["时尚", "Fashion"],
        ["健身", "Fitness"],
        ["旅行", "Travel"],
      ]),
      file("image", "上传参考图片（可选）", "Upload reference image (optional)"),
    ],
    examples: [
      {
        zh: "大词：#skincare #beauty｜中词：#skinbarrier #sensitiveskin｜长尾：#barrierrepairroutine",
        en: "Broad: #skincare #beauty · Mid: #skinbarrier #sensitiveskin · Long-tail: #barrierrepairroutine",
      },
    ],
  },
  {
    slug: "instagram-engagement-rate-calculator",
    category: "creator",
    platform: "Instagram",
    priority: "P1",
    icon: "calculator",
    title: { zh: "Instagram 互动率计算器", en: "Instagram Engagement Rate Calculator" },
    description: {
      zh: "计算达人互动率，并与同量级行业基准对比。",
      en: "Calculate creator engagement and compare it with industry benchmarks.",
    },
    features: [
      { zh: "粉丝口径与曝光口径", en: "Follower and reach-based formulas" },
      { zh: "量级与行业基准", en: "Tier and industry benchmarks" },
      { zh: "优秀、良好、一般、偏低评级", en: "Performance rating and report" },
    ],
    fields: [
      number("followers", "粉丝数", "Followers", "100000"),
      number("likes", "近 10 篇平均点赞", "Average likes (last 10 posts)", "4200"),
      number("comments", "近 10 篇平均评论", "Average comments (last 10 posts)", "180"),
    ],
    examples: [
      {
        zh: "平均互动率 4.38% · 高于同量级账号基准 1.12 个百分点 · 评级：良好",
        en: "Average engagement 4.38% · 1.12 pts above peer benchmark · Rating: Good",
      },
    ],
  },
  {
    slug: "instagram-money-calculator",
    category: "creator",
    platform: "Instagram",
    priority: "P1",
    icon: "money",
    title: { zh: "Instagram 收入估算器", en: "Instagram Money Calculator" },
    description: {
      zh: "估算 Feed、Reels、Stories 等合作内容的合理报价。",
      en: "Estimate fair rates for Feed, Reels, Stories, and Carousel posts.",
    },
    features: [
      { zh: "报价区间与建议报价", en: "Rate range and suggested quote" },
      { zh: "按内容形式区分", en: "Format-specific estimates" },
      { zh: "行业 CPM 与预算参考", en: "CPM and brand budget reference" },
    ],
    fields: [
      number("followers", "粉丝数", "Followers", "80000"),
      number("engagement", "互动率（%）", "Engagement rate (%)", "4.5"),
      select("format", "内容形式", "Content format", [
        ["Reels", "Reels"],
        ["Feed 帖子", "Feed post"],
        ["Stories", "Stories"],
        ["Carousel", "Carousel"],
      ]),
    ],
    examples: [
      {
        zh: "建议报价 USD 720 · 合理区间 USD 540–960",
        en: "Suggested quote USD 720 · Fair range USD 540–960",
      },
    ],
  },
  {
    slug: "tiktok-bio-generator",
    category: "creator",
    platform: "TikTok",
    priority: "P0",
    icon: "profile",
    title: { zh: "TikTok 简介生成器", en: "TikTok Bio Generator" },
    description: {
      zh: "生成更口语、更有网感的 80 字符 TikTok Bio。",
      en: "Create punchy, trend-aware TikTok bios within 80 characters.",
    },
    features: [
      { zh: "TikTok 专属口语风格", en: "TikTok-native voice" },
      { zh: "热门梗与 Emoji", en: "Trending expressions and emoji" },
      { zh: "CTA 与实时字符计数", en: "CTA and live character count" },
    ],
    fields: [
      text("niche", "内容领域", "Content niche", "例如：平价穿搭", "e.g. affordable outfits"),
      text(
        "traits",
        "个人特质",
        "Personality keywords",
        "真实、搞笑、直接",
        "honest, funny, direct",
      ),
      select("tone", "风格", "Style", [
        ["有梗", "Trend-aware"],
        ["酷感", "Bold"],
        ["治愈", "Warm"],
      ]),
    ],
    examples: [
      {
        zh: "每天一套不费力穿搭 ✌️ follow for the fit",
        en: "daily fits without the effort ✌️ follow for the look",
      },
    ],
  },
  {
    slug: "tiktok-caption-generator",
    category: "creator",
    platform: "TikTok",
    priority: "P0",
    icon: "caption",
    title: { zh: "TikTok 文案生成器", en: "TikTok Caption Generator" },
    description: {
      zh: "生成带钩子、正文和热门标签的 TikTok 文案。",
      en: "Generate TikTok captions with hooks, body copy, and trend-aware tags.",
    },
    features: [
      { zh: "教程、种草、剧情、Vlog 等类型", en: "Tutorial, review, story, vlog, and more" },
      { zh: "黄金 2–3 秒钩子", en: "Attention-first opening hook" },
      { zh: "热门标签自动推荐", en: "Trend-aware hashtag suggestions" },
    ],
    fields: [
      area(
        "topic",
        "视频主题",
        "Video topic",
        "描述视频内容和核心卖点",
        "Describe the video and key value",
      ),
      select("videoType", "视频类型", "Video type", [
        ["种草", "Product recommendation"],
        ["教程", "Tutorial"],
        ["Vlog", "Vlog"],
        ["剧情", "Story"],
      ]),
      select("goal", "目标", "Goal", [
        ["涨粉", "Grow followers"],
        ["带货", "Drive sales"],
        ["互动", "Engagement"],
      ]),
    ],
    examples: [
      {
        zh: "别再这样涂防晒了…第 3 步才是关键 👀 #SkincareTok #LearnOnTikTok",
        en: "Stop applying SPF like this—the third step changes everything 👀 #SkincareTok",
      },
    ],
  },
  {
    slug: "tiktok-hashtag-generator",
    category: "creator",
    platform: "TikTok",
    priority: "P0",
    icon: "hashtag",
    title: { zh: "TikTok 标签生成器", en: "TikTok Hashtag Generator" },
    description: {
      zh: "组合热门挑战、行业词与长尾词，提升推荐机会。",
      en: "Mix challenges, category tags, and long-tail tags for discovery.",
    },
    features: [
      { zh: "热门挑战、行业、泛流量分组", en: "Challenge, category, and discovery groups" },
      { zh: "播放量估算", en: "Estimated views by tag" },
      { zh: "地区趋势筛选", en: "Country and region trends" },
    ],
    fields: [
      text("keyword", "内容关键词", "Content keyword", "例如：居家普拉提", "e.g. at-home Pilates"),
      select("region", "国家 / 地区", "Country / region", [
        ["美国", "United States"],
        ["英国", "United Kingdom"],
        ["全球", "Global"],
      ]),
      select("industry", "行业", "Industry", [
        ["健身", "Fitness"],
        ["美妆", "Beauty"],
        ["生活方式", "Lifestyle"],
      ]),
    ],
    examples: [
      {
        zh: "黄金组合：#FitnessChallenge #PilatesTok #HomeWorkout #CoreRoutine #BeginnerPilates",
        en: "Golden mix: #FitnessChallenge #PilatesTok #HomeWorkout #CoreRoutine #BeginnerPilates",
      },
    ],
  },
  {
    slug: "tiktok-engagement-rate-calculator",
    category: "creator",
    platform: "TikTok",
    priority: "P1",
    icon: "calculator",
    title: { zh: "TikTok 互动率计算器", en: "TikTok Engagement Rate Calculator" },
    description: {
      zh: "按播放量和粉丝数两种口径计算综合互动率。",
      en: "Calculate engagement by both views and followers.",
    },
    features: [
      { zh: "点赞、评论、分享综合计算", en: "Likes, comments, and shares included" },
      { zh: "播放量与粉丝双口径", en: "View and follower-based rates" },
      { zh: "行业基准与改进建议", en: "Benchmarks and recommendations" },
    ],
    fields: [
      number("views", "平均播放量", "Average views", "120000"),
      number("likes", "平均点赞", "Average likes", "8500"),
      number("comments", "平均评论", "Average comments", "420"),
      number("shares", "平均分享", "Average shares", "310"),
    ],
    examples: [
      {
        zh: "播放量互动率 7.69% · 评级：优秀",
        en: "View-based engagement 7.69% · Rating: Excellent",
      },
    ],
  },
  {
    slug: "tiktok-money-calculator",
    category: "creator",
    platform: "TikTok",
    priority: "P1",
    icon: "money",
    title: { zh: "TikTok 收入估算器", en: "TikTok Money Calculator" },
    description: {
      zh: "估算创作者基金、品牌合作、直播与带货收入。",
      en: "Estimate creator fund, sponsorship, live, and affiliate revenue.",
    },
    features: [
      { zh: "多收入来源拆分", en: "Revenue stream breakdown" },
      { zh: "月度与年度区间", en: "Monthly and annual ranges" },
      { zh: "提升收入建议", en: "Revenue growth recommendations" },
    ],
    fields: [
      number("followers", "粉丝数", "Followers", "150000"),
      number("views", "平均播放量", "Average views", "80000"),
      number("engagement", "互动率（%）", "Engagement rate (%)", "7"),
    ],
    examples: [
      {
        zh: "品牌合作 USD 900–1,650 / 条 · 月度综合预估 USD 2,400–5,200",
        en: "Brand deal USD 900–1,650/post · Estimated monthly total USD 2,400–5,200",
      },
    ],
  },
  {
    slug: "youtube-title-generator",
    category: "creator",
    platform: "YouTube",
    priority: "P0",
    icon: "youtube",
    title: { zh: "YouTube 标题生成器", en: "YouTube Title Generator" },
    description: {
      zh: "生成兼顾 SEO 与点击欲望的视频标题。",
      en: "Create video titles optimized for both search and clicks.",
    },
    features: [
      {
        zh: "How-to、悬念、数字、对比等类型",
        en: "How-to, curiosity, list, and comparison styles",
      },
      { zh: "字符数与关键词评分", en: "Character count and keyword score" },
      { zh: "A/B 标题建议", en: "A/B title variants" },
    ],
    fields: [
      text(
        "topic",
        "视频主题 / 关键词",
        "Video topic / keyword",
        "例如：敏感肌屏障修护",
        "e.g. repairing a damaged skin barrier",
      ),
      select("type", "标题类型", "Title style", [
        ["How-to", "How-to"],
        ["悬念", "Curiosity"],
        ["数字型", "List"],
        ["对比型", "Comparison"],
      ]),
      text(
        "audience",
        "目标受众",
        "Audience",
        "例如：20–30 岁敏感肌用户",
        "e.g. sensitive-skin viewers aged 20–30",
      ),
    ],
    examples: [
      {
        zh: "我用 7 天修护受损屏障：真正有效的 5 个步骤",
        en: "I Repaired My Skin Barrier in 7 Days—Here’s What Actually Worked",
      },
      {
        zh: "敏感肌别再踩雷：5 个屏障修护误区",
        en: "5 Skin Barrier Mistakes Sensitive Skin Needs to Avoid",
      },
    ],
  },
  {
    slug: "youtube-description-generator",
    category: "creator",
    platform: "YouTube",
    priority: "P1",
    icon: "youtube",
    title: { zh: "YouTube 描述生成器", en: "YouTube Description Generator" },
    description: {
      zh: "生成含关键词、时间戳、CTA 和链接的完整视频描述。",
      en: "Generate complete descriptions with keywords, timestamps, CTA, and links.",
    },
    features: [
      { zh: "前两行 SEO 重点优化", en: "SEO-focused first two lines" },
      { zh: "章节时间戳与社交链接", en: "Chapters and social links" },
      { zh: "CTA 与 Hashtag 建议", en: "CTA and hashtag suggestions" },
    ],
    fields: [
      text("title", "视频标题", "Video title", "输入最终标题", "Enter the final title"),
      area(
        "outline",
        "视频主题 / 大纲",
        "Topic / outline",
        "列出视频结构和重点",
        "Outline the video and key points",
      ),
      area(
        "timestamps",
        "章节时间戳（可选）",
        "Timestamps (optional)",
        "00:00 开场\n01:20 第一步",
        "00:00 Intro\n01:20 Step one",
      ),
    ],
    examples: [
      {
        zh: "本期用真实测试拆解屏障修护方法。\n00:00 开场｜01:20 常见误区｜04:10 修护步骤\n订阅获取更多护肤实测。",
        en: "A real-world guide to repairing your skin barrier.\n00:00 Intro · 01:20 Common mistakes · 04:10 Routine\nSubscribe for more tested skincare advice.",
      },
    ],
  },
  {
    slug: "viral-video-script-generator",
    category: "creative",
    priority: "P0",
    icon: "script",
    title: { zh: "爆款短视频脚本生成器", en: "AI Viral Script Generator" },
    description: {
      zh: "从黄金 3 秒钩子到 CTA，生成完整分镜脚本。",
      en: "Generate a complete storyboard from the first-three-second hook to CTA.",
    },
    features: [
      { zh: "画面、台词、字幕、时长与 BGM", en: "Visuals, dialogue, captions, timing, and BGM" },
      {
        zh: "开箱、种草、剧情、教程、对比模板",
        en: "Unboxing, review, story, tutorial, and comparison templates",
      },
      { zh: "TikTok、Reels、Shorts 平台优化", en: "Optimized for TikTok, Reels, and Shorts" },
    ],
    fields: [
      area(
        "product",
        "产品 / 主题",
        "Product / topic",
        "描述产品、受众和核心卖点",
        "Describe the product, audience, and key value",
      ),
      select("platform", "目标平台", "Target platform", [
        ["TikTok", "TikTok"],
        ["Instagram Reels", "Instagram Reels"],
        ["YouTube Shorts", "YouTube Shorts"],
      ]),
      select("template", "脚本模板", "Script template", [
        ["痛点种草", "Problem-solution"],
        ["开箱测评", "Unboxing review"],
        ["教程干货", "Tutorial"],
        ["对比测评", "Comparison"],
      ]),
    ],
    examples: [
      {
        zh: "0–3s｜特写：卡粉妆面｜台词：‘不是底妆不行，是你的屏障在求救。’\n4–8s｜展示产品质地与使用动作\n9–13s｜前后对比 + 核心卖点\n14–15s｜CTA：保存这套修护方法",
        en: "0–3s · Close-up: patchy makeup · ‘Your foundation isn’t failing—your barrier is asking for help.’\n4–8s · Product texture and application\n9–13s · Before/after + proof\n14–15s · CTA: Save this routine",
      },
    ],
  },
  {
    slug: "product-image-to-video",
    category: "creative",
    priority: "P0",
    icon: "video",
    title: { zh: "商品图转视频", en: "Product Image to Video" },
    description: {
      zh: "将 1–5 张商品图转换为 10–15 秒社媒短视频。",
      en: "Turn 1–5 product images into a 10–15 second social video.",
    },
    features: [
      {
        zh: "3D 旋转、推进、切换与背景替换",
        en: "3D rotation, zoom, transitions, and background replacement",
      },
      { zh: "自动字幕与 BGM", en: "Automatic captions and BGM" },
      { zh: "9:16、1:1、16:9 三种比例", en: "9:16, 1:1, and 16:9 ratios" },
    ],
    fields: [
      file("images", "上传商品图片（1–5 张）", "Upload product images (1–5)"),
      text(
        "sellingPoint",
        "产品名与核心卖点",
        "Product name and key claim",
        "例如：轻盈防晒，12 小时不闷痘",
        "e.g. lightweight SPF, 12-hour comfort",
      ),
      select("ratio", "视频比例", "Aspect ratio", [
        ["9:16 竖屏", "9:16 Portrait"],
        ["1:1 方屏", "1:1 Square"],
        ["16:9 横屏", "16:9 Landscape"],
      ]),
    ],
    examples: [
      {
        zh: "视频已生成：15 秒 · 9:16 · 720P · 含字幕与 BGM",
        en: "Video ready: 15s · 9:16 · 720p · Captions and BGM included",
      },
    ],
  },
  {
    slug: "ai-ad-copy-generator",
    category: "creative",
    priority: "P0",
    icon: "copy",
    title: { zh: "广告文案生成器", en: "AI Ad Copy Generator" },
    description: {
      zh: "为 Meta、Google、TikTok 和 X 生成多版广告文案。",
      en: "Generate ad variants for Meta, Google, TikTok, and X.",
    },
    features: [
      { zh: "主文案、标题、描述与 CTA", en: "Primary text, headline, description, and CTA" },
      {
        zh: "转化、流量、互动、认知目标",
        en: "Conversion, traffic, engagement, and awareness goals",
      },
      { zh: "AIDA、PAS、4C 框架", en: "AIDA, PAS, and 4C frameworks" },
    ],
    fields: [
      area(
        "product",
        "产品信息",
        "Product information",
        "描述产品、卖点和优惠",
        "Describe the product, benefits, and offer",
      ),
      text(
        "audience",
        "目标受众",
        "Target audience",
        "例如：都市敏感肌女性",
        "e.g. urban women with sensitive skin",
      ),
      select("platform", "投放平台", "Ad platform", [
        ["Meta", "Meta"],
        ["Google", "Google"],
        ["TikTok", "TikTok"],
        ["X", "X"],
      ]),
      select("framework", "文案框架", "Copy framework", [
        ["AIDA", "AIDA"],
        ["PAS", "PAS"],
        ["4C", "4C"],
      ]),
    ],
    examples: [
      {
        zh: "主文案：敏感肌不该在防晒和舒适之间二选一。\n标题：轻盈防晒，全天安心\nCTA：立即了解",
        en: "Primary: Sensitive skin shouldn’t have to choose between SPF and comfort.\nHeadline: Weightless protection, all-day calm\nCTA: Learn more",
      },
    ],
  },
  {
    slug: "ai-brief-reviewer",
    category: "creative",
    priority: "P0",
    icon: "review",
    title: { zh: "AI 审稿 / 达人 Brief 审核器", en: "AI Brief Reviewer" },
    description: {
      zh: "检查达人合作 Brief 的完整性、清晰度、创意空间和合规风险。",
      en: "Review creator briefs for completeness, clarity, creative freedom, and compliance.",
    },
    features: [
      { zh: "五大维度百分制评分", en: "Five-dimension score out of 100" },
      { zh: "识别缺失要素与合规风险", en: "Missing-item and compliance detection" },
      { zh: "逐项建议与前后版本对比", en: "Actionable edits and version comparison" },
    ],
    fields: [
      file("briefFile", "上传 Brief", "Upload brief"),
      area(
        "brief",
        "或粘贴 Brief 内容",
        "Or paste brief content",
        "粘贴合作背景、要求、交付和条款",
        "Paste context, requirements, deliverables, and terms",
      ),
    ],
    examples: [
      {
        zh: "综合得分 78/100\n缺失：发布时间、补偿条款、#ad 合规声明\n建议：将“自然展示产品”改为可衡量的 2 个使用场景，同时保留达人表达空间。",
        en: "Overall score 78/100\nMissing: publish date, compensation terms, #ad disclosure\nRecommendation: define two measurable usage scenes while preserving creator voice.",
      },
    ],
  },
  {
    slug: "content-ideas-generator",
    category: "creative",
    priority: "P1",
    icon: "ideas",
    title: { zh: "内容创意生成器", en: "Content Ideas Generator" },
    description: {
      zh: "生成 30 天内容创意日历，并按爆款潜力排序。",
      en: "Generate a 30-day content idea calendar ranked by viral potential.",
    },
    features: [
      {
        zh: "教育、娱乐、互动、促销、UGC 分类",
        en: "Educational, entertaining, interactive, promo, and UGC",
      },
      { zh: "标题、形式、发布时间与标签", en: "Title, format, timing, and hashtags" },
      { zh: "CSV 或日历导出", en: "CSV and calendar export" },
    ],
    fields: [
      text(
        "niche",
        "行业 / Niche",
        "Industry / niche",
        "例如：新锐美妆品牌",
        "e.g. emerging beauty brand",
      ),
      select("platform", "目标平台", "Target platform", [
        ["Instagram", "Instagram"],
        ["TikTok", "TikTok"],
        ["YouTube", "YouTube"],
      ]),
      text(
        "goal",
        "本月目标",
        "Monthly goal",
        "例如：新品种草与收藏增长",
        "e.g. launch awareness and saves",
      ),
    ],
    examples: [
      {
        zh: "Day 01｜教育型｜‘屏障受损的 3 个信号’｜Reels｜19:30｜爆款潜力 92\nDay 02｜UGC 型｜真实用户 7 天记录｜Carousel｜12:00｜爆款潜力 86",
        en: "Day 01 · Educational · ‘3 signs of a damaged barrier’ · Reels · 7:30 PM · Viral score 92\nDay 02 · UGC · Real 7-day diary · Carousel · 12 PM · Viral score 86",
      },
    ],
  },
  {
    slug: "viral-hook-generator",
    category: "creative",
    priority: "P1",
    icon: "hook",
    title: { zh: "爆款钩子生成器", en: "Viral Hook Generator" },
    description: {
      zh: "生成提问、反常识、数字冲击等 20+ 种开场钩子。",
      en: "Generate 20+ question, contrarian, numeric, and story hooks.",
    },
    features: [
      { zh: "六类钩子结构", en: "Six proven hook structures" },
      { zh: "场景与完播率提升建议", en: "Use case and retention direction" },
      { zh: "按平台调整信息密度", en: "Platform-aware intensity" },
    ],
    fields: [
      area(
        "topic",
        "视频主题",
        "Video topic",
        "描述内容、产品与受众痛点",
        "Describe the topic, product, and audience pain point",
      ),
      select("platform", "平台", "Platform", [
        ["TikTok", "TikTok"],
        ["Instagram Reels", "Instagram Reels"],
        ["YouTube", "YouTube"],
      ]),
      select("hookType", "钩子类型", "Hook type", [
        ["智能推荐", "Smart mix"],
        ["反常识", "Contrarian"],
        ["痛点直击", "Pain-first"],
        ["故事悬念", "Story curiosity"],
      ]),
    ],
    examples: [
      {
        zh: "你以为是底妆不服帖，其实第一步就做错了。",
        en: "You think your foundation is the problem—but the mistake happens before makeup.",
      },
      {
        zh: "90% 的人都忽略了屏障受损的这个信号。",
        en: "90% of people miss this early sign of barrier damage.",
      },
    ],
  },
  {
    slug: "influencer-outreach-email-generator",
    category: "brand",
    priority: "P0",
    icon: "mail",
    title: { zh: "达人邀约邮件生成器", en: "Influencer Outreach Email Generator" },
    description: {
      zh: "生成个性化合作邮件或 Instagram DM，并附回复率建议。",
      en: "Create personalized outreach emails or Instagram DMs with reply tips.",
    },
    features: [
      {
        zh: "置换、付费、联盟、品牌大使合作",
        en: "Gifting, paid, affiliate, and ambassador deals",
      },
      { zh: "邮件与 Instagram DM 格式", en: "Email and Instagram DM formats" },
      { zh: "主题行、发送时间与跟进建议", en: "Subject line, timing, and follow-up tips" },
    ],
    fields: [
      area(
        "brand",
        "品牌与产品信息",
        "Brand and product",
        "品牌定位、产品与活动背景",
        "Brand positioning, product, and campaign context",
      ),
      area(
        "creator",
        "达人信息",
        "Creator information",
        "达人名字、近期内容和你欣赏的细节",
        "Creator name, recent work, and a detail you appreciate",
      ),
      select("collab", "合作类型", "Collaboration type", [
        ["付费合作", "Paid partnership"],
        ["产品置换", "Product gifting"],
        ["联盟营销", "Affiliate"],
        ["长期大使", "Ambassador"],
      ]),
      select("format", "输出格式", "Output format", [
        ["邮件", "Email"],
        ["Instagram DM", "Instagram DM"],
      ]),
    ],
    examples: [
      {
        zh: "主题：Nina，想和你一起做一次真实的敏感肌测试\n你好 Nina，我们很喜欢你最近关于屏障修护的 7 天记录……如果你愿意，我可以发一份简短合作说明和预算范围。",
        en: "Subject: Nina, a real skin-barrier test with Influx\nHi Nina, we loved your recent 7-day barrier diary… If you’re open, I can share a concise brief and budget range.",
      },
    ],
  },
  {
    slug: "target-audience-generator",
    category: "brand",
    priority: "P1",
    icon: "audience",
    title: { zh: "目标受众分析生成器", en: "Target Audience Generator" },
    description: {
      zh: "从产品信息生成 2–3 个完整受众 Persona。",
      en: "Turn product information into 2–3 detailed audience personas.",
    },
    features: [
      { zh: "人口、心理与行为特征", en: "Demographic, psychographic, and behavioral traits" },
      { zh: "营销信息与渠道建议", en: "Messaging and channel guidance" },
      { zh: "PDF 或图片导出", en: "PDF or image export" },
    ],
    fields: [
      area(
        "product",
        "产品 / 品牌信息",
        "Product / brand information",
        "描述价格、功能、差异点与市场",
        "Describe price, benefits, differentiation, and market",
      ),
      text("market", "目标市场", "Target market", "例如：美国一二线城市", "e.g. major US cities"),
      text(
        "goal",
        "营销目标",
        "Marketing goal",
        "例如：新品认知与首购",
        "e.g. launch awareness and first purchase",
      ),
    ],
    examples: [
      {
        zh: "Persona 01｜精简护肤实践者｜24–32 岁｜重视成分透明与真实证据｜主要渠道：TikTok / Instagram｜信息主张：少一步，也更安心",
        en: "Persona 01 · Skinimalist practitioner · Age 24–32 · Values ingredient transparency and proof · Channels: TikTok / Instagram · Message: fewer steps, more confidence",
      },
    ],
  },
  {
    slug: "social-media-strategy-generator",
    category: "brand",
    priority: "P1",
    icon: "strategy",
    title: { zh: "社媒策略生成器", en: "Social Media Strategy Generator" },
    description: {
      zh: "生成平台、内容支柱、节奏、KPI 与预算组成的 90 天策略。",
      en: "Build a 90-day plan covering channels, pillars, cadence, KPIs, and budget.",
    },
    features: [
      { zh: "平台选择与内容支柱", en: "Channel mix and content pillars" },
      { zh: "三阶段 90 天规划", en: "Three-phase 90-day plan" },
      { zh: "KPI 与预算分配", en: "KPIs and budget allocation" },
    ],
    fields: [
      area(
        "brand",
        "品牌信息",
        "Brand information",
        "描述行业、产品、受众和竞争优势",
        "Describe category, product, audience, and advantage",
      ),
      select("goal", "核心目标", "Primary goal", [
        ["品牌认知", "Awareness"],
        ["销售转化", "Conversion"],
        ["社群增长", "Community growth"],
      ]),
      text("budget", "月度预算", "Monthly budget", "例如：USD 20,000", "e.g. USD 20,000"),
    ],
    examples: [
      {
        zh: "第 1 月｜建立 3 个内容支柱：真实测评 / 成分教育 / 用户故事\n第 2 月｜测试 6 个创意变量与 2 个达人层级\n第 3 月｜放大高保存率内容，KPI：收藏率 > 4.5%",
        en: "Month 1 · Establish 3 pillars: proof, education, user stories\nMonth 2 · Test 6 creative variables and 2 creator tiers\nMonth 3 · Scale save-driving formats; KPI: save rate > 4.5%",
      },
    ],
  },
  {
    slug: "campaign-roi-calculator",
    category: "brand",
    priority: "P2",
    icon: "roi",
    title: { zh: "营销活动 ROI 计算器", en: "Campaign ROI Calculator" },
    description: {
      zh: "计算 ROI、EMV、CPE 与 CPM，并支持活动对比。",
      en: "Calculate ROI, EMV, CPE, and CPM, with campaign comparison.",
    },
    features: [
      { zh: "达人、制作、投放成本汇总", en: "Creator, production, and media costs" },
      { zh: "ROI、EMV、CPE、CPM 指标", en: "ROI, EMV, CPE, and CPM metrics" },
      { zh: "行业基准与效果报告", en: "Benchmarks and performance report" },
    ],
    fields: [
      number("cost", "活动总投入", "Total campaign cost", "20000"),
      number("revenue", "归因销售额", "Attributed revenue", "68000"),
      number("impressions", "总曝光", "Total impressions", "1600000"),
      number("engagements", "总互动", "Total engagements", "84000"),
    ],
    examples: [
      {
        zh: "ROI 240% · CPM USD 12.50 · CPE USD 0.24 · 高于行业基准",
        en: "ROI 240% · CPM USD 12.50 · CPE USD 0.24 · Above category benchmark",
      },
    ],
  },
  {
    slug: "ugc-rights-request-generator",
    category: "brand",
    priority: "P2",
    icon: "rights",
    title: { zh: "UGC 版权申请生成器", en: "UGC Rights Request Generator" },
    description: {
      zh: "生成包含使用范围、期限、费用与署名要求的授权申请。",
      en: "Create rights requests covering usage, duration, payment, and credit.",
    },
    features: [
      { zh: "转发、广告、官网、包装等场景", en: "Repost, paid media, website, and packaging use" },
      { zh: "范围、期限、付费与署名要素", en: "Scope, term, payment, and attribution" },
      { zh: "中英文版本与最佳实践", en: "Bilingual output and best practices" },
    ],
    fields: [
      text(
        "creator",
        "创作者姓名 / 账号",
        "Creator name / handle",
        "例如：@nina.skin",
        "e.g. @nina.skin",
      ),
      text(
        "content",
        "内容链接或描述",
        "Content URL or description",
        "粘贴链接或描述具体内容",
        "Paste the URL or describe the content",
      ),
      select("usage", "使用场景", "Usage", [
        ["社媒转发", "Organic repost"],
        ["广告投放", "Paid media"],
        ["官网展示", "Website"],
        ["包装印刷", "Packaging"],
      ]),
      text("term", "授权期限", "License term", "例如：6 个月", "e.g. 6 months"),
    ],
    examples: [
      {
        zh: "你好 @nina.skin，我们很喜欢你发布的产品体验内容。想申请在品牌社媒与官网中使用该内容 6 个月，并完整保留署名。请问你是否同意？如有授权费用，也欢迎告知。",
        en: "Hi @nina.skin, we loved your product experience post. We’d like permission to use it on our organic social channels and website for 6 months, with full credit. Please let us know if you agree and whether a usage fee applies.",
      },
    ],
  },
];

export function getFreeTool(slug: string) {
  return freeTools.find((tool) => tool.slug === slug);
}
