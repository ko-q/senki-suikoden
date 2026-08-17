
"use strict";
// 人物顔画像は portrait-assets.js で定義する。

// 固有人物の章共通データ。現在は既存のユニット生成処理へ接続せず、人物データの一元管理だけを先行導入する。
class Character{
  constructor({id,name,reading,short,martial,command,intelligence,charisma,portrait,alias,combatSkill,specialAbility,personality,historical,source}){
    this.id=id;
    this.name=name;
    this.reading=reading;
    this.short=short;
    this.martial=martial;
    this.command=command;
    this.intelligence=intelligence;
    this.charisma=charisma;
    this.portrait=portrait;
    this.alias=alias;
    this.combatSkill=combatSkill;
    this.specialAbility=specialAbility;
    this.personality=personality;
    this.historical=historical;
    this.source=source;
    Object.freeze(this)
  }
}

// Characterインスタンスを人物IDで管理する。Mapの値はすべてCharacterインスタンスとする。
class CharacterManager{
  constructor(characters=[]){
    this.characters=new Map();
    for(const character of characters){
      this.register(character)
    }
  }

  register(character){
    if(!(character instanceof Character)){
      throw new TypeError("Character instance required")
    }
    if(this.characters.has(character.id)){
      throw new Error(`Duplicate character id: ${character.id}`)
    }
    this.characters.set(character.id,character);
    return character
  }

  get(characterId){
    const character=this.characters.get(characterId);
    if(!character){
      throw new Error(`Character not found: ${characterId}`)
    }
    return character
  }

  has(characterId){
    return this.characters.has(characterId)
  }

  getAll(){
    return [...this.characters.values()]
  }

  get size(){
    return this.characters.size
  }
}

// 正本Excel第4.7版に存在し、現行ゲームまたは会話表示で使用する固有人物を登録する。
// v9.7.60時点で92人。人物固有の能力値・技能・性格・読み・顔画像はここを参照元とする。
const CHARACTER_MANAGER=new CharacterManager([
  // 百八星データ
  new Character({
    id:"song_jiang",name:"宋江",reading:"そうこう",short:"宋",martial:32,command:98,intelligence:86,charisma:100,portrait:"song_jiang",
    alias:"呼保義・及時雨",combatSkill:"なし",specialAbility:"なし",personality:"慎重・社交的",historical:"実在確認・古層伝承",source:"第4.6版"
  }),
  new Character({
    id:"lu_junyi",name:"盧俊義",reading:"ろしゅんぎ",short:"盧",martial:100,command:88,intelligence:76,charisma:88,portrait:"lu_junyi",
    alias:"玉麒麟",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"実直・自負",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"wu_yong",name:"呉用",reading:"ごよう",short:"呉",martial:28,command:90,intelligence:100,charisma:84,portrait:"wu_yong",
    alias:"智多星",combatSkill:"なし",specialAbility:"なし",personality:"冷静・策謀的",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"gongsun_sheng",name:"公孫勝",reading:"こうそんしょう",short:"公",martial:55,command:80,intelligence:88,charisma:85,portrait:"gongsun_sheng",
    alias:"入雲龍",combatSkill:"なし",specialAbility:"道術／幻術",personality:"冷静・慎重",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"guan_sheng",name:"関勝",reading:"かんしょう",short:"関",martial:96,command:93,intelligence:82,charisma:88,portrait:"guan_sheng",
    alias:"大刀",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"冷静・忠義",historical:"古層伝承（モデル説あり）",source:"第4.6版"
  }),
  new Character({
    id:"lin_chong",name:"林冲",reading:"りんちゅう",short:"林",martial:97,command:89,intelligence:76,charisma:80,portrait:"lin_chong",
    alias:"豹子頭",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"慎重・忠義",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"qin_ming",name:"秦明",reading:"しんめい",short:"秦",martial:94,command:84,intelligence:48,charisma:68,portrait:"qin_ming",
    alias:"霹靂火",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"短気・勇猛",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"hu_yanzhuo",name:"呼延灼",reading:"こえんしゃく",short:"呼",martial:94,command:94,intelligence:82,charisma:85,portrait:"hu_yanzhuo",
    alias:"双鞭",combatSkill:"騎乗戦闘",specialAbility:"連環馬",personality:"冷静・慎重",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"hua_rong",name:"花栄",reading:"かえい",short:"花",martial:95,command:86,intelligence:80,charisma:91,portrait:"hua_rong",
    alias:"小李広",combatSkill:"騎乗戦闘・弓弩術",specialAbility:"なし",personality:"冷静・忠義",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"chai_jin",name:"柴進",reading:"さいしん",short:"柴",martial:58,command:78,intelligence:86,charisma:98,portrait:"chai_jin",
    alias:"小旋風",combatSkill:"なし",specialAbility:"なし",personality:"温厚・社交的",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"zhu_tong",name:"朱仝",reading:"しゅどう",short:"朱",martial:87,command:84,intelligence:74,charisma:94,portrait:"zhu_tong",
    alias:"美髯公",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"温厚・義侠",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"lu_zhishen",name:"魯智深",reading:"ろちしん",short:"魯",martial:98,command:78,intelligence:64,charisma:96,portrait:"lu_zhishen",
    alias:"花和尚",combatSkill:"なし",specialAbility:"なし",personality:"豪胆・義侠",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"yang_zhi",name:"楊志",reading:"ようし",short:"楊",martial:93,command:85,intelligence:72,charisma:60,portrait:"yang_zhi",
    alias:"青面獣",combatSkill:"騎乗戦闘・弓弩術",specialAbility:"なし",personality:"実直・短気",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"dai_zong",name:"戴宗",reading:"たいそう",short:"戴",martial:52,command:80,intelligence:86,charisma:90,portrait:"dai_zong",
    alias:"神行太保",combatSkill:"なし",specialAbility:"神行法",personality:"機敏・社交的",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"liu_tang",name:"劉唐",reading:"りゅうとう",short:"劉",martial:87,command:55,intelligence:42,charisma:70,portrait:"liu_tang",
    alias:"赤髪鬼",combatSkill:"なし",specialAbility:"なし",personality:"短気・粗野",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"li_kui",name:"李逵",reading:"りき",short:"李",martial:94,command:35,intelligence:15,charisma:62,portrait:"li_kui",
    alias:"黒旋風",combatSkill:"なし",specialAbility:"なし",personality:"軽率・忠義",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"shi_jin",name:"史進",reading:"ししん",short:"史",martial:90,command:60,intelligence:58,charisma:85,portrait:"shi_jin",
    alias:"九紋龍",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・義侠",historical:"古層伝承（モデル説あり）",source:"第4.6版"
  }),
  new Character({
    id:"mu_hong",name:"穆弘",reading:"ぼくこう",short:"穆",martial:85,command:68,intelligence:52,charisma:78,portrait:"mu_hong",
    alias:"没遮攔",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"豪胆・自負",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"lei_heng",name:"雷横",reading:"らいおう",short:"雷",martial:82,command:60,intelligence:50,charisma:70,portrait:"lei_heng",
    alias:"挿翅虎",combatSkill:"なし",specialAbility:"なし",personality:"短気・現実的",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"li_jun",name:"李俊",reading:"りしゅん",short:"俊",martial:86,command:93,intelligence:89,charisma:90,portrait:"li_jun",
    alias:"混江龍",combatSkill:"水中戦",specialAbility:"なし",personality:"冷静・反骨的",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"ruan_xiaoer",name:"阮小二",reading:"げんしょうじ",short:"二",martial:84,command:86,intelligence:70,charisma:82,portrait:"ruan_xiaoer",
    alias:"立地太歳",combatSkill:"水中戦",specialAbility:"なし",personality:"冷静・実直",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"zhang_heng",name:"張横",reading:"ちょうおう",short:"横",martial:80,command:74,intelligence:52,charisma:66,portrait:"zhang_heng",
    alias:"船火児",combatSkill:"水中戦",specialAbility:"なし",personality:"粗野・慎重",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"ruan_xiaowu",name:"阮小五",reading:"げんしょうご",short:"五",martial:83,command:75,intelligence:50,charisma:70,portrait:"ruan_xiaowu",
    alias:"短命二郎",combatSkill:"水中戦",specialAbility:"なし",personality:"豪胆・実直",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"zhang_shun",name:"張順",reading:"ちょうじゅん",short:"順",martial:90,command:84,intelligence:70,charisma:90,portrait:"zhang_shun",
    alias:"浪裏白跳",combatSkill:"水中戦",specialAbility:"なし",personality:"豪胆・機敏",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"ruan_xiaoqi",name:"阮小七",reading:"げんしょうしち",short:"七",martial:84,command:70,intelligence:45,charisma:78,portrait:"ruan_xiaoqi",
    alias:"活閻羅",combatSkill:"水中戦",specialAbility:"なし",personality:"豪胆・反骨的",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"yang_xiong",name:"楊雄",reading:"ようゆう",short:"雄",martial:86,command:65,intelligence:62,charisma:68,portrait:"yang_xiong",
    alias:"病関索",combatSkill:"なし",specialAbility:"なし",personality:"実直・粗野",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"shi_xiu",name:"石秀",reading:"せきしゅう",short:"石",martial:91,command:78,intelligence:88,charisma:88,portrait:"shi_xiu",
    alias:"拚命三郎",combatSkill:"なし",specialAbility:"なし",personality:"機敏・義侠",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"xie_zhen",name:"解珍",reading:"かいちん",short:"珍",martial:85,command:64,intelligence:52,charisma:68,portrait:"xie_zhen",
    alias:"両頭蛇",combatSkill:"弓弩術",specialAbility:"山野適正",personality:"豪胆・実直",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"xie_bao",name:"解宝",reading:"かいほう",short:"宝",martial:84,command:62,intelligence:50,charisma:66,portrait:"xie_bao",
    alias:"双尾蠍",combatSkill:"弓弩術",specialAbility:"山野適正",personality:"豪胆・実直",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"yan_qing",name:"燕青",reading:"えんせい",short:"燕",martial:91,command:72,intelligence:96,charisma:98,portrait:"yan_qing",
    alias:"浪子",combatSkill:"弓弩術",specialAbility:"なし",personality:"冷静・社交的",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"zhu_wu",name:"朱武",reading:"しゅぶ",short:"朱",martial:45,command:90,intelligence:98,charisma:80,portrait:"zhu_wu",
    alias:"神機軍師",combatSkill:"なし",specialAbility:"なし",personality:"冷静・策謀的",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"huang_xin",name:"黄信",reading:"こうしん",short:"黄",martial:82,command:82,intelligence:65,charisma:75,portrait:"huang_xin",
    alias:"鎮三山",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"実直・勇猛",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"sun_li",name:"孫立",reading:"そんりつ",short:"孫",martial:93,command:85,intelligence:83,charisma:82,portrait:"sun_li",
    alias:"病尉遅",combatSkill:"騎乗戦闘・弓弩術",specialAbility:"なし",personality:"冷静・現実的",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"ou_peng",name:"欧鵬",reading:"おうほう",short:"欧",martial:81,command:70,intelligence:53,charisma:72,portrait:"ou_peng",
    alias:"摩雲金翅",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・忠義",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"deng_fei",name:"鄧飛",reading:"とうひ",short:"鄧",martial:80,command:68,intelligence:47,charisma:68,portrait:"deng_fei",
    alias:"火眼狻猊",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"忠義・豪胆",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"yan_shun",name:"燕順",reading:"えんじゅん",short:"燕",martial:82,command:78,intelligence:46,charisma:64,portrait:"yan_shun",
    alias:"錦毛虎",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"粗野・現実的",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"yang_lin",name:"楊林",reading:"ようりん",short:"楊",martial:75,command:65,intelligence:74,charisma:84,portrait:"yang_lin",
    alias:"錦豹子",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"社交的・機敏",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"lu_fang",name:"呂方",reading:"りょほう",short:"呂",martial:84,command:70,intelligence:48,charisma:75,portrait:"lu_fang",
    alias:"小温侯",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"guo_sheng",name:"郭盛",reading:"かくせい",short:"郭",martial:83,command:69,intelligence:47,charisma:75,portrait:"guo_sheng",
    alias:"賽仁貴",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"wang_ying",name:"王英",reading:"おうえい",short:"王",martial:72,command:55,intelligence:22,charisma:38,portrait:"wang_ying",
    alias:"矮脚虎",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"好色・軽率",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"hu_sanniang",name:"扈三娘",reading:"こさんじょう",short:"扈",martial:91,command:70,intelligence:62,charisma:74,portrait:"hu_sanniang",
    alias:"一丈青",combatSkill:"騎乗戦闘・投縄",specialAbility:"なし",personality:"寡黙・勇猛",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"kong_ming",name:"孔明",reading:"こうめい",short:"明",martial:72,command:58,intelligence:34,charisma:58,portrait:"kong_ming",
    alias:"毛頭星",combatSkill:"なし",specialAbility:"なし",personality:"勇猛・粗野",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"kong_liang",name:"孔亮",reading:"こうりょう",short:"亮",martial:70,command:55,intelligence:30,charisma:55,portrait:"kong_liang",
    alias:"独火星",combatSkill:"なし",specialAbility:"なし",personality:"勇猛・粗野",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"ma_lin",name:"馬麟",reading:"ばりん",short:"馬",martial:77,command:68,intelligence:56,charisma:80,portrait:"ma_lin",
    alias:"鉄笛仙",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"社交的・忠義",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"tong_wei",name:"童威",reading:"どうい",short:"威",martial:78,command:76,intelligence:58,charisma:68,portrait:"tong_wei",
    alias:"出洞蛟",combatSkill:"水中戦",specialAbility:"なし",personality:"実直・豪胆",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"tong_meng",name:"童猛",reading:"どうもう",short:"猛",martial:77,command:75,intelligence:56,charisma:67,portrait:"tong_meng",
    alias:"翻江蜃",combatSkill:"水中戦",specialAbility:"なし",personality:"実直・豪胆",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"chen_da",name:"陳達",reading:"ちんたつ",short:"陳",martial:74,command:66,intelligence:38,charisma:61,portrait:"chen_da",
    alias:"跳澗虎",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・粗野",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"yang_chun",name:"楊春",reading:"ようしゅん",short:"楊",martial:72,command:64,intelligence:42,charisma:60,portrait:"yang_chun",
    alias:"白花蛇",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"慎重・実直",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zheng_tianshou",name:"鄭天寿",reading:"ていてんじゅ",short:"鄭",martial:74,command:65,intelligence:43,charisma:70,portrait:"zheng_tianshou",
    alias:"白面郎君",combatSkill:"なし",specialAbility:"なし",personality:"温厚・忠義",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"yue_he",name:"楽和",reading:"がくわ",short:"楽",martial:15,command:35,intelligence:78,charisma:86,portrait:"yue_he",
    alias:"鉄叫子",combatSkill:"なし",specialAbility:"なし",personality:"温厚・社交的",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zou_yuan",name:"鄒淵",reading:"すうえん",short:"淵",martial:73,command:69,intelligence:52,charisma:60,portrait:"zou_yuan",
    alias:"出林龍",combatSkill:"なし",specialAbility:"なし",personality:"豪胆・現実的",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zou_run",name:"鄒潤",reading:"すうじゅん",short:"潤",martial:82,command:69,intelligence:43,charisma:58,portrait:"zou_run",
    alias:"独角龍",combatSkill:"なし",specialAbility:"なし",personality:"短気・豪胆",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"cai_fu",name:"蔡福",reading:"さいふく",short:"蔡",martial:68,command:69,intelligence:74,charisma:80,portrait:"cai_fu",
    alias:"鉄臂膊",combatSkill:"なし",specialAbility:"なし",personality:"慎重・義侠",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"cai_qing",name:"蔡慶",reading:"さいけい",short:"蔡",martial:64,command:62,intelligence:62,charisma:72,portrait:"cai_qing",
    alias:"一枝花",combatSkill:"なし",specialAbility:"なし",personality:"忠義・義侠",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"sun_xin",name:"孫新",reading:"そんしん",short:"新",martial:66,command:70,intelligence:74,charisma:82,portrait:"sun_xin",
    alias:"小尉遅",combatSkill:"なし",specialAbility:"なし",personality:"現実的・社交的",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"gu_dasao",name:"顧大嫂",reading:"こだいそう",short:"顧",martial:82,command:76,intelligence:76,charisma:80,portrait:"gu_dasao",
    alias:"母大虫",combatSkill:"なし",specialAbility:"なし",personality:"豪胆・家族思い",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"bai_sheng",name:"白勝",reading:"はくしょう",short:"白",martial:20,command:15,intelligence:38,charisma:30,portrait:"bai_sheng",
    alias:"白日鼠",combatSkill:"なし",specialAbility:"なし",personality:"小心・軽率",historical:"古層資料未確認",source:"第4.6版"
  }),

  // v9.7.60：第9章で直接定義されていた百八星9人を正本第4.7版から人物管理へ統合。
  new Character({
    id:"xu_ning",name:"徐寧",reading:"じょねい",short:"徐",martial:92,command:84,intelligence:76,charisma:80,portrait:"xu_ning_ch9",
    alias:"金鎗手",combatSkill:"騎乗戦闘・鉤鎌槍",specialAbility:"なし",personality:"慎重・職人気質",historical:"古層伝承（実在未確認）",source:"第4.7版"
  }),
  new Character({
    id:"shan_tinggui",name:"単廷珪",reading:"ぜんていけい",short:"単",martial:79,command:81,intelligence:75,charisma:68,portrait:"shan_tinggui_ch9",
    alias:"聖水将",combatSkill:"騎乗戦闘",specialAbility:"水計",personality:"冷静・慎重",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"wei_dingguo",name:"魏定国",reading:"ぎていこく",short:"魏",martial:80,command:81,intelligence:76,charisma:69,portrait:"wei_dingguo_ch9",
    alias:"神火将",combatSkill:"騎乗戦闘",specialAbility:"火計",personality:"冷静・慎重",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"wu_song",name:"武松",reading:"ぶしょう",short:"武",martial:100,command:73,intelligence:82,charisma:92,portrait:"wu_song_ch9",
    alias:"行者",combatSkill:"徒手格闘",specialAbility:"なし",personality:"豪胆・実直",historical:"古層伝承（実在未確認）",source:"第4.7版"
  }),
  new Character({
    id:"shi_qian",name:"時遷",reading:"じせん",short:"時",martial:50,command:45,intelligence:94,charisma:76,portrait:"shi_qian_ch9",
    alias:"鼓上蚤",combatSkill:"なし",specialAbility:"なし",personality:"機敏・軽率",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"fan_rui",name:"樊瑞",reading:"はんずい",short:"樊",martial:62,command:78,intelligence:80,charisma:72,portrait:"fan_rui_ch9",
    alias:"混世魔王",combatSkill:"なし",specialAbility:"道術／幻術",personality:"自負・慎重",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"xiang_chong",name:"項充",reading:"こうじゅう",short:"項",martial:86,command:74,intelligence:49,charisma:68,portrait:"xiang_chong_ch9",
    alias:"八臂哪吒",combatSkill:"投擲術・盾牌戦闘",specialAbility:"なし",personality:"勇猛・忠義",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"li_gun",name:"李袞",reading:"りこん",short:"袞",martial:85,command:73,intelligence:47,charisma:67,portrait:"li_gun_ch9",
    alias:"飛天大聖",combatSkill:"投擲術・盾牌戦闘",specialAbility:"なし",personality:"勇猛・忠義",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"yu_baosi",name:"郁保四",reading:"いくほうし",short:"郁",martial:73,command:60,intelligence:26,charisma:52,portrait:"yu_baosi_ch9",
    alias:"険道神",combatSkill:"なし",specialAbility:"なし",personality:"寡黙・実直",historical:"古層資料未確認",source:"第4.7版"
  }),

  // 百八星外主要人物
  new Character({
    id:"chao_gai",name:"晁蓋",reading:"ちょうがい",short:"晁",martial:88,command:93,intelligence:78,charisma:96,portrait:"chao_gai",
    alias:"托塔天王",combatSkill:"なし",specialAbility:"なし",personality:"豪胆・義侠",historical:"古層伝承（実在未確認）",source:"第4.6版"
  }),
  new Character({
    id:"liang_zhongshu",name:"梁世傑",reading:"りょうせいけつ",short:"梁",martial:20,command:72,intelligence:76,charisma:58,portrait:"liang_zhongshu",
    alias:"なし",combatSkill:"なし",specialAbility:"なし",personality:"現実的・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"li_cheng",name:"李成",reading:"りせい",short:"李",martial:84,command:83,intelligence:68,charisma:64,portrait:"li_cheng",
    alias:"天王",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"自負・実直",historical:"古層資料未確認（モデル説あり）",source:"第4.6版"
  }),
  new Character({
    id:"wen_da",name:"聞達",reading:"ぶんたつ",short:"聞",martial:82,command:81,intelligence:60,charisma:60,portrait:"wen_da",
    alias:"大刀",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"gao_lian",name:"高廉",reading:"こうれん",short:"廉",martial:58,command:80,intelligence:84,charisma:60,portrait:"gao_lian",
    alias:"なし",combatSkill:"なし",specialAbility:"道術／幻術",personality:"策謀的・残忍",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"dong_chao",name:"董超",reading:"とうちょう",short:"董",martial:48,command:42,intelligence:38,charisma:24,portrait:"dong_chao",
    alias:"なし",combatSkill:"なし",specialAbility:"なし",personality:"小心・現実的",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"xue_ba",name:"薛覇",reading:"せっぱ",short:"薛",martial:52,command:44,intelligence:42,charisma:20,portrait:"xue_ba",
    alias:"なし",combatSkill:"なし",specialAbility:"なし",personality:"残忍・粗野",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"huang_wenbing",name:"黄文炳",reading:"こうぶんぺい",short:"黄",martial:18,command:40,intelligence:88,charisma:15,portrait:"huang_wenbing",
    alias:"黄蜂刺",combatSkill:"なし",specialAbility:"なし",personality:"策謀的・残忍",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"cai_jiuzhifu",name:"蔡得章",reading:"さいとくしょう",short:"蔡",martial:12,command:62,intelligence:58,charisma:35,portrait:"cai_jiuzhifu",
    alias:"なし",combatSkill:"なし",specialAbility:"なし",personality:"自負・現実的",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"li_shishi",name:"李師師",reading:"りしし",short:"師",martial:5,command:32,intelligence:90,charisma:98,portrait:"li_shishi",
    alias:"なし",combatSkill:"なし",specialAbility:"なし",personality:"社交的・機敏",historical:"伝承人物（実在未確定）",source:"第4.6版"
  }),
  new Character({
    id:"luan_tingyu",name:"欒廷玉",reading:"らんていぎょく",short:"欒",martial:97,command:89,intelligence:84,charisma:80,portrait:"luan_tingyu",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"冷静・忠義",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zhu_chaofeng",name:"祝朝奉",reading:"しゅくちょうほう",short:"祝",martial:35,command:85,intelligence:78,charisma:80,portrait:"zhu_chaofeng",
    alias:"なし",combatSkill:"なし",specialAbility:"なし",personality:"慎重・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zhu_long",name:"祝龍",reading:"しゅくりゅう",short:"龍",martial:91,command:80,intelligence:66,charisma:72,portrait:"zhu_long",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zhu_hu",name:"祝虎",reading:"しゅくこ",short:"虎",martial:87,command:74,intelligence:56,charisma:64,portrait:"zhu_hu",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"好戦的・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zhu_biao",name:"祝彪",reading:"しゅくひょう",short:"彪",martial:93,command:78,intelligence:64,charisma:70,portrait:"zhu_biao",
    alias:"なし",combatSkill:"騎乗戦闘・弓弩術",specialAbility:"なし",personality:"勇猛・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zeng_nong",name:"曾弄",reading:"そうろう",short:"曾",martial:40,command:88,intelligence:80,charisma:78,portrait:"zeng_nong",
    alias:"なし",combatSkill:"なし",specialAbility:"なし",personality:"慎重・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zeng_tu",name:"曾塗",reading:"そうと",short:"塗",martial:92,command:82,intelligence:66,charisma:72,portrait:"zeng_tu",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"zeng_mi",name:"曾密",reading:"そうみつ",short:"密",martial:88,command:78,intelligence:62,charisma:66,portrait:"zeng_mi",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・自負",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"zeng_suo",name:"曾索",reading:"そうさく",short:"索",martial:87,command:76,intelligence:58,charisma:64,portrait:"zeng_suo",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"好戦的・自負",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"zeng_kui",name:"曾魁",reading:"そうかい",short:"魁",martial:90,command:80,intelligence:62,charisma:68,portrait:"zeng_kui",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・自負",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"zeng_sheng",name:"曾昇",reading:"そうしょう",short:"昇",martial:91,command:72,intelligence:55,charisma:60,portrait:"zeng_sheng",
    alias:"なし",combatSkill:"騎乗戦闘・投擲術",specialAbility:"なし",personality:"軽率・勇猛",historical:"古層資料未確認",source:"第4.7版"
  }),
  new Character({
    id:"shi_wengong",name:"史文恭",reading:"しぶんきょう",short:"史",martial:100,command:89,intelligence:81,charisma:78,portrait:"shi_wengong",
    alias:"なし",combatSkill:"騎乗戦闘・弓弩術",specialAbility:"なし",personality:"冷静・自負",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"su_ding",name:"蘇定",reading:"そてい",short:"蘇",martial:86,command:82,intelligence:78,charisma:70,portrait:"su_ding",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"冷静・慎重",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"yu_zhi",name:"于直",reading:"うちょく",short:"于",martial:74,command:70,intelligence:46,charisma:54,portrait:"yu_zhi",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・実直",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"wen_wenbao",name:"温文宝",reading:"おんぶんぽう",short:"温",martial:82,command:74,intelligence:52,charisma:58,portrait:"wen_wenbao",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・実直",historical:"古層資料未確認",source:"第4.6版"
  }),
  new Character({
    id:"xue_yuanhui",name:"薛元輝",reading:"せつげんき",short:"薛",martial:85,command:78,intelligence:54,charisma:62,portrait:"xue_yuanhui",
    alias:"なし",combatSkill:"騎乗戦闘",specialAbility:"なし",personality:"勇猛・軽率",historical:"古層資料未確認",source:"第4.6版"
  }),
]);


// ステージ未登場の登録人物。将来の章でそのまま部隊化できる基礎データを保持する。
const REGISTERED_NON_STAGE_CHARACTERS={
  li_shishi:{
    id:"li_shishi",name:"李師師",reading:"りしし",short:"師",team:"player",
    martial:5,command:32,intelligence:90,charisma:98,move:3,facing:"north",portrait:"li_shishi",
    alias:"なし",combatSkill:"なし",specialAbility:"なし",
    personality:"社交的・機敏",historical:"伝承人物（実在未確定）",source:"百八星外主要人物 第4.7版"
  }
};

// 現在は部隊として配置されない人物も、名前指定の会話では固有顔を表示する。
const DIALOGUE_CHARACTER_PROFILES={
  "柴進":{name:"柴進",portrait:"chai_jin",team:"player"},
  "李師師":REGISTERED_NON_STAGE_CHARACTERS.li_shishi
};

// 撹乱・幻術の知略差補正LUT。
// 基準20％、指数1.5、知略差+50で上限98％に到達する。
const STRATEGY_INTELLIGENCE_DIFF_ADJUSTMENT_LUT=Object.freeze([
  0,0,1,1,2,2,3,4,5,6,
  7,8,9,10,12,13,14,15,17,18,
  20,21,23,24,26,28,29,31,33,34,
  36,38,40,42,44,46,48,50,52,54,
  56,58,60,62,64,67,69,71,73,76,
  78,80,83,85,88,90,92,95,97,100,
  103,105,108,110,113,116,118,121,124,126,
  129,132,135,138,140,143,146,149,152,155,
  158,161,164,167,170,173,176,179,182,185,
  188,192,195,198,201,204,208,211,214,217,
  221
]);

// 戦闘演出の時間設定。演出間の同期を崩さないよう一か所で管理する。
const BATTLE_EFFECT_TIMING=Object.freeze({
  MOVE_STEP_MS:80,
  BOW_PROJECTILE_MS:230,
  BOW_SEQUENCE_END_PADDING_MS:250,
  STRATEGY_CAST_FLASH_MS:140,
  UNIT_FLASH_MS:480,
  DAMAGE_POPUP_MS:780,
  CHARGE_DUST_MS:1440,
  NORMAL_ILLUSION_SKULL_MS:720,
  CONFUSION_SYMBOL_MS:720,
  FIRE_TACTIC_BURST_MS:1440,
  WATER_TACTIC_BURST_MS:960,
  WIDE_ILLUSION_OVERLAY_MS:2240
});

// 勝利・敗北の画像素材はscreen-assets.js、専用BGMはaudio-assets.jsで定義する。








const DEFEAT_BGM_START_OFFSET_SECONDS=3.3;
const VICTORY_EFFECT_TIMING=Object.freeze({
  ARMY_FADE_MS:5000,
  TITLE_FADE_MS:5000,
  RAYS_FADE_MS:3000,
  EXIT_MS:420
});
const DEFEAT_EFFECT_TIMING=Object.freeze({
  ARMY_FADE_MS:5000,
  TITLE_FADE_MS:5000,
  EXIT_MS:420
});
















// 撹乱・幻術・火計・水計の画像素材はbattle-effect-assets.js、専用SEはaudio-assets.jsで定義する。

class Unit{
  constructor(o){
    Object.assign(this,o);
    this.hp=o.maxHp;
    this.hasMoved=false;
    this.hasActed=false;
    this.actionCommitted=false;
    this.isAlive=true;
    this.confusedTurns=0;
    this.illusionTurns=0;
    this.strategyUses=o.maxStrategyUses||0;
    this.maxBowUses=(this.combatSkill.includes("弓弩")||this.combatSkill.includes("投擲術"))?2:0;
    this.bowUses=this.maxBowUses;
    const hasChargeSkill=this.combatSkill.includes("騎乗戦闘")||this.combatSkill.includes("騎馬戦闘");
    this.maxChargeUses=hasChargeSkill?(this.command>=100?5:this.command>=90?4:this.command>=80?3:this.command>=70?2:1):0;
    this.chargeUses=this.maxChargeUses
  }
}

/**
 * 戦闘結果に使う再現可能な乱数列を管理する。音響演出用の乱数とは分離する。
 */
class BattleRandom{
  constructor(seed=BattleRandom.createSeed()){
    this.algorithm="xorshift32";
    this.state=1;
    this.reseed(seed)
  }

  static createSeed(){
    if(globalThis.crypto!==undefined&&typeof globalThis.crypto.getRandomValues==="function"){
      const values=new Uint32Array(1);
      globalThis.crypto.getRandomValues(values);
      if(values[0]!==0){return values[0]}
    }
    const timeSeed=(Date.now()^(globalThis.performance?.now?.()||0)*1000)>>>0;
    return timeSeed===0?0x6d2b79f5:timeSeed
  }

  reseed(seed=BattleRandom.createSeed()){
    const normalized=Number(seed)>>>0;
    this.state=normalized===0?0x6d2b79f5:normalized
  }

  next(){
    let value=this.state>>>0;
    value^=value<<13;
    value^=value>>>17;
    value^=value<<5;
    this.state=value>>>0;
    return this.state/0x100000000
  }

  exportState(){
    return {algorithm:this.algorithm,state:this.state>>>0}
  }

  importState(savedState){
    if(savedState===null||typeof savedState!=="object"||savedState.algorithm!==this.algorithm||!Number.isInteger(savedState.state)||savedState.state<1||savedState.state>0xffffffff){
      throw new Error("RANDOM_STATE_INVALID")
    }
    this.state=savedState.state>>>0
  }
}

/**
 * 公開版・保存構造版・戦闘内容版を別々に管理する。
 * GAME_VERSION はHTML公開ごと、SAVE_FORMAT_VERSIONは保存構造変更時、
 * BATTLE_CONTENT_REVISIONは復元結果へ影響する戦闘定義変更時だけ更新する。
 */
const GAME_VERSION="9.7.74";
const SAVE_FORMAT_VERSION=5;
const BATTLE_CONTENT_REVISION="battle-content-9.7.70";

/**
 * ブラウザ保存領域への枠単位の読み書きと世代保護を担当する。
 */
class SaveRepository{
  constructor(storage,namespace,legacyKeys={}){
    this.storage=storage;
    this.namespace=namespace;
    this.legacyKeys=legacyKeys
  }

  normalizeSlotId(slotId){
    if(typeof slotId!=="string"||!/^[a-z0-9_-]{1,40}$/.test(slotId)){
      throw new Error("SAVE_SLOT_ID_INVALID")
    }
    return slotId
  }

  slotKeys(slotId){
    const normalized=this.normalizeSlotId(slotId);
    const base=`${this.namespace}_slot_${normalized}`;
    return {primary:`${base}_primary`,backup:`${base}_backup`,temporary:`${base}_temporary`,lock:`${base}_lock`}
  }

  manifestKey(){
    return `${this.namespace}_manifest`
  }

  manifestLockKey(){
    return `${this.namespace}_manifest_lock`
  }

  revisionFromRaw(raw){
    if(raw===null){return 0}
    try{
      const parsed=JSON.parse(raw);
      if(parsed!==null&&typeof parsed==="object"&&parsed.schema===SAVE_FORMAT_VERSION&&Number.isInteger(parsed.revision)&&parsed.revision>=0){
        return parsed.revision
      }
      if(parsed!==null&&typeof parsed==="object"&&(parsed.schema===1||parsed.schema===2||parsed.schema===3||parsed.schema===4)){
        return 0
      }
    }catch(error){}
    return null
  }

  readSlot(slotId){
    const keys=this.slotKeys(slotId);
    let primary=this.storage.getItem(keys.primary);
    let backup=this.storage.getItem(keys.backup);
    let temporary=this.storage.getItem(keys.temporary);
    let legacy=false;
    if(slotId==="recovery"){
      const legacyPrimary=typeof this.legacyKeys.primary==="string"?this.storage.getItem(this.legacyKeys.primary):null;
      const legacyBackup=typeof this.legacyKeys.backup==="string"?this.storage.getItem(this.legacyKeys.backup):null;
      const legacyTemporary=typeof this.legacyKeys.temporary==="string"?this.storage.getItem(this.legacyKeys.temporary):null;
      if(primary===null&&legacyPrimary!==null){primary=legacyPrimary;legacy=true}
      if(backup===null&&legacyBackup!==null){backup=legacyBackup;legacy=true}
      if(temporary===null&&legacyTemporary!==null){temporary=legacyTemporary;legacy=true}
    }
    return {primary,backup,temporary,legacy,keys}
  }

  peekRevision(slotId){
    return this.revisionFromRaw(this.readSlot(slotId).primary)
  }

  /**
   * revisionが同じ別内容や破損データも区別できるよう、三世代の実データを競合検査値として保持する。
   */
  captureSlotState(slot){
    return {
      primary:slot.primary,
      backup:slot.backup,
      temporary:slot.temporary,
      legacy:slot.legacy===true
    }
  }

  slotMatchesExpected(slot,expectedSlot){
    if(expectedSlot===null||typeof expectedSlot!=="object"){return false}
    return slot.primary===expectedSlot.primary
      &&slot.backup===expectedSlot.backup
      &&slot.temporary===expectedSlot.temporary
      &&slot.legacy===(expectedSlot.legacy===true)
  }

  createOperationId(ownerId){
    const randomPart=globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${ownerId}:${randomPart}`
  }

  /**
   * 同一保存領域を使うタブ同士の書込みを短時間の所有権で直列化する。
   * 異常終了でロックだけが残っても、10秒後には次の正常処理が回収できる。
   */
  acquireStorageLock(lockKey,ownerId,operationId){
    const now=Date.now();
    const currentRaw=this.storage.getItem(lockKey);
    if(currentRaw!==null){
      try{
        const current=JSON.parse(currentRaw);
        if(current!==null&&typeof current==="object"&&typeof current.ownerId==="string"&&Number.isFinite(current.expiresAt)&&current.expiresAt>now){
          throw new Error("SAVE_CONFLICT")
        }
      }catch(error){
        if(error instanceof Error&&error.message==="SAVE_CONFLICT"){throw error}
      }
    }
    const token=JSON.stringify({ownerId,operationId,expiresAt:now+10000});
    this.storage.setItem(lockKey,token);
    if(this.storage.getItem(lockKey)!==token){
      throw new Error("SAVE_CONFLICT")
    }
    return {key:lockKey,token}
  }

  verifyStorageLock(lock){
    if(this.storage.getItem(lock.key)!==lock.token){
      throw new Error("SAVE_CONFLICT")
    }
  }

  releaseStorageLock(lock){
    if(this.storage.getItem(lock.key)===lock.token){
      this.storage.removeItem(lock.key)
    }
  }

  withStorageLock(lockKey,ownerId,operationId,operation){
    const normalizedOwner=typeof ownerId==="string"&&ownerId.length>0?ownerId:"repository";
    const normalizedOperation=typeof operationId==="string"&&operationId.length>0?operationId:this.createOperationId(normalizedOwner);
    const lock=this.acquireStorageLock(lockKey,normalizedOwner,normalizedOperation);
    try{
      return operation(lock,normalizedOwner,normalizedOperation)
    }finally{
      this.releaseStorageLock(lock)
    }
  }

  withSlotLock(slotId,ownerId,operationId,operation){
    const keys=this.slotKeys(slotId);
    return this.withStorageLock(keys.lock,ownerId,operationId,operation)
  }

  readManifest(){
    try{
      const raw=this.storage.getItem(this.manifestKey());
      if(raw===null){return {format:1,slots:{}}}
      const parsed=JSON.parse(raw);
      if(parsed===null||typeof parsed!=="object"||parsed.format!==1||parsed.slots===null||typeof parsed.slots!=="object"){
        return {format:1,slots:{}}
      }
      return parsed
    }catch(error){
      return {format:1,slots:{}}
    }
  }

  updateManifestSlot(slotId,summary,ownerId,operationId){
    this.withStorageLock(this.manifestLockKey(),ownerId,`${operationId}:manifest`,()=>{
      const manifest=this.readManifest();
      manifest.slots[slotId]=summary;
      this.storage.setItem(this.manifestKey(),JSON.stringify(manifest))
    })
  }

  removeManifestSlot(slotId,ownerId,operationId){
    this.withStorageLock(this.manifestLockKey(),ownerId,`${operationId}:manifest`,()=>{
      const manifest=this.readManifest();
      delete manifest.slots[slotId];
      this.storage.setItem(this.manifestKey(),JSON.stringify(manifest))
    })
  }

  /**
   * 枠単位で一時保存・読戻し・世代照合を行い、正常な現行データだけを前回正常データへ退避する。
   */
  writeSlot(slotId,json,{expectedSlot,summary,preserveCurrentAsBackup=true,lockOwnerId,operationId}={}){
    return this.withSlotLock(slotId,lockOwnerId,operationId,(lock,owner,operation)=>{
      const slot=this.readSlot(slotId);
      if(!this.slotMatchesExpected(slot,expectedSlot)){
        throw new Error("SAVE_CONFLICT")
      }

      this.storage.setItem(slot.keys.temporary,json);
      this.verifyStorageLock(lock);
      const afterTemporary=this.readSlot(slotId);
      if(afterTemporary.primary!==slot.primary||afterTemporary.backup!==slot.backup||this.storage.getItem(slot.keys.temporary)!==json){
        throw new Error("SAVE_CONFLICT")
      }

      if(preserveCurrentAsBackup&&slot.primary!==null){
        this.storage.setItem(slot.keys.backup,slot.primary)
      }
      this.verifyStorageLock(lock);
      const expectedBackup=preserveCurrentAsBackup&&slot.primary!==null?slot.primary:slot.backup;
      const beforePrimary=this.readSlot(slotId);
      if(beforePrimary.primary!==slot.primary||beforePrimary.backup!==expectedBackup||this.storage.getItem(slot.keys.temporary)!==json){
        throw new Error("SAVE_CONFLICT")
      }

      this.storage.setItem(slot.keys.primary,json);
      this.verifyStorageLock(lock);
      if(this.storage.getItem(slot.keys.primary)!==json||this.storage.getItem(slot.keys.temporary)!==json){
        throw new Error("SAVE_VERIFY_FAILED")
      }
      this.storage.removeItem(slot.keys.temporary);
      this.verifyStorageLock(lock);
      if(this.storage.getItem(slot.keys.primary)!==json){
        throw new Error("SAVE_VERIFY_FAILED")
      }

      let manifestUpdated=true;
      try{
        this.updateManifestSlot(slotId,summary,owner,operation)
      }catch(error){
        manifestUpdated=false
      }

      if(slot.legacy&&slotId==="recovery"){
        this.removeLegacyRecoveryKeys()
      }
      return {manifestUpdated,slot:this.captureSlotState(this.readSlot(slotId))}
    })
  }

  promoteBackup(slotId,summary,{expectedSlot,lockOwnerId,operationId}={}){
    return this.withSlotLock(slotId,lockOwnerId,operationId,(lock,owner,operation)=>{
      const slot=this.readSlot(slotId);
      if(!this.slotMatchesExpected(slot,expectedSlot)||slot.backup===null){
        throw new Error("SAVE_CONFLICT")
      }
      const sourceRaw=slot.backup;
      this.storage.setItem(slot.keys.temporary,sourceRaw);
      this.verifyStorageLock(lock);
      const beforePrimary=this.readSlot(slotId);
      if(beforePrimary.primary!==slot.primary||beforePrimary.backup!==sourceRaw||this.storage.getItem(slot.keys.temporary)!==sourceRaw){
        throw new Error("SAVE_CONFLICT")
      }
      this.storage.setItem(slot.keys.primary,sourceRaw);
      this.verifyStorageLock(lock);
      if(this.storage.getItem(slot.keys.primary)!==sourceRaw){
        throw new Error("SAVE_VERIFY_FAILED")
      }
      this.storage.removeItem(slot.keys.temporary);
      try{this.updateManifestSlot(slotId,summary,owner,operation)}catch(error){}
      if(slot.legacy&&slotId==="recovery"){
        this.removeLegacyRecoveryKeys()
      }
      return {promoted:true,slot:this.captureSlotState(this.readSlot(slotId))}
    })
  }

  promoteTemporary(slotId,summary,{expectedSlot,lockOwnerId,operationId}={}){
    return this.withSlotLock(slotId,lockOwnerId,operationId,(lock,owner,operation)=>{
      const slot=this.readSlot(slotId);
      if(!this.slotMatchesExpected(slot,expectedSlot)||slot.temporary===null){
        throw new Error("SAVE_CONFLICT")
      }
      const sourceRaw=slot.temporary;
      this.storage.setItem(slot.keys.primary,sourceRaw);
      this.verifyStorageLock(lock);
      if(this.storage.getItem(slot.keys.primary)!==sourceRaw||this.storage.getItem(slot.keys.temporary)!==sourceRaw){
        throw new Error("SAVE_VERIFY_FAILED")
      }
      this.storage.removeItem(slot.keys.temporary);
      try{this.updateManifestSlot(slotId,summary,owner,operation)}catch(error){}
      if(slot.legacy&&slotId==="recovery"){
        this.removeLegacyRecoveryKeys()
      }
      return {promoted:true,slot:this.captureSlotState(this.readSlot(slotId))}
    })
  }

  removeLegacyRecoveryKeys(){
    for(const key of Object.values(this.legacyKeys)){
      if(typeof key==="string"&&key.length>0){this.storage.removeItem(key)}
    }
  }

  removeSlot(slotId,{expectedSlot,force=false,lockOwnerId,operationId}={}){
    return this.withSlotLock(slotId,lockOwnerId,operationId,(lock,owner,operation)=>{
      const slot=this.readSlot(slotId);
      if(!force&&!this.slotMatchesExpected(slot,expectedSlot)){
        throw new Error("SAVE_CONFLICT")
      }
      this.storage.removeItem(slot.keys.primary);
      this.storage.removeItem(slot.keys.backup);
      this.storage.removeItem(slot.keys.temporary);
      this.verifyStorageLock(lock);
      if(slotId==="recovery"){this.removeLegacyRecoveryKeys()}
      try{this.removeManifestSlot(slotId,owner,operation)}catch(error){}
      const current=this.readSlot(slotId);
      if(current.primary!==null||current.backup!==null||current.temporary!==null){
        throw new Error("SAVE_VERIFY_FAILED")
      }
      return {removed:true,slot:this.captureSlotState(current)}
    })
  }

  isPrimaryKeyForSlot(key,slotId){
    if(key===null){return false}
    return key===this.slotKeys(slotId).primary||(slotId==="recovery"&&key===this.legacyKeys.primary)
  }

  slotIdFromPrimaryKey(key){
    if(key===null){return null}
    if(key===this.legacyKeys.primary){return "recovery"}
    const prefix=`${this.namespace}_slot_`;
    const suffix="_primary";
    if(!key.startsWith(prefix)||!key.endsWith(suffix)){return null}
    const slotId=key.slice(prefix.length,-suffix.length);
    try{
      return this.normalizeSlotId(slotId)
    }catch(error){
      return null
    }
  }
}

class SaveCodec{
  constructor(game){
    this.game=game;
    this.currentSchema=SAVE_FORMAT_VERSION;
    this.currentContentRevision=BATTLE_CONTENT_REVISION;
    this.supportedContentRevisions=new Set([
      this.currentContentRevision,
      "battle-content-9.7.57",
      "battle-content-9.7.40",
      "battle-content-9.7.39",
      "battle-content-9.7.38",
      "battle-content-9.7.37",
      "legacy-schema-migration"
    ])
  }

  buildSnapshot({saveKind,slotId,revision,writerId}){
    const snapshot=this.game.buildBattleSnapshot();
    snapshot.saveKind=saveKind;
    snapshot.slotId=slotId;
    snapshot.revision=revision;
    snapshot.writerId=writerId;
    if(saveKind==="manual"&&snapshot.battle!==null&&typeof snapshot.battle==="object"){
      snapshot.battle.logs=Array.isArray(snapshot.battle.logs)
        ?snapshot.battle.logs.slice(-30).map(log=>String(log).slice(0,200))
        :[]
    }
    return snapshot
  }

  normalizeSnapshot(snapshot,expectedSaveKind){
    if(snapshot===null||typeof snapshot!=="object"){
      return {snapshot:null,migrated:false,reason:"SNAPSHOT_MISSING"}
    }
    if(snapshot.schema===this.currentSchema){
      if(typeof snapshot.contentRevision!=="string"||!this.supportedContentRevisions.has(snapshot.contentRevision)){
        return {snapshot:null,migrated:false,reason:"CONTENT_REVISION_UNSUPPORTED"}
      }
      const needsMigration=snapshot.contentRevision!==this.currentContentRevision
        ||Object.prototype.hasOwnProperty.call(snapshot,"currentStage");
      if(!needsMigration){
        return {snapshot,migrated:false,reason:""}
      }
      const migrated=this.game.migrateContentBattleSnapshot(snapshot,expectedSaveKind);
      return migrated===null
        ?{snapshot:null,migrated:false,reason:"CONTENT_MIGRATION_FAILED"}
        :{snapshot:migrated,migrated:true,reason:""}
    }
    if(snapshot.schema===1||snapshot.schema===2||snapshot.schema===3||snapshot.schema===4){
      const migrated=this.game.migrateLegacyBattleSnapshot(snapshot,expectedSaveKind);
      return migrated===null
        ?{snapshot:null,migrated:false,reason:"FORMAT_MIGRATION_FAILED"}
        :{snapshot:migrated,migrated:true,reason:""}
    }
    return {snapshot:null,migrated:false,reason:"SCHEMA_UNSUPPORTED"}
  }

  parseCandidate(raw,expectedSaveKind){
    if(raw===null){return {snapshot:null,valid:false,expired:false,migrated:false,reason:"MISSING"}}
    try{
      const parsed=JSON.parse(raw);
      const normalized=this.normalizeSnapshot(parsed,expectedSaveKind);
      if(normalized.snapshot===null){
        return {snapshot:null,valid:false,expired:false,migrated:normalized.migrated,reason:normalized.reason}
      }
      const validation=this.game.validateBattleSnapshot(normalized.snapshot,expectedSaveKind);
      return {snapshot:normalized.snapshot,migrated:normalized.migrated,...validation}
    }catch(error){
      return {snapshot:null,valid:false,expired:false,migrated:false,reason:"JSON_INVALID"}
    }
  }

  serialize(snapshot){
    return JSON.stringify(snapshot)
  }
}

class SaveService{
  constructor(game,repository,codec,writerId){
    this.game=game;
    this.repository=repository;
    this.codec=codec;
    this.writerId=writerId;
    this.timers=new Map();
    this.pendingSlots=new Set();
    this.observedSlotStates=new Map();
    this.lastSignatures=new Map();
    this.lastSavedAt=new Map();
    this.conflictedSlots=new Set();
    const initialSlot=this.repository.readSlot("recovery");
    this.observeSlotState("recovery",initialSlot)
  }

  createSummary(snapshot,json){
    const stageIndex=this.game.stageIndexFromId(snapshot.stageId);
    const stage=stageIndex>=0?this.game.stages[stageIndex]:null;
    const livingUnits=Array.isArray(snapshot.units)?snapshot.units.filter(unit=>unit!==null&&unit.isAlive===true):[];
    return {
      slotId:snapshot.slotId,
      saveKind:snapshot.saveKind,
      revision:snapshot.revision,
      writerId:snapshot.writerId,
      savedAt:snapshot.savedAt,
      stageId:snapshot.stageId,
      chapterNumber:stage?.chapterNumber||0,
      turn:snapshot.turn,
      phase:snapshot.phase,
      playerUnitCount:livingUnits.filter(unit=>unit.team==="player").length,
      enemyUnitCount:livingUnits.filter(unit=>unit.team==="enemy").length,
      gameVersion:snapshot.gameVersion,
      contentRevision:snapshot.contentRevision,
      sizeBytes:new Blob([json]).size
    }
  }

  observeSlotState(slotId,slot){
    const state=this.repository.captureSlotState(slot);
    this.observedSlotStates.set(slotId,state);
    this.conflictedSlots.delete(slotId);
    if(slotId==="recovery"){this.game.setAutoSaveStopped(false)}
    return state
  }

  synchronizeSlotState(slotId){
    return this.observeSlotState(slotId,this.repository.readSlot(slotId))
  }

  ensureSlotState(slotId){
    if(!this.observedSlotStates.has(slotId)){
      return this.synchronizeSlotState(slotId)
    }
    return this.observedSlotStates.get(slotId)
  }

  createSelectionGuard(raw,source){
    const sourceRaw=source==="primary"?raw.primary:source==="temporary"?raw.temporary:source==="backup"?raw.backup:null;
    return {slotState:this.repository.captureSlotState(raw),source,sourceRaw}
  }

  selectionMatches(raw,guard){
    if(guard===null||typeof guard!=="object"||!this.repository.slotMatchesExpected(raw,guard.slotState)){
      return false
    }
    const sourceRaw=guard.source==="primary"?raw.primary:guard.source==="temporary"?raw.temporary:guard.source==="backup"?raw.backup:null;
    return sourceRaw===guard.sourceRaw
  }

  markSlotConflict(slotId){
    this.cancelTimer(slotId);
    this.pendingSlots.delete(slotId);
    this.conflictedSlots.add(slotId);
    if(slotId==="recovery"){this.game.setAutoSaveStopped(true)}
    this.game.notifySaveConflictOnce()
  }

  parseCandidateForSlot(raw,saveKind,slotId){
    const candidate=this.codec.parseCandidate(raw,saveKind);
    if(candidate.valid&&candidate.snapshot.slotId!==slotId){
      return {snapshot:null,valid:false,expired:false,migrated:false,reason:"SLOT_ID_MISMATCH"}
    }
    return candidate
  }

  /**
   * 枠の内容判定と競合検査用の三世代実データを、同じ一回の読取り結果から確定する。
   */
  inspectSlot(slotId,saveKind="manual"){
    const raw=this.repository.readSlot(slotId);
    this.observeSlotState(slotId,raw);
    const incompatibleReasons=new Set(["CONTENT_REVISION_UNSUPPORTED","SCHEMA_UNSUPPORTED"]);
    const candidates=[
      {source:"primary",candidate:this.parseCandidateForSlot(raw.primary,saveKind,slotId),raw:raw.primary},
      {source:"temporary",candidate:this.parseCandidateForSlot(raw.temporary,saveKind,slotId),raw:raw.temporary},
      {source:"backup",candidate:this.parseCandidateForSlot(raw.backup,saveKind,slotId),raw:raw.backup}
    ];
    for(const item of candidates){
      if(item.candidate.valid){
        const json=this.codec.serialize(item.candidate.snapshot);
        return {
          slotId,
          status:item.source==="primary"?"occupied":item.source,
          source:item.source,
          snapshot:item.candidate.snapshot,
          summary:this.createSummary(item.candidate.snapshot,json),
          guard:this.createSelectionGuard(raw,item.source)
        }
      }
      if(item.raw!==null&&incompatibleReasons.has(item.candidate.reason)){
        return {slotId,status:"incompatible",source:item.source,snapshot:null,summary:null,guard:this.createSelectionGuard(raw,item.source)}
      }
    }
    const hasData=candidates.some(item=>item.raw!==null&&!item.candidate.expired);
    return {slotId,status:hasData?"corrupt":"empty",source:null,snapshot:null,summary:null,guard:this.createSelectionGuard(raw,null)}
  }

  inspectManualSlots(count=20){
    const slots=[];
    for(let index=1;index<=count;index++){
      const slotId=`manual_${String(index).padStart(2,"0")}`;
      slots.push(this.inspectSlot(slotId,"manual"))
    }
    return slots
  }

  requestSave(slotId="recovery",saveKind="recovery",debounceMs=0){
    if(this.conflictedSlots.has(slotId)){
      this.markSlotConflict(slotId);
      return {ok:false,status:"conflict",code:"SAVE_CONFLICT",slotId}
    }
    this.pendingSlots.add(slotId);
    const existingTimer=this.timers.get(slotId)||0;
    if(existingTimer!==0){window.clearTimeout(existingTimer)}
    if(debounceMs>0){
      const timer=window.setTimeout(()=>{
        this.timers.delete(slotId);
        this.flushSave(slotId,saveKind)
      },debounceMs);
      this.timers.set(slotId,timer);
      return {ok:true,status:"pending",code:"SAVE_PENDING",slotId}
    }
    return this.flushSave(slotId,saveKind)
  }

  flushSave(slotId="recovery",saveKind="recovery"){
    if(!this.pendingSlots.has(slotId)){this.pendingSlots.add(slotId)}
    if(saveKind==="manual"&&!this.game.canSaveManualSnapshot()){
      this.pendingSlots.delete(slotId);
      return {ok:false,status:"failed",code:"MANUAL_SAVE_UNAVAILABLE",slotId}
    }
    if(saveKind==="recovery"&&!this.game.canSaveBattleSnapshot()){
      return {ok:true,status:"pending",code:"SAVE_PENDING_UNTIL_STABLE",slotId}
    }
    if(!this.game.validateInteractionState("SaveService.flushSave")){
      return {ok:false,status:"failed",code:"INTERACTION_INVALID",slotId}
    }
    if(this.conflictedSlots.has(slotId)){
      this.markSlotConflict(slotId);
      return {ok:false,status:"conflict",code:"SAVE_CONFLICT",slotId}
    }

    const expectedSlot=this.ensureSlotState(slotId);
    const priorRevisions=[expectedSlot.primary,expectedSlot.temporary,expectedSlot.backup]
      .map(raw=>this.repository.revisionFromRaw(raw))
      .filter(value=>Number.isInteger(value));
    const revision=Math.max(0,...priorRevisions)+1;
    const snapshot=this.codec.buildSnapshot({saveKind,slotId,revision,writerId:this.writerId});
    const validation=this.game.validateBattleSnapshot(snapshot,saveKind);
    if(!validation.valid){
      console.warn(`[戦旗水滸伝] 保存前検査に失敗: ${validation.reason}`);
      return {ok:false,status:"failed",code:validation.reason,slotId}
    }

    try{
      const current=this.repository.readSlot(slotId);
      if(!this.repository.slotMatchesExpected(current,expectedSlot)){
        throw new Error("SAVE_CONFLICT")
      }
      const currentCandidate=this.parseCandidateForSlot(current.primary,saveKind,slotId);
      const signature=JSON.stringify({...snapshot,savedAt:0,revision:0,writerId:""});
      const lastSignature=this.lastSignatures.get(slotId)||"";
      const lastSavedAt=this.lastSavedAt.get(slotId)||0;
      if(saveKind==="recovery"&&signature===lastSignature&&Math.abs(snapshot.savedAt-lastSavedAt)<30000){
        this.pendingSlots.delete(slotId);
        this.game.saveFailureNotified=false;
        this.game.saveConflictNotified=false;
        return {ok:true,status:"saved",code:"SAVE_UNCHANGED",slotId,savedAt:lastSavedAt}
      }
      const json=this.codec.serialize(snapshot);
      const result=this.repository.writeSlot(slotId,json,{
        expectedSlot,
        summary:this.createSummary(snapshot,json),
        preserveCurrentAsBackup:currentCandidate.valid,
        lockOwnerId:this.writerId,
        operationId:this.repository.createOperationId(this.writerId)
      });
      const verified=this.repository.readSlot(slotId);
      if(!this.repository.slotMatchesExpected(verified,result.slot)){
        throw new Error("SAVE_CONFLICT")
      }
      this.observeSlotState(slotId,result.slot);
      this.lastSignatures.set(slotId,signature);
      this.lastSavedAt.set(slotId,snapshot.savedAt);
      this.pendingSlots.delete(slotId);
      this.conflictedSlots.delete(slotId);
      this.game.saveFailureNotified=false;
      this.game.saveConflictNotified=false;
      return {ok:true,status:"saved",code:result.manifestUpdated?"SAVE_OK":"SAVE_OK_MANIFEST_STALE",slotId,savedAt:snapshot.savedAt}
    }catch(error){
      if(error instanceof Error&&error.message==="SAVE_CONFLICT"){
        this.markSlotConflict(slotId);
        return {ok:false,status:"conflict",code:"SAVE_CONFLICT",slotId}
      }
      console.error("[戦旗水滸伝] 戦闘データ保存エラー",error);
      this.game.notifySaveFailureOnce();
      return {ok:false,status:"failed",code:"SAVE_WRITE_FAILED",slotId}
    }
  }

  cancelTimer(slotId){
    const timer=this.timers.get(slotId)||0;
    if(timer!==0){window.clearTimeout(timer)}
    this.timers.delete(slotId)
  }

  clearSlot(slotId="recovery",force=false){
    this.cancelTimer(slotId);
    this.pendingSlots.delete(slotId);
    this.lastSignatures.delete(slotId);
    this.lastSavedAt.delete(slotId);
    try{
      const expectedSlot=this.ensureSlotState(slotId);
      const result=this.repository.removeSlot(slotId,{
        expectedSlot,
        force,
        lockOwnerId:this.writerId,
        operationId:this.repository.createOperationId(this.writerId)
      });
      this.observeSlotState(slotId,result.slot);
      return {ok:true,status:"cleared",code:"SAVE_CLEARED",slotId}
    }catch(error){
      if(error instanceof Error&&error.message==="SAVE_CONFLICT"){
        this.markSlotConflict(slotId);
        return {ok:false,status:"conflict",code:"SAVE_CONFLICT",slotId}
      }
      console.error("[戦旗水滸伝] 戦闘データ削除エラー",error);
      this.game.notifySaveFailureOnce();
      return {ok:false,status:"failed",code:"SAVE_DELETE_FAILED",slotId}
    }
  }

  persistMigratedSnapshot(slotId,saveKind,snapshot,currentRawValid,expectedSlot){
    if(expectedSlot===null||typeof expectedSlot!=="object"){return {ok:false,snapshot:null,slot:null}}
    const priorRevisions=[expectedSlot.primary,expectedSlot.temporary,expectedSlot.backup]
      .map(raw=>this.repository.revisionFromRaw(raw))
      .filter(value=>Number.isInteger(value));
    const migratedSnapshot={...snapshot};
    migratedSnapshot.schema=SAVE_FORMAT_VERSION;
    migratedSnapshot.saveFormatVersion=SAVE_FORMAT_VERSION;
    migratedSnapshot.saveKind=saveKind;
    migratedSnapshot.slotId=slotId;
    migratedSnapshot.revision=Math.max(0,...priorRevisions)+1;
    migratedSnapshot.writerId=this.writerId;
    const validation=this.game.validateBattleSnapshot(migratedSnapshot,saveKind);
    if(!validation.valid){return {ok:false,snapshot:null,slot:null}}
    const current=this.repository.readSlot(slotId);
    if(!this.repository.slotMatchesExpected(current,expectedSlot)){
      throw new Error("SAVE_CONFLICT")
    }
    const json=this.codec.serialize(migratedSnapshot);
    const result=this.repository.writeSlot(slotId,json,{
      expectedSlot,
      summary:this.createSummary(migratedSnapshot,json),
      preserveCurrentAsBackup:currentRawValid,
      lockOwnerId:this.writerId,
      operationId:this.repository.createOperationId(this.writerId)
    });
    this.observeSlotState(slotId,result.slot);
    return {ok:true,snapshot:migratedSnapshot,slot:result.slot}
  }

  readSlot(slotId="recovery",saveKind="recovery",selectionGuard=null){
    const raw=this.repository.readSlot(slotId);
    if(selectionGuard!==null&&!this.selectionMatches(raw,selectionGuard)){
      this.markSlotConflict(slotId);
      return {snapshot:null,status:"conflict",migrated:false}
    }
    let observedSlot=this.observeSlotState(slotId,raw);
    const incompatibleReasons=new Set(["CONTENT_REVISION_UNSUPPORTED","SCHEMA_UNSUPPORTED"]);
    const primary=this.parseCandidateForSlot(raw.primary,saveKind,slotId);
    if(primary.valid){
      let loadedSnapshot=primary.snapshot;
      if(primary.migrated&&saveKind==="recovery"){
        try{
          const migration=this.persistMigratedSnapshot(slotId,saveKind,primary.snapshot,true,observedSlot);
          if(migration.ok){loadedSnapshot=migration.snapshot}
        }catch(error){
          if(error instanceof Error&&error.message==="SAVE_CONFLICT"){
            this.markSlotConflict(slotId);
            return {snapshot:null,status:"conflict",migrated:false}
          }
          this.game.notifySaveFailureOnce()
        }
      }
      return {snapshot:loadedSnapshot,status:"primary",migrated:primary.migrated}
    }
    if(incompatibleReasons.has(primary.reason)){
      this.game.showSaveStatusMessage("この保存データは現在の版では読み込めないため、そのまま保持しました。");
      return {snapshot:null,status:"incompatible",migrated:false}
    }

    const temporary=this.parseCandidateForSlot(raw.temporary,saveKind,slotId);
    if(temporary.valid){
      let loadedSnapshot=temporary.snapshot;
      if(saveKind==="recovery"){
        try{
          const temporaryJson=this.codec.serialize(temporary.snapshot);
          const promotion=this.repository.promoteTemporary(slotId,this.createSummary(temporary.snapshot,temporaryJson),{
            expectedSlot:observedSlot,
            lockOwnerId:this.writerId,
            operationId:this.repository.createOperationId(this.writerId)
          });
          observedSlot=this.observeSlotState(slotId,promotion.slot);
          if(temporary.migrated){
            const migration=this.persistMigratedSnapshot(slotId,saveKind,temporary.snapshot,true,observedSlot);
            if(migration.ok){loadedSnapshot=migration.snapshot}
          }
        }catch(error){
          if(error instanceof Error&&error.message==="SAVE_CONFLICT"){
            this.markSlotConflict(slotId);
            return {snapshot:null,status:"conflict",migrated:false}
          }
          this.game.notifySaveFailureOnce()
        }
      }
      this.game.showSaveStatusMessage(saveKind==="manual"?"中断前に書き込まれた正常な手動セーブを読み込みます。":"中断されていた保存処理の正常データを復元しました。");
      return {snapshot:loadedSnapshot,status:"temporary",migrated:temporary.migrated}
    }
    if(incompatibleReasons.has(temporary.reason)){
      this.game.showSaveStatusMessage("この保存データは現在の版では読み込めないため、そのまま保持しました。");
      return {snapshot:null,status:"incompatible",migrated:false}
    }

    const backup=this.parseCandidateForSlot(raw.backup,saveKind,slotId);
    if(backup.valid){
      let loadedSnapshot=backup.snapshot;
      if(saveKind==="recovery"){
        try{
          const backupJson=this.codec.serialize(backup.snapshot);
          const promotion=this.repository.promoteBackup(slotId,this.createSummary(backup.snapshot,backupJson),{
            expectedSlot:observedSlot,
            lockOwnerId:this.writerId,
            operationId:this.repository.createOperationId(this.writerId)
          });
          observedSlot=this.observeSlotState(slotId,promotion.slot);
          if(backup.migrated){
            const migration=this.persistMigratedSnapshot(slotId,saveKind,backup.snapshot,true,observedSlot);
            if(migration.ok){loadedSnapshot=migration.snapshot}
          }
        }catch(error){
          if(error instanceof Error&&error.message==="SAVE_CONFLICT"){
            this.markSlotConflict(slotId);
            return {snapshot:null,status:"conflict",migrated:false}
          }
          this.game.notifySaveFailureOnce()
        }
      }
      if(saveKind==="manual"){
        this.game.showSaveStatusMessage("最新の手動セーブに問題があるため、前回正常データを読み込みます。")
      }else{
        this.game.notifyRecoveryBackupUsedOnce()
      }
      return {snapshot:loadedSnapshot,status:"backup",migrated:backup.migrated}
    }
    if(incompatibleReasons.has(backup.reason)){
      this.game.showSaveStatusMessage("この保存データは現在の版では読み込めないため、そのまま保持しました。");
      return {snapshot:null,status:"incompatible",migrated:false}
    }

    const hasInvalidData=(raw.primary!==null&&!primary.expired)||(raw.temporary!==null&&!temporary.expired)||(raw.backup!==null&&!backup.expired);
    if(saveKind==="recovery"){
      try{
        const result=this.repository.removeSlot(slotId,{
          expectedSlot:observedSlot,
          lockOwnerId:this.writerId,
          operationId:this.repository.createOperationId(this.writerId)
        });
        this.observeSlotState(slotId,result.slot)
      }catch(error){
        if(error instanceof Error&&error.message==="SAVE_CONFLICT"){
          this.markSlotConflict(slotId);
          return {snapshot:null,status:"conflict",migrated:false}
        }
        this.game.notifySaveFailureOnce()
      }
      if(hasInvalidData){this.game.notifyRecoveryCorruptionOnce()}
    }
    return {snapshot:null,status:hasInvalidData?"corrupt":"missing",migrated:false}
  }

  handleStorageEvent(event){
    const slotId=this.repository.slotIdFromPrimaryKey(event.key);
    if(slotId===null){return}
    if(!this.observedSlotStates.has(slotId)){return}
    const observed=this.observedSlotStates.get(slotId);
    if(event.newValue!==observed.primary){
      this.markSlotConflict(slotId);
      this.game.refreshSaveSlotListIfOpen()
    }
  }
}



class AudioController{
  constructor(){
    this.context=null;this.master=null;this.bgm=null;this.se=null;this.compressor=null;this.titleBgm=null;this.stageSelectBgm=null;this.victoryBgm=null;this.defeatBgm=null;
    this.enabled=true;this.running=false;this.timer=0;this.next=0;this.step=0;this.beat=.36;this.footstepIndex=0;
    this.fireTacticBuffer=null;this.fireTacticLoadingPromise=null;this.fireTacticSource=null;this.fireTacticGainNode=null;this.fireTacticDamageBuffer=null;this.fireTacticDamageLoadingPromise=null;this.fireTacticDamageSource=null;this.waterTacticBuffer=null;this.waterTacticLoadingPromise=null;this.waterTacticSource=null;this.waterTacticGainNode=null;this.waterTacticDamageBuffer=null;this.waterTacticDamageLoadingPromise=null;this.waterTacticDamageSource=null;this.confusionSuccessBuffer=null;this.confusionSuccessLoadingPromise=null;this.confusionSuccessSource=null;this.confusionSuccessPending=false;
    this.titleThemeDataUrl=TITLE_THEME_DATA_URL;this.titleThemeBuffer=null;this.titleThemeLoadingPromise=null;this.titleThemeSource=null;this.titleThemeLoopEnabled=false;this.titleThemeLoopTimer=0;this.titleThemeRequestId=0;this.stageSelectThemeDataUrl=STAGE_SELECT_THEME_DATA_URL;this.stageSelectThemeBuffer=null;this.stageSelectThemeLoadingPromise=null;this.stageSelectThemeSource=null;this.stageSelectThemeLoopEnabled=false;this.stageSelectThemeRequestId=0;this.battleThemeDataUrls=Object.freeze({strategy:BATTLE_THEME_STRATEGY_DATA_URL,ds069:BATTLE_THEME_DS069_DATA_URL,generatedFixed:BATTLE_THEME_GENERATED_FIXED_DATA_URL});this.battleThemeBuffers={strategy:null,ds069:null,generatedFixed:null};this.battleThemeLoadingPromises={strategy:null,ds069:null,generatedFixed:null};this.battleThemeSource=null;this.battleThemeKey=null;this.battleThemeRequestId=0;this.customBattleBgm=null;this.swordClashDataUrl=SWORD_CLASH_DATA_URL;this.swordClashBuffer=null;this.swordClashLoadingPromise=null;this.allyBowDataUrl=ALLY_BOW_DATA_URL;this.enemyBowDataUrl=ENEMY_BOW_DATA_URL;this.allyBowBuffer=null;this.enemyBowBuffer=null;this.allyBowLoadingPromise=null;this.enemyBowLoadingPromise=null;this.illusionSuccessDataUrl=ILLUSION_SUCCESS_DATA_URL;this.illusionSuccessBuffer=null;this.illusionSuccessLoadingPromise=null;this.wideIllusionStartDataUrl=WIDE_ILLUSION_START_DATA_URL;this.wideIllusionStartBuffer=null;this.wideIllusionStartLoadingPromise=null;this.wideIllusionStartSource=null;this.wideIllusionStartPending=false;this.chargeRumbleDataUrl=CHARGE_RUMBLE_DATA_URL;this.chargeRumbleBuffer=null;this.chargeRumbleLoadingPromise=null;this.chargeRumbleSource=null;this.chargeRumblePending=false;this.trapDamageDataUrl=TRAP_DAMAGE_DATA_URL;this.trapDamageBuffer=null;this.trapDamageLoadingPromise=null;this.turnGongDataUrl=TURN_GONG_DATA_URL;this.turnGongBuffer=null;this.turnGongLoadingPromise=null;
    this.victoryThemeBuffer=null;this.victoryThemeLoadingPromise=null;this.victoryThemeSource=null;this.victoryThemeRequestId=0;
    this.defeatThemeBuffer=null;this.defeatThemeLoadingPromise=null;this.defeatThemeSource=null;this.defeatThemeRequestId=0;
    this.melody=[
      293.66,349.23,392.00,440.00,523.25,440.00,392.00,349.23,
      329.63,392.00,440.00,523.25,587.33,523.25,440.00,392.00,
      293.66,349.23,392.00,523.25,659.25,587.33,523.25,440.00,
      392.00,440.00,523.25,587.33,523.25,440.00,392.00,349.23
    ];
    this.ostinato=[146.83,146.83,174.61,146.83,130.81,130.81,164.81,130.81];
    this.roots=[73.42,65.41,58.27,69.30]
  }

  async prepareSeOnly(){
    if(this.context===null){
      const C=window.AudioContext||window.webkitAudioContext;
      this.context=new C();

      this.compressor=this.context.createDynamicsCompressor();
      this.compressor.threshold.value=-18;
      this.compressor.knee.value=18;
      this.compressor.ratio.value=5;
      this.compressor.attack.value=.006;
      this.compressor.release.value=.24;
      this.compressor.connect(this.context.destination);

      this.master=this.context.createGain();
      this.master.gain.value=.88;
      this.master.connect(this.compressor);

      this.bgm=this.context.createGain();
      this.bgm.gain.value=.52;
      this.bgm.connect(this.master);

      this.titleBgm=this.context.createGain();
      this.titleBgm.gain.value=0;
      this.titleBgm.connect(this.master);

      this.stageSelectBgm=this.context.createGain();
      this.stageSelectBgm.gain.value=0;
      this.stageSelectBgm.connect(this.master);

      this.customBattleBgm=this.context.createGain();
      this.customBattleBgm.gain.value=0;
      this.customBattleBgm.connect(this.master);

      this.victoryBgm=this.context.createGain();
      this.victoryBgm.gain.value=0;
      this.victoryBgm.connect(this.master);

      this.defeatBgm=this.context.createGain();
      this.defeatBgm.gain.value=0;
      this.defeatBgm.connect(this.master);

      this.se=this.context.createGain();
      this.se.gain.value=.92;
      this.se.connect(this.master);
    }

    if(this.context.state!=="running"){
      await this.context.resume()
    }

    this.enabled=true;
    this.master.gain.value=.88;

    try{
      await Promise.all([
        this.ensureSwordClashLoaded(),
        this.ensureBowLoaded(false),
        this.ensureBowLoaded(true),
        this.ensureIllusionSuccessLoaded(),
        this.ensureConfusionSuccessLoaded(),
        this.ensureWideIllusionStartLoaded(),
        this.ensureChargeRumbleLoaded(),
        this.ensureTrapDamageLoaded(),
        this.ensureFireTacticLoaded(),
        this.ensureFireTacticDamageLoaded(),
        this.ensureWaterTacticLoaded(),
        this.ensureWaterTacticDamageLoaded(),
        this.ensureTurnGongLoaded(),
        this.ensureVictoryThemeLoaded()
      ])
    }catch(error){}

    // 敗北BGMはタイトル開始などを待たせず、必須SE準備後にバックグラウンドで先行デコードする。
    this.ensureDefeatThemeLoaded().catch(()=>{})
  }

  /**
   * 罠ダメージ専用SEを読み込む。
   * 通常攻撃の被弾音とは分離し、通常罠・妖術罠で共用する。
   */
  async ensureTrapDamageLoaded(){
    if(this.context===null){return null}
    if(this.trapDamageBuffer!==null){return this.trapDamageBuffer}
    if(this.trapDamageLoadingPromise!==null){return this.trapDamageLoadingPromise}

    this.trapDamageLoadingPromise=(async()=>{
      const response=await fetch(this.trapDamageDataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.trapDamageBuffer=decoded;
      return decoded
    })();

    try{
      return await this.trapDamageLoadingPromise
    }finally{
      this.trapDamageLoadingPromise=null
    }
  }

  /**
   * 罠ダメージ専用SEを再生する。
   */
  trapDamage(){
    if(!this.enabled||this.context===null){return}

    if(this.trapDamageBuffer===null){
      this.ensureTrapDamageLoaded()
        .then(buffer=>{
          if(buffer!==null&&this.enabled){this.trapDamage()}
        })
        .catch(()=>{});
      return
    }

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.trapDamageBuffer;
    gain.gain.value=.92;
    source.connect(gain);
    gain.connect(this.se);
    source.start(this.context.currentTime)
  }

  /**
   * 火計発動専用SEを読み込む。
   * 従来の汎用計略発動音とは分離して火計だけで使用する。
   */
  async ensureFireTacticLoaded(){
    if(this.context===null){return null}
    if(this.fireTacticBuffer!==null){return this.fireTacticBuffer}
    if(this.fireTacticLoadingPromise!==null){return this.fireTacticLoadingPromise}

    this.fireTacticLoadingPromise=(async()=>{
      const response=await fetch(FIRE_TACTIC_SE_DATA_URL);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.fireTacticBuffer=decoded;
      return decoded
    })();

    try{
      return await this.fireTacticLoadingPromise
    }finally{
      this.fireTacticLoadingPromise=null
    }
  }

  /**
   * 火計の被害専用SEを読み込む。
   * 赤発光とダメージ数値の開始時に1回だけ使用する。
   */
  async ensureFireTacticDamageLoaded(){
    if(this.context===null){return null}
    if(this.fireTacticDamageBuffer!==null){return this.fireTacticDamageBuffer}
    if(this.fireTacticDamageLoadingPromise!==null){return this.fireTacticDamageLoadingPromise}

    this.fireTacticDamageLoadingPromise=(async()=>{
      const response=await fetch(FIRE_TACTIC_DAMAGE_SE_DATA_URL);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.fireTacticDamageBuffer=decoded;
      return decoded
    })();

    try{
      return await this.fireTacticDamageLoadingPromise
    }finally{
      this.fireTacticDamageLoadingPromise=null
    }
  }

  /**
   * 火計の赤発光＋ダメージ数値に合わせて火炎被害SEを1回だけ再生する。
   */
  fireTacticDamage(){
    if(!this.enabled||this.context===null){return null}

    if(this.fireTacticDamageBuffer===null){
      this.ensureFireTacticDamageLoaded().catch(()=>{});
      return null
    }

    this.stopFireTacticDamage();

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.fireTacticDamageBuffer;
    gain.gain.value=.92;
    source.connect(gain);
    gain.connect(this.se);
    source.onended=()=>{
      if(this.fireTacticDamageSource===source){this.fireTacticDamageSource=null}
    };
    this.fireTacticDamageSource=source;
    source.start(this.context.currentTime);
    return source
  }

  /**
   * 再生中の火計被害SEを停止する。
   * 撹乱成立時の成功SEと重ならないよう、赤発光・ダメージ数値の終了時に呼び出す。
   */
  stopFireTacticDamage(){
    if(this.fireTacticDamageSource===null){return}
    const source=this.fireTacticDamageSource;
    this.fireTacticDamageSource=null;
    try{
      source.stop(this.context!==null?this.context.currentTime:0)
    }catch(error){
      // 既に自然終了している場合は無視する。
    }
  }

  /**
   * 火計の大爆炎エフェクトと同期して専用SEを1回再生する。
   * 画像表示中だけ鳴らし、表示終了時に明示停止できるよう再生元を保持する。
   * @returns {AudioBufferSourceNode|null}
   */
  fireTactic(){
    if(!this.enabled||this.context===null){return null}

    if(this.fireTacticBuffer===null){
      this.ensureFireTacticLoaded().catch(()=>{});
      return null
    }

    this.stopFireTactic();

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.fireTacticBuffer;
    gain.gain.value=.92*1.25;
    source.connect(gain);
    gain.connect(this.se);
    source.onended=()=>{
      if(this.fireTacticSource===source){
        this.fireTacticSource=null;
        this.fireTacticGainNode=null
      }
    };
    this.fireTacticSource=source;
    this.fireTacticGainNode=gain;
    source.start(this.context.currentTime);
    return source
  }

  /**
   * 再生中の火計専用SEを停止する。
   */
  stopFireTactic(){
    if(this.fireTacticSource===null){return}

    const source=this.fireTacticSource;
    this.fireTacticSource=null;
    this.fireTacticGainNode=null;

    try{
      source.stop(this.context!==null?this.context.currentTime:0)
    }catch(error){
      // 既に停止済みでも問題ないため無視する。
    }
  }

  /**
   * 水計発動専用SEを読み込む。
   * 大水しぶき画像の表示中だけ使用する。
   */
  async ensureWaterTacticLoaded(){
    if(this.context===null){return null}
    if(this.waterTacticBuffer!==null){return this.waterTacticBuffer}
    if(this.waterTacticLoadingPromise!==null){return this.waterTacticLoadingPromise}

    this.waterTacticLoadingPromise=(async()=>{
      const response=await fetch(WATER_TACTIC_SE_DATA_URL);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.waterTacticBuffer=decoded;
      return decoded
    })();

    try{
      return await this.waterTacticLoadingPromise
    }finally{
      this.waterTacticLoadingPromise=null
    }
  }

  /**
   * 水計の被害専用SEを読み込む。
   * 水色発光とダメージ数値の開始時に1回だけ使用する。
   */
  async ensureWaterTacticDamageLoaded(){
    if(this.context===null){return null}
    if(this.waterTacticDamageBuffer!==null){return this.waterTacticDamageBuffer}
    if(this.waterTacticDamageLoadingPromise!==null){return this.waterTacticDamageLoadingPromise}

    this.waterTacticDamageLoadingPromise=(async()=>{
      const response=await fetch(WATER_TACTIC_DAMAGE_SE_DATA_URL);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.waterTacticDamageBuffer=decoded;
      return decoded
    })();

    try{
      return await this.waterTacticDamageLoadingPromise
    }finally{
      this.waterTacticDamageLoadingPromise=null
    }
  }

  /**
   * 水計の水色発光＋ダメージ数値に合わせて被害SEを1回だけ再生する。
   */
  waterTacticDamage(){
    if(!this.enabled||this.context===null){return null}

    if(this.waterTacticDamageBuffer===null){
      this.ensureWaterTacticDamageLoaded().catch(()=>{});
      return null
    }

    this.stopWaterTacticDamage();

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.waterTacticDamageBuffer;
    gain.gain.value=.92;
    source.connect(gain);
    gain.connect(this.se);
    source.onended=()=>{
      if(this.waterTacticDamageSource===source){this.waterTacticDamageSource=null}
    };
    this.waterTacticDamageSource=source;
    source.start(this.context.currentTime);
    return source
  }

  /**
   * 再生中の水計被害SEを停止する。
   * 撹乱成立時の成功SEと重ならないよう、水色発光・ダメージ数値の終了時に呼び出す。
   */
  stopWaterTacticDamage(){
    if(this.waterTacticDamageSource===null){return}
    const source=this.waterTacticDamageSource;
    this.waterTacticDamageSource=null;
    try{
      source.stop(this.context!==null?this.context.currentTime:0)
    }catch(error){
      // 既に自然終了している場合は無視する。
    }
  }

  /**
   * 大水しぶきエフェクトと同期して水計専用SEを再生する。
   * 画像終了時に明示停止できるよう再生元を保持する。
   * @returns {AudioBufferSourceNode|null}
   */
  waterTactic(){
    if(!this.enabled||this.context===null){return null}

    if(this.waterTacticBuffer===null){
      this.ensureWaterTacticLoaded().catch(()=>{});
      return null
    }

    this.stopWaterTactic();

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.waterTacticBuffer;
    gain.gain.value=.92*1.25*1.2;
    source.connect(gain);
    gain.connect(this.se);
    source.onended=()=>{
      if(this.waterTacticSource===source){
        this.waterTacticSource=null;
        this.waterTacticGainNode=null
      }
    };
    this.waterTacticSource=source;
    this.waterTacticGainNode=gain;
    source.start(this.context.currentTime);
    return source
  }

  /**
   * 再生中の水計専用SEを停止する。
   */
  stopWaterTactic(){
    if(this.waterTacticSource===null){return}

    const source=this.waterTacticSource;
    this.waterTacticSource=null;
    this.waterTacticGainNode=null;

    try{
      source.stop(this.context!==null?this.context.currentTime:0)
    }catch(error){
      // 既に停止済みでも問題ないため無視する。
    }
  }

  async ensureTurnGongLoaded(){
    if(this.context===null){return null}
    if(this.turnGongBuffer!==null){return this.turnGongBuffer}
    if(this.turnGongLoadingPromise!==null){return this.turnGongLoadingPromise}

    this.turnGongLoadingPromise=(async()=>{
      const response=await fetch(this.turnGongDataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.turnGongBuffer=decoded;
      return decoded
    })();

    try{
      return await this.turnGongLoadingPromise
    }finally{
      this.turnGongLoadingPromise=null
    }
  }

  async ensureChargeRumbleLoaded(){
    if(this.context===null){return null}
    if(this.chargeRumbleBuffer!==null){return this.chargeRumbleBuffer}
    if(this.chargeRumbleLoadingPromise!==null){return this.chargeRumbleLoadingPromise}

    this.chargeRumbleLoadingPromise=(async()=>{
      const response=await fetch(this.chargeRumbleDataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.chargeRumbleBuffer=decoded;
      return decoded
    })();

    try{
      return await this.chargeRumbleLoadingPromise
    }finally{
      this.chargeRumbleLoadingPromise=null
    }
  }

  chargeRumble(){
    if(!this.enabled||this.context===null){return}

    if(this.chargeRumbleBuffer===null){
      this.chargeRumblePending=true;
      this.ensureChargeRumbleLoaded()
        .then(buffer=>{
          if(buffer!==null&&this.enabled&&this.chargeRumblePending){this.chargeRumble()}
        })
        .catch(()=>{this.chargeRumblePending=false});
      return
    }

    this.stopChargeRumble();

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.chargeRumbleBuffer;
    gain.gain.value=1.0;
    source.connect(gain);
    gain.connect(this.se);
    source.onended=()=>{
      if(this.chargeRumbleSource===source){this.chargeRumbleSource=null}
    };
    this.chargeRumbleSource=source;
    source.start(this.context.currentTime)
  }

  /**
   * 再生中または読込待ちの突撃地鳴りSEを停止する。
   */
  stopChargeRumble(){
    this.chargeRumblePending=false;
    if(this.context===null||this.chargeRumbleSource===null){return}
    const source=this.chargeRumbleSource;
    this.chargeRumbleSource=null;
    try{
      source.stop(this.context.currentTime)
    }catch(error){
      // 既に自然終了している場合は無視する。
    }
  }

  async ensureWideIllusionStartLoaded(){
    if(this.context===null){return null}
    if(this.wideIllusionStartBuffer!==null){return this.wideIllusionStartBuffer}
    if(this.wideIllusionStartLoadingPromise!==null){return this.wideIllusionStartLoadingPromise}

    this.wideIllusionStartLoadingPromise=(async()=>{
      const response=await fetch(this.wideIllusionStartDataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.wideIllusionStartBuffer=decoded;
      return decoded
    })();

    try{
      return await this.wideIllusionStartLoadingPromise
    }finally{
      this.wideIllusionStartLoadingPromise=null
    }
  }

  wideIllusionStart(){
    if(!this.enabled||this.context===null){return}

    if(this.wideIllusionStartBuffer===null){
      this.wideIllusionStartPending=true;
      this.ensureWideIllusionStartLoaded()
        .then(buffer=>{
          if(buffer!==null&&this.enabled&&this.wideIllusionStartPending){this.wideIllusionStart()}
        })
        .catch(()=>{this.wideIllusionStartPending=false});
      return
    }

    this.stopWideIllusionStart();

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.wideIllusionStartBuffer;
    gain.gain.value=.92;
    source.connect(gain);
    gain.connect(this.se);
    source.onended=()=>{
      if(this.wideIllusionStartSource===source){this.wideIllusionStartSource=null}
    };
    this.wideIllusionStartSource=source;
    source.start(this.context.currentTime)
  }

  /**
   * 再生中または読込待ちの広域幻術開始SEを停止する。
   */
  stopWideIllusionStart(){
    this.wideIllusionStartPending=false;
    if(this.context===null||this.wideIllusionStartSource===null){return}
    const source=this.wideIllusionStartSource;
    this.wideIllusionStartSource=null;
    try{
      source.stop(this.context.currentTime)
    }catch(error){
      // 既に自然終了している場合は無視する。
    }
  }

  async ensureIllusionSuccessLoaded(){
    if(this.context===null){return null}
    if(this.illusionSuccessBuffer!==null){return this.illusionSuccessBuffer}
    if(this.illusionSuccessLoadingPromise!==null){return this.illusionSuccessLoadingPromise}

    this.illusionSuccessLoadingPromise=(async()=>{
      const response=await fetch(this.illusionSuccessDataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.illusionSuccessBuffer=decoded;
      return decoded
    })();

    try{
      return await this.illusionSuccessLoadingPromise
    }finally{
      this.illusionSuccessLoadingPromise=null
    }
  }

  illusionSuccess(){
    if(!this.enabled||this.context===null){return}

    if(this.illusionSuccessBuffer===null){
      this.ensureIllusionSuccessLoaded()
        .then(buffer=>{
          if(buffer!==null&&this.enabled){this.illusionSuccess()}
        })
        .catch(()=>{});
      return
    }

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.illusionSuccessBuffer;
    gain.gain.value=.92;
    source.connect(gain);
    gain.connect(this.se);
    source.start(this.context.currentTime)
  }

  async ensureBowLoaded(isEnemy=false){
    if(this.context===null){return null}

    const bufferKey=isEnemy?"enemyBowBuffer":"allyBowBuffer";
    const promiseKey=isEnemy?"enemyBowLoadingPromise":"allyBowLoadingPromise";
    const dataUrl=isEnemy?this.enemyBowDataUrl:this.allyBowDataUrl;

    if(this[bufferKey]!==null){return this[bufferKey]}
    if(this[promiseKey]!==null){return this[promiseKey]}

    this[promiseKey]=(async()=>{
      const response=await fetch(dataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this[bufferKey]=decoded;
      return decoded
    })();

    try{
      return await this[promiseKey]
    }finally{
      this[promiseKey]=null
    }
  }

  playBow(isEnemy=false){
    if(!this.enabled||this.context===null){return}

    const buffer=isEnemy?this.enemyBowBuffer:this.allyBowBuffer;
    if(buffer===null){
      this.ensureBowLoaded(isEnemy)
        .then(decoded=>{
          if(decoded!==null&&this.enabled){this.playBow(isEnemy)}
        })
        .catch(()=>{});
      return
    }

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=buffer;
    gain.gain.value=.90;
    source.connect(gain);
    gain.connect(this.se);
    source.start(this.context.currentTime)
  }

  async ensureSwordClashLoaded(){
    if(this.context===null){return null}
    if(this.swordClashBuffer!==null){return this.swordClashBuffer}
    if(this.swordClashLoadingPromise!==null){return this.swordClashLoadingPromise}

    this.swordClashLoadingPromise=(async()=>{
      const response=await fetch(this.swordClashDataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.swordClashBuffer=decoded;
      return decoded
    })();

    try{
      return await this.swordClashLoadingPromise
    }finally{
      this.swordClashLoadingPromise=null
    }
  }

  playSwordClash(delay=0){
    if(!this.enabled||this.context===null){return}

    if(this.swordClashBuffer===null){
      this.ensureSwordClashLoaded()
        .then(buffer=>{
          if(buffer!==null&&this.enabled){this.playSwordClash(delay)}
        })
        .catch(()=>{});
      return
    }

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.swordClashBuffer;
    gain.gain.value=.92;
    source.connect(gain);
    gain.connect(this.se);
    source.start(this.context.currentTime+delay)
  }

  async ensureTitleThemeLoaded(){
    await this.prepareSeOnly();
    if(this.titleThemeBuffer!==null){return this.titleThemeBuffer}
    if(this.titleThemeLoadingPromise!==null){return this.titleThemeLoadingPromise}

    this.titleThemeLoadingPromise=(async()=>{
      const response=await fetch(this.titleThemeDataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.titleThemeBuffer=decoded;
      return decoded
    })();

    try{
      return await this.titleThemeLoadingPromise
    }finally{
      this.titleThemeLoadingPromise=null
    }
  }

  stopTitleTheme(fadeDuration=.45){
    this.titleThemeRequestId++;
    this.titleThemeLoopEnabled=false;
    if(this.titleThemeLoopTimer!==0){
      window.clearTimeout(this.titleThemeLoopTimer);
      this.titleThemeLoopTimer=0
    }
    if(this.titleThemeSource!==null){
      try{this.titleThemeSource.onended=null;this.titleThemeSource.stop()}catch(error){}
      this.titleThemeSource=null
    }
    if(this.context!==null&&this.titleBgm!==null){
      const t=this.context.currentTime;
      this.titleBgm.gain.cancelScheduledValues(t);
      this.titleBgm.gain.setValueAtTime(this.titleBgm.gain.value,t);
      this.titleBgm.gain.linearRampToValueAtTime(.0001,t+fadeDuration)
    }
  }

  async startTitleThemeLoop(delay=0){
    if(!this.enabled){return}
    // 先行中のタイトルBGM要求を無効化してから、この開始要求の世代番号を確定する。
    this.stopTitleTheme(.02);
    const requestId=++this.titleThemeRequestId;
    const buffer=await this.ensureTitleThemeLoaded();
    if(buffer===null||!this.enabled||this.context===null||this.titleBgm===null||requestId!==this.titleThemeRequestId){return}
    this.stopVictoryTheme(.25);
    this.stopDefeatTheme(.25);
    this.titleThemeLoopEnabled=true;
    const t=this.context.currentTime;
    this.titleBgm.gain.cancelScheduledValues(t);
    this.titleBgm.gain.setValueAtTime(.0001,t);
    this.titleBgm.gain.linearRampToValueAtTime(.72,t+.85);
    this.queueTitleTheme(delay)
  }

  queueTitleTheme(delay=0){
    if(!this.enabled||this.context===null||this.titleThemeBuffer===null||!this.titleThemeLoopEnabled||this.titleBgm===null){return}
    const source=this.context.createBufferSource();
    source.buffer=this.titleThemeBuffer;
    source.connect(this.titleBgm);
    source.start(this.context.currentTime+Math.max(0,delay));
    this.titleThemeSource=source;
    source.onended=()=>{
      if(this.titleThemeSource===source){
        this.titleThemeSource=null
      }
      if(!this.titleThemeLoopEnabled){return}
      this.titleThemeLoopTimer=window.setTimeout(()=>{
        this.titleThemeLoopTimer=0;
        this.queueTitleTheme(0)
      },1000)
    }
  }

  setGameplayBgmGain(target,fadeDuration=.35){
    if(this.context===null||this.bgm===null){return}
    const t=this.context.currentTime;
    this.bgm.gain.cancelScheduledValues(t);
    this.bgm.gain.setValueAtTime(Math.max(.0001,this.bgm.gain.value),t);
    this.bgm.gain.linearRampToValueAtTime(Math.max(.0001,target),t+Math.max(.01,fadeDuration))
  }

  async ensureStageSelectThemeLoaded(){
    if(this.context===null){return null}
    if(this.stageSelectThemeBuffer!==null){return this.stageSelectThemeBuffer}
    if(this.stageSelectThemeLoadingPromise!==null){return this.stageSelectThemeLoadingPromise}

    this.stageSelectThemeLoadingPromise=(async()=>{
      const response=await fetch(this.stageSelectThemeDataUrl);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.stageSelectThemeBuffer=decoded;
      return decoded
    })();

    try{
      return await this.stageSelectThemeLoadingPromise
    }finally{
      this.stageSelectThemeLoadingPromise=null
    }
  }

  stopStageSelectTheme(fadeDuration=.40){
    this.stageSelectThemeRequestId++;
    this.stageSelectThemeLoopEnabled=false;
    if(this.context!==null&&this.stageSelectBgm!==null){
      const t=this.context.currentTime;
      this.stageSelectBgm.gain.cancelScheduledValues(t);
      this.stageSelectBgm.gain.setValueAtTime(Math.max(.0001,this.stageSelectBgm.gain.value),t);
      this.stageSelectBgm.gain.linearRampToValueAtTime(.0001,t+Math.max(.01,fadeDuration))
    }
    if(this.stageSelectThemeSource!==null){
      const source=this.stageSelectThemeSource;
      this.stageSelectThemeSource=null;
      source.onended=null;
      try{
        const stopTime=this.context===null?0:this.context.currentTime+Math.max(.02,fadeDuration);
        source.stop(stopTime)
      }catch(error){}
    }
  }

  async startStageSelectThemeLoop(){
    if(!this.enabled){return}
    // ステージ選択へ入った時点で、読み込み途中のタイトルBGM開始要求を先に無効化する。
    this.titleThemeRequestId++;
    // 先行中のステージ選択BGM要求を無効化してから、この開始要求の世代番号を確定する。
    this.stopStageSelectTheme(.02);
    const requestId=++this.stageSelectThemeRequestId;
    await this.prepareSeOnly();
    if(!this.enabled||requestId!==this.stageSelectThemeRequestId){return}
    const buffer=await this.ensureStageSelectThemeLoaded();
    if(buffer===null||!this.enabled||this.context===null||this.stageSelectBgm===null||requestId!==this.stageSelectThemeRequestId){return}

    this.stopVictoryTheme(.25);
    this.stopDefeatTheme(.25);
    this.stopTitleTheme(.25);
    this.stopGeneratedBattleLoop();
    this.setGameplayBgmGain(0,.32);
    this.stopBattleTheme(.32);
    this.stageSelectThemeLoopEnabled=true;

    const source=this.context.createBufferSource();
    source.buffer=buffer;
    source.loop=true;
    source.loopStart=0;
    source.loopEnd=Math.min(30,buffer.duration);
    source.connect(this.stageSelectBgm);

    const t=this.context.currentTime;
    this.stageSelectBgm.gain.cancelScheduledValues(t);
    this.stageSelectBgm.gain.setValueAtTime(.0001,t);
    this.stageSelectBgm.gain.linearRampToValueAtTime(.62,t+.80);
    source.start(t+.02);
    this.stageSelectThemeSource=source;
    source.onended=()=>{
      if(this.stageSelectThemeSource===source){
        this.stageSelectThemeSource=null
      }
    }
  }

  battleThemeKeyForStage(stageIndex){
    const stageNumber=stageIndex+1;
    if(stageNumber%3===0){return "strategy"}
    if(stageNumber%3===2){return "ds069"}
    return "generatedFixed"
  }

  async ensureBattleThemeLoaded(key){
    if(this.context===null||this.battleThemeDataUrls[key]===undefined){return null}
    if(this.battleThemeBuffers[key]!==null){return this.battleThemeBuffers[key]}
    if(this.battleThemeLoadingPromises[key]!==null){return this.battleThemeLoadingPromises[key]}

    this.battleThemeLoadingPromises[key]=(async()=>{
      const response=await fetch(this.battleThemeDataUrls[key]);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.battleThemeBuffers[key]=decoded;
      return decoded
    })();

    try{
      return await this.battleThemeLoadingPromises[key]
    }finally{
      this.battleThemeLoadingPromises[key]=null
    }
  }

  stopGeneratedBattleLoop(){
    if(this.timer!==0){
      window.clearInterval(this.timer);
      this.timer=0
    }
    this.running=false;
    this.step=0
  }

  setCustomBattleBgmGain(target,fadeDuration=.35){
    if(this.context===null||this.customBattleBgm===null){return}
    const t=this.context.currentTime;
    this.customBattleBgm.gain.cancelScheduledValues(t);
    this.customBattleBgm.gain.setValueAtTime(Math.max(.0001,this.customBattleBgm.gain.value),t);
    this.customBattleBgm.gain.linearRampToValueAtTime(Math.max(.0001,target),t+Math.max(.01,fadeDuration))
  }

  stopBattleTheme(fadeDuration=.35){
    this.battleThemeRequestId++;
    this.battleThemeKey=null;
    this.setCustomBattleBgmGain(0,fadeDuration);

    if(this.battleThemeSource!==null){
      const source=this.battleThemeSource;
      this.battleThemeSource=null;
      source.onended=null;
      try{
        const stopTime=this.context===null?0:this.context.currentTime+Math.max(.02,fadeDuration);
        source.stop(stopTime)
      }catch(error){}
    }
  }

  /**
   * 戦闘結果演出の開始時に、通常の戦闘BGMだけを停止する。
   * @param {number} fadeDuration フェードアウト時間（秒）
   */
  stopBattleMusicForResult(fadeDuration=.35){
    this.stopGeneratedBattleLoop();
    this.setGameplayBgmGain(0,fadeDuration);
    this.stopBattleTheme(fadeDuration)
  }

  /**
   * 勝利専用BGMを必要時に一度だけデコードする。
   * @returns {Promise<AudioBuffer|null>} 読み込み済みバッファ
   */
  async ensureVictoryThemeLoaded(){
    if(this.context===null){return null}
    if(this.victoryThemeBuffer!==null){return this.victoryThemeBuffer}
    if(this.victoryThemeLoadingPromise!==null){return this.victoryThemeLoadingPromise}

    this.victoryThemeLoadingPromise=(async()=>{
      const response=await fetch(VICTORY_BGM_DATA_URL);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.victoryThemeBuffer=decoded;
      return decoded
    })();

    try{
      return await this.victoryThemeLoadingPromise
    }finally{
      this.victoryThemeLoadingPromise=null
    }
  }

  /**
   * 再戦・別ステージ・ステージ選択へ移る際に勝利BGMを残さない。
   */
  stopVictoryTheme(fadeDuration=.25){
    this.victoryThemeRequestId++;
    if(this.context!==null&&this.victoryBgm!==null){
      const t=this.context.currentTime;
      this.victoryBgm.gain.cancelScheduledValues(t);
      this.victoryBgm.gain.setValueAtTime(Math.max(.0001,this.victoryBgm.gain.value),t);
      this.victoryBgm.gain.linearRampToValueAtTime(.0001,t+Math.max(.01,fadeDuration))
    }
    if(this.victoryThemeSource!==null){
      const source=this.victoryThemeSource;
      this.victoryThemeSource=null;
      source.onended=null;
      try{
        const stopTime=this.context===null?0:this.context.currentTime+Math.max(.02,fadeDuration);
        source.stop(stopTime)
      }catch(error){}
    }
  }

  /**
   * 勝利演出開始と同時に専用BGMをループなしで一回再生する。
   */
  async startVictoryThemeOnce(){
    if(!this.enabled){return}
    if(this.context===null){await this.prepareSeOnly()}
    if(!this.enabled||this.context===null||this.victoryBgm===null){return}

    this.stopVictoryTheme(.02);
    this.stopDefeatTheme(.02);
    const requestId=++this.victoryThemeRequestId;
    this.stopTitleTheme(.20);
    this.stopStageSelectTheme(.20);
    this.stopGeneratedBattleLoop();
    this.setGameplayBgmGain(0,.35);
    this.stopBattleTheme(.35);

    const buffer=await this.ensureVictoryThemeLoaded();
    if(buffer===null||!this.enabled||requestId!==this.victoryThemeRequestId){return}

    const source=this.context.createBufferSource();
    source.buffer=buffer;
    source.loop=false;
    source.connect(this.victoryBgm);

    const t=this.context.currentTime;
    this.victoryBgm.gain.cancelScheduledValues(t);
    this.victoryBgm.gain.setValueAtTime(.0001,t);
    this.victoryBgm.gain.linearRampToValueAtTime(.62,t+.45);
    source.start(t+.01);
    this.victoryThemeSource=source;
    source.onended=()=>{
      if(this.victoryThemeSource===source){
        this.victoryThemeSource=null;
        const endedAt=this.context.currentTime;
        this.victoryBgm.gain.cancelScheduledValues(endedAt);
        this.victoryBgm.gain.setValueAtTime(0,endedAt)
      }
    }
  }


  /**
   * 敗北専用BGMを必要時に一度だけデコードする。
   * @returns {Promise<AudioBuffer|null>} 読み込み済みバッファ
   */
  async ensureDefeatThemeLoaded(){
    if(this.context===null){return null}
    if(this.defeatThemeBuffer!==null){return this.defeatThemeBuffer}
    if(this.defeatThemeLoadingPromise!==null){return this.defeatThemeLoadingPromise}

    this.defeatThemeLoadingPromise=(async()=>{
      const response=await fetch(DEFEAT_BGM_DATA_URL);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.defeatThemeBuffer=decoded;
      return decoded
    })();

    try{
      return await this.defeatThemeLoadingPromise
    }finally{
      this.defeatThemeLoadingPromise=null
    }
  }

  /**
   * 再戦・別ステージ・ステージ選択へ移る際に敗北BGMを残さない。
   * @param {number} fadeDuration フェードアウト時間（秒）
   */
  stopDefeatTheme(fadeDuration=.25){
    this.defeatThemeRequestId++;
    if(this.context!==null&&this.defeatBgm!==null){
      const t=this.context.currentTime;
      this.defeatBgm.gain.cancelScheduledValues(t);
      this.defeatBgm.gain.setValueAtTime(Math.max(.0001,this.defeatBgm.gain.value),t);
      this.defeatBgm.gain.linearRampToValueAtTime(.0001,t+Math.max(.01,fadeDuration))
    }
    if(this.defeatThemeSource!==null){
      const source=this.defeatThemeSource;
      this.defeatThemeSource=null;
      source.onended=null;
      try{
        const stopTime=this.context===null?0:this.context.currentTime+Math.max(.02,fadeDuration);
        source.stop(stopTime)
      }catch(error){}
    }
  }

  /**
   * 敗北演出開始と同時に専用BGMをループなしで一回再生する。
   */
  async startDefeatThemeOnce(){
    if(!this.enabled){return}
    if(this.context===null){await this.prepareSeOnly()}
    if(!this.enabled||this.context===null||this.defeatBgm===null){return}

    this.stopDefeatTheme(.02);
    this.stopVictoryTheme(.02);
    const requestId=++this.defeatThemeRequestId;
    this.stopTitleTheme(.20);
    this.stopStageSelectTheme(.20);
    this.stopGeneratedBattleLoop();
    this.setGameplayBgmGain(0,.35);
    this.stopBattleTheme(.35);

    const buffer=await this.ensureDefeatThemeLoaded();
    if(buffer===null||!this.enabled||requestId!==this.defeatThemeRequestId){return}

    const source=this.context.createBufferSource();
    source.buffer=buffer;
    source.loop=false;
    source.connect(this.defeatBgm);

    const t=this.context.currentTime;
    this.defeatBgm.gain.cancelScheduledValues(t);
    this.defeatBgm.gain.setValueAtTime(.0001,t);
    this.defeatBgm.gain.linearRampToValueAtTime(.62,t+.45);
    source.start(t+.01,DEFEAT_BGM_START_OFFSET_SECONDS);
    this.defeatThemeSource=source;
    source.onended=()=>{
      if(this.defeatThemeSource===source){
        this.defeatThemeSource=null;
        const endedAt=this.context.currentTime;
        this.defeatBgm.gain.cancelScheduledValues(endedAt);
        this.defeatBgm.gain.setValueAtTime(0,endedAt)
      }
    }
  }

  async startBattleThemeForStage(stageIndex){
    if(!this.enabled){return}
    // 戦闘画面へ入った時点で、読み込み途中のタイトル／ステージ選択BGM開始要求を無効化する。
    this.titleThemeRequestId++;
    this.stageSelectThemeRequestId++;
    await this.prepareSeOnly();

    this.stopVictoryTheme(.30);
    this.stopDefeatTheme(.30);
    const requestId=++this.battleThemeRequestId;
    const key=this.battleThemeKeyForStage(stageIndex);

    this.stopTitleTheme(.25);
    this.stopStageSelectTheme(.40);

    if(key===null){
      this.stopBattleTheme(.25);
      this.setCustomBattleBgmGain(0,.25);
      this.setGameplayBgmGain(.52,.50);
      if(!this.running){
        this.running=true;
        this.loop()
      }
      return
    }

    this.stopGeneratedBattleLoop();
    this.setGameplayBgmGain(0,.32);
    const buffer=await this.ensureBattleThemeLoaded(key);
    if(buffer===null||!this.enabled||this.context===null||this.customBattleBgm===null||requestId!==this.battleThemeRequestId){return}

    if(this.battleThemeSource!==null){
      try{this.battleThemeSource.onended=null;this.battleThemeSource.stop()}catch(error){}
      this.battleThemeSource=null
    }

    const source=this.context.createBufferSource();
    source.buffer=buffer;
    source.loop=true;
    source.loopStart=0;
    source.loopEnd=buffer.duration;
    source.connect(this.customBattleBgm);

    const targetGain=key==="strategy"?.376:.53;
    const t=this.context.currentTime;
    this.customBattleBgm.gain.cancelScheduledValues(t);
    this.customBattleBgm.gain.setValueAtTime(.0001,t);
    this.customBattleBgm.gain.linearRampToValueAtTime(targetGain,t+.65);
    source.start(t+.03);

    this.battleThemeSource=source;
    this.battleThemeKey=key;
    source.onended=()=>{
      if(this.battleThemeSource===source){
        this.battleThemeSource=null;
        this.battleThemeKey=null
      }
    }
  }

  async start(){
    await this.prepareSeOnly();
    this.stopVictoryTheme(.30);
    this.stopDefeatTheme(.30);
    this.battleThemeRequestId++;
    this.stopTitleTheme(.35);
    this.stopStageSelectTheme(.45);
    this.stopBattleTheme(.30);
    this.setCustomBattleBgmGain(0,.30);
    this.setGameplayBgmGain(.52,.55);

    if(!this.running){
      this.running=true;
      this.loop()
    }
  }


  toggle(){
    this.enabled=!this.enabled;
    if(this.master!==null){
      this.master.gain.value=this.enabled?.88:0
    }
    return this.enabled
  }

  loop(){
    this.next=this.context.currentTime+.08;
    this.timer=window.setInterval(()=>{
      if(!this.enabled){return}

      const now=this.context.currentTime;
      if(this.next<now-.12){
        this.next=now+.06
      }

      while(this.next<now+.38){
        const phraseStep=this.step%32;
        const bar=Math.floor(this.step/8)%4;
        const root=this.roots[bar];
        const melody=this.melody[phraseStep];
        const ostinato=this.ostinato[this.step%this.ostinato.length];

        if(this.step%8===0){
          const minorThird=root*Math.pow(2,3/12);
          const fifth=root*Math.pow(2,7/12);
          this.stringNote(root*2,this.next,this.beat*8.15,.058);
          this.stringNote(minorThird*2,this.next,this.beat*8.15,.050);
          this.stringNote(fifth*2,this.next,this.beat*8.15,.050);
          this.cymbal(this.next,.11)
        }

        this.lowString(ostinato,this.next,this.beat*.92,.115);
        this.melodyNote(melody,this.next,this.beat*.88,.105);

        if(this.step%2===0){
          this.brassNote(root*4,this.next,this.beat*.82,.075)
        }

        if(this.step%4===0){
          this.timpani(this.next,root*1.30,.30)
        }else if(this.step%4===2){
          this.snare(this.next,.11)
        }

        if(this.step%8===7){
          this.brassNote(root*5.5,this.next,this.beat*.92,.085)
        }

        this.next+=this.beat;
        this.step++
      }
    },50)
  }

  stringNote(f,t,d,v){
    const filter=this.context.createBiquadFilter();
    const gain=this.context.createGain();
    filter.type="lowpass";filter.frequency.setValueAtTime(1450,t);filter.Q.value=.7;
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.linearRampToValueAtTime(v,t+.22);
    gain.gain.setValueAtTime(v*.82,t+Math.max(.25,d-.45));
    gain.gain.exponentialRampToValueAtTime(.0001,t+d);
    filter.connect(gain);gain.connect(this.bgm);
    [-8,8].forEach(detune=>{
      const o=this.context.createOscillator();o.type="sawtooth";o.frequency.setValueAtTime(f,t);o.detune.value=detune;o.connect(filter);o.start(t);o.stop(t+d+.03)
    })
  }

  lowString(f,t,d,v){
    const o=this.context.createOscillator(),filter=this.context.createBiquadFilter(),g=this.context.createGain();
    o.type="sawtooth";o.frequency.setValueAtTime(f,t);
    filter.type="lowpass";filter.frequency.value=520;
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(filter);filter.connect(g);g.connect(this.bgm);o.start(t);o.stop(t+d+.03)
  }

  brassNote(f,t,d,v){
    const filter=this.context.createBiquadFilter(),g=this.context.createGain();
    filter.type="lowpass";filter.frequency.setValueAtTime(650,t);filter.frequency.linearRampToValueAtTime(2200,t+.10);filter.frequency.exponentialRampToValueAtTime(800,t+d);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.035);g.gain.exponentialRampToValueAtTime(.0001,t+d);
    filter.connect(g);g.connect(this.bgm);
    [0,5,-5].forEach((detune,index)=>{
      const o=this.context.createOscillator();o.type=index===0?"sawtooth":"square";o.frequency.value=f;o.detune.value=detune;o.connect(filter);o.start(t);o.stop(t+d+.03)
    })
  }

  melodyNote(f,t,d,v){
    const g=this.context.createGain(),filter=this.context.createBiquadFilter();
    filter.type="lowpass";filter.frequency.value=2600;
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+d);
    filter.connect(g);g.connect(this.bgm);
    const a=this.context.createOscillator(),b=this.context.createOscillator();
    a.type="triangle";a.frequency.value=f;
    b.type="sawtooth";b.frequency.value=f;b.detune.value=6;
    a.connect(filter);b.connect(filter);a.start(t);b.start(t);a.stop(t+d+.03);b.stop(t+d+.03)
  }

  timpani(t,f,v){
    const o=this.context.createOscillator(),g=this.context.createGain();
    o.type="sine";o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(Math.max(38,f*.46),t+.34);
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.42);
    o.connect(g);g.connect(this.bgm);o.start(t);o.stop(t+.44)
  }

  noiseBuffer(duration){
    const length=Math.max(1,Math.floor(this.context.sampleRate*duration));
    const buffer=this.context.createBuffer(1,length,this.context.sampleRate);
    const data=buffer.getChannelData(0);
    for(let i=0;i<length;i++){
      data[i]=(Math.random()*2-1)*(1-i/length)
    }
    return buffer
  }

  snare(t,v){
    const source=this.context.createBufferSource(),filter=this.context.createBiquadFilter(),g=this.context.createGain();
    source.buffer=this.noiseBuffer(.16);filter.type="highpass";filter.frequency.value=1250;
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.16);
    source.connect(filter);filter.connect(g);g.connect(this.bgm);source.start(t)
  }

  cymbal(t,v){
    const source=this.context.createBufferSource(),filter=this.context.createBiquadFilter(),g=this.context.createGain();
    source.buffer=this.noiseBuffer(.95);filter.type="highpass";filter.frequency.value=4300;
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.90);
    source.connect(filter);filter.connect(g);g.connect(this.bgm);source.start(t)
  }

  tone(f,d,type="triangle",v=.28,delay=0){
    if(!this.enabled||this.context===null){return}
    const t=this.context.currentTime+delay,o=this.context.createOscillator(),g=this.context.createGain();
    o.type=type;o.frequency.value=f;
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(g);g.connect(this.se);o.start(t);o.stop(t+d+.03)
  }

  duckBgm(duration=.36){
    if(!this.enabled||this.context===null||this.bgm===null){return}
    const t=this.context.currentTime;
    this.bgm.gain.cancelScheduledValues(t);
    this.bgm.gain.setValueAtTime(this.bgm.gain.value,t);
    this.bgm.gain.linearRampToValueAtTime(.16,t+.018);
    this.bgm.gain.linearRampToValueAtTime(.52,t+duration)
  }

  select(){this.tone(620,.06,"square",.18);this.tone(840,.07,"triangle",.16,.045)}

  button(){
    if(!this.enabled||this.context===null){return}
    const t=this.context.currentTime;
    const click=this.context.createBufferSource();
    const filter=this.context.createBiquadFilter();
    const gain=this.context.createGain();
    click.buffer=this.noiseBuffer(.045);
    filter.type="bandpass";
    filter.frequency.setValueAtTime(1450,t);
    filter.Q.value=1.2;
    gain.gain.setValueAtTime(.24,t);
    gain.gain.exponentialRampToValueAtTime(.0001,t+.045);
    click.connect(filter);
    filter.connect(gain);
    gain.connect(this.se);
    click.start(t);
    this.tone(510,.045,"triangle",.11,0)
  }

  move(){
    if(!this.enabled||this.context===null){return}
    const t=this.context.currentTime;
    const variation=this.footstepIndex%3;
    this.footstepIndex++;
    this.duckBgm(.12);

    const source=this.context.createBufferSource();
    const bandpass=this.context.createBiquadFilter();
    const highpass=this.context.createBiquadFilter();
    const gain=this.context.createGain();

    source.buffer=this.noiseBuffer(.105);
    bandpass.type="bandpass";
    bandpass.frequency.setValueAtTime(1450+variation*120,t);
    bandpass.frequency.exponentialRampToValueAtTime(520+variation*45,t+.095);
    bandpass.Q.value=.58;
    highpass.type="highpass";
    highpass.frequency.value=260;
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.linearRampToValueAtTime(.42,t+.004);
    gain.gain.exponentialRampToValueAtTime(.0001,t+.105);

    source.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(gain);
    gain.connect(this.se);
    source.start(t);

    const body=this.context.createOscillator();
    const bodyGain=this.context.createGain();
    body.type="triangle";
    body.frequency.setValueAtTime(185+variation*12,t);
    body.frequency.exponentialRampToValueAtTime(105,t+.075);
    bodyGain.gain.setValueAtTime(.11,t);
    bodyGain.gain.exponentialRampToValueAtTime(.0001,t+.082);
    body.connect(bodyGain);
    bodyGain.connect(this.se);
    body.start(t);
    body.stop(t+.09)
  }

  strategyCast(){
    if(!this.enabled||this.context===null){return}
    const t=this.context.currentTime;
    this.duckBgm(1.05);

    const sweep=this.context.createOscillator();
    const filter=this.context.createBiquadFilter();
    const gain=this.context.createGain();
    sweep.type="sawtooth";
    sweep.frequency.setValueAtTime(440,t);
    sweep.frequency.exponentialRampToValueAtTime(92,t+.82);
    filter.type="lowpass";
    filter.frequency.setValueAtTime(2100,t);
    filter.frequency.exponentialRampToValueAtTime(420,t+.82);
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.linearRampToValueAtTime(.24,t+.045);
    gain.gain.exponentialRampToValueAtTime(.0001,t+.86);
    sweep.connect(filter);
    filter.connect(gain);
    gain.connect(this.se);
    sweep.start(t);
    sweep.stop(t+.90);

    [392,329.63,261.63,196].forEach((frequency,index)=>{
      this.tone(frequency,.32,"triangle",.17,index*.085)
    });

    const whisper=this.context.createBufferSource();
    const whisperFilter=this.context.createBiquadFilter();
    const whisperGain=this.context.createGain();
    whisper.buffer=this.noiseBuffer(.72);
    whisperFilter.type="bandpass";
    whisperFilter.frequency.setValueAtTime(2700,t);
    whisperFilter.frequency.exponentialRampToValueAtTime(720,t+.70);
    whisperFilter.Q.value=1.1;
    whisperGain.gain.setValueAtTime(.0001,t);
    whisperGain.gain.linearRampToValueAtTime(.18,t+.08);
    whisperGain.gain.exponentialRampToValueAtTime(.0001,t+.72);
    whisper.connect(whisperFilter);
    whisperFilter.connect(whisperGain);
    whisperGain.connect(this.se);
    whisper.start(t)
  }

  illusionCast(){
    if(!this.enabled||this.context===null){return}
    const t=this.context.currentTime;
    this.duckBgm(1.35);

    const bus=this.context.createGain();
    const filter=this.context.createBiquadFilter();
    bus.gain.value=.72;
    filter.type="bandpass";
    filter.frequency.setValueAtTime(1850,t);
    filter.frequency.exponentialRampToValueAtTime(430,t+1.20);
    filter.Q.value=.78;
    bus.connect(filter);
    filter.connect(this.se);

    [[246.94,-18],[261.63,18],[369.99,-9],[523.25,11]].forEach(([frequency,detune],index)=>{
      const oscillator=this.context.createOscillator();
      const gain=this.context.createGain();
      oscillator.type=index<2?"sawtooth":"triangle";
      oscillator.frequency.setValueAtTime(frequency,t);
      oscillator.frequency.exponentialRampToValueAtTime(frequency*.54,t+1.18);
      oscillator.detune.setValueAtTime(detune,t);
      oscillator.detune.linearRampToValueAtTime(-detune,t+1.18);
      gain.gain.setValueAtTime(.0001,t);
      gain.gain.linearRampToValueAtTime(.20/(1+index*.24),t+.055+index*.018);
      gain.gain.exponentialRampToValueAtTime(.0001,t+1.18);
      oscillator.connect(gain);
      gain.connect(bus);
      oscillator.start(t);
      oscillator.stop(t+1.22)
    });

    const breath=this.context.createBufferSource();
    const breathFilter=this.context.createBiquadFilter();
    const breathGain=this.context.createGain();
    breath.buffer=this.noiseBuffer(1.08);
    breathFilter.type="bandpass";
    breathFilter.frequency.setValueAtTime(3400,t);
    breathFilter.frequency.exponentialRampToValueAtTime(530,t+1.04);
    breathFilter.Q.value=.65;
    breathGain.gain.setValueAtTime(.0001,t);
    breathGain.gain.linearRampToValueAtTime(.24,t+.11);
    breathGain.gain.exponentialRampToValueAtTime(.0001,t+1.08);
    breath.connect(breathFilter);
    breathFilter.connect(breathGain);
    breathGain.connect(this.se);
    breath.start(t);

    this.tone(1046.50,.55,"sine",.14,.10);
    this.tone(783.99,.70,"sine",.12,.27);
    this.tone(523.25,.86,"sine",.11,.43)
  }

  confirm(){this.tone(392,.08,"triangle",.22);this.tone(587.33,.12,"triangle",.22,.07)}

  /**
   * 撹乱成立専用SE「8bit_magic1.mp3」を読み込む。
   * 計略の実行音とは分離し、黄色発光＋「？」／「！」が出る成功時だけ使用する。
   */
  async ensureConfusionSuccessLoaded(){
    if(this.context===null){return null}
    if(this.confusionSuccessBuffer!==null){return this.confusionSuccessBuffer}
    if(this.confusionSuccessLoadingPromise!==null){return this.confusionSuccessLoadingPromise}

    this.confusionSuccessLoadingPromise=(async()=>{
      const response=await fetch(CONFUSION_SUCCESS_SE_DATA_URL);
      const arrayBuffer=await response.arrayBuffer();
      const decoded=await this.context.decodeAudioData(arrayBuffer.slice(0));
      this.confusionSuccessBuffer=decoded;
      return decoded
    })();

    try{
      return await this.confusionSuccessLoadingPromise
    }finally{
      this.confusionSuccessLoadingPromise=null
    }
  }

  /**
   * 撹乱が実際に成立した瞬間だけ専用成功SEを再生する。
   * 4秒級の音源が連続成立で重複しないよう、前の成功SEが残っていれば新しい成功時に停止する。
   */
  confusionSuccess(){
    if(!this.enabled||this.context===null){return}

    if(this.confusionSuccessBuffer===null){
      // 読み込み中に見た目エフェクトが終わった場合、遅れてSEだけ鳴り始めないよう保留状態を管理する。
      this.confusionSuccessPending=true;
      this.ensureConfusionSuccessLoaded()
        .then(buffer=>{
          if(buffer!==null&&this.enabled&&this.confusionSuccessPending){
            this.confusionSuccessPending=false;
            this.confusionSuccess()
          }
        })
        .catch(()=>{
          this.confusionSuccessPending=false
        });
      return
    }

    this.confusionSuccessPending=false;
    if(this.confusionSuccessSource!==null){
      const previousSource=this.confusionSuccessSource;
      this.confusionSuccessSource=null;
      try{
        previousSource.stop(this.context.currentTime)
      }catch(error){
        // 既に自然終了している場合は無視する。
      }
    }

    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.confusionSuccessBuffer;
    gain.gain.value=.92;
    source.connect(gain);
    gain.connect(this.se);
    source.onended=()=>{
      if(this.confusionSuccessSource===source){this.confusionSuccessSource=null}
    };
    this.confusionSuccessSource=source;
    source.start(this.context.currentTime)
  }

  /**
   * 撹乱成功の見た目エフェクト完了時に専用SEを停止する。
   * 音源読込待ちも同時にキャンセルし、演出終了後の遅延再生を防ぐ。
   */
  stopConfusionSuccess(){
    this.confusionSuccessPending=false;
    if(this.context===null||this.confusionSuccessSource===null){return}
    const source=this.confusionSuccessSource;
    this.confusionSuccessSource=null;
    try{
      source.stop(this.context.currentTime)
    }catch(error){
      // 既に自然終了している場合は無視する。
    }
  }

  /**
   * 戦闘画面から持ち越してはいけない長めの一時SEをまとめて停止する。
   * 全SEの共通管理へは拡張せず、既存の個別停止機構を持つ演出音だけを対象とする。
   */
  stopBattleTransientAudio(){
    this.stopFireTactic();
    this.stopFireTacticDamage();
    this.stopWaterTactic();
    this.stopWaterTacticDamage();
    this.stopConfusionSuccess();
    this.stopChargeRumble();
    this.stopWideIllusionStart()
  }

  battleCry(){
    if(!this.enabled||this.context===null){return}

    const t=this.context.currentTime;
    this.vocalSyllable(t,195,150,.22,[520,1850,2850]);
    this.vocalSyllable(t+.20,165,112,.34,[820,1250,2650]);
    this.breathNoise(t,.58,.20)
  }

  vocalSyllable(t,startFrequency,endFrequency,duration,formants){
    const carrier=this.context.createOscillator();
    const carrierGain=this.context.createGain();
    carrier.type="sawtooth";
    carrier.frequency.setValueAtTime(startFrequency,t);
    carrier.frequency.exponentialRampToValueAtTime(endFrequency,t+duration);
    carrierGain.gain.setValueAtTime(.0001,t);
    carrierGain.gain.linearRampToValueAtTime(.34,t+.025);
    carrierGain.gain.setValueAtTime(.28,t+duration*.55);
    carrierGain.gain.exponentialRampToValueAtTime(.0001,t+duration);
    carrier.connect(carrierGain);

    formants.forEach((frequency,index)=>{
      const filter=this.context.createBiquadFilter();
      const gain=this.context.createGain();
      filter.type="bandpass";
      filter.frequency.setValueAtTime(frequency,t);
      filter.Q.value=index===0?5.5:7.5;
      gain.gain.value=[.82,.44,.23][index];
      carrierGain.connect(filter);
      filter.connect(gain);
      gain.connect(this.se)
    });

    carrier.start(t);
    carrier.stop(t+duration+.03)
  }

  breathNoise(t,duration,volume){
    const source=this.context.createBufferSource();
    const filter=this.context.createBiquadFilter();
    const gain=this.context.createGain();
    source.buffer=this.noiseBuffer(duration);
    filter.type="bandpass";
    filter.frequency.value=2100;
    filter.Q.value=.7;
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.linearRampToValueAtTime(volume,t+.035);
    gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.se);
    source.start(t)
  }

  attack(withCry=false){
    if(withCry){
      this.battleCry();
      this.playSwordClash(.18)
    }else{
      this.playSwordClash(.025)
    }
  }

  bow(isEnemy=false){
    this.playBow(isEnemy)
  }

  charge(withCry=false){
    if(withCry){
      this.battleCry();
      this.chargeRumble()
    }
    this.tone(92,.22,"sawtooth",.27,withCry?.10:.01);
    this.tone(138,.18,"square",.16,withCry?.14:.07);
    this.playSwordClash(withCry?.20:.16)
  }

  gong(){
    if(!this.enabled||this.context===null){return}

    if(this.turnGongBuffer===null){
      this.ensureTurnGongLoaded()
        .then(buffer=>{
          if(buffer!==null&&this.enabled){this.gong()}
        })
        .catch(()=>{});
      return
    }

    // ターンチェンジ時は、添付MP3の銅鑼音をそのまま再生する。
    this.duckBgm(3.55);
    const source=this.context.createBufferSource();
    const gain=this.context.createGain();
    source.buffer=this.turnGongBuffer;
    gain.gain.value=.92;
    source.connect(gain);
    gain.connect(this.se);
    source.start(this.context.currentTime)
  }

  titleThunder(){
    if(!this.enabled||this.context===null){return}

    const t=this.context.currentTime+.04;
    const duration=3.25;

    // 雷SE専用の増幅段。全体のコンプレッサーで音割れを抑えながら、
    // スマートフォンでも聞こえやすい中低域を大きく前へ出す。
    const thunderBus=this.context.createGain();
    const thunderBody=this.context.createBiquadFilter();
    const thunderPresence=this.context.createBiquadFilter();
    thunderBus.gain.value=2.85;
    thunderBody.type="peaking";
    thunderBody.frequency.value=250;
    thunderBody.Q.value=.72;
    thunderBody.gain.value=11;
    thunderPresence.type="peaking";
    thunderPresence.frequency.value=760;
    thunderPresence.Q.value=.62;
    thunderPresence.gain.value=6;
    thunderBus.connect(thunderBody);
    thunderBody.connect(thunderPresence);
    thunderPresence.connect(this.master);

    // 雷雲全体が低くうねる、長く大きな「ゴロゴロ」。
    const cloud=this.context.createBufferSource();
    const cloudLow=this.context.createBiquadFilter();
    const cloudMid=this.context.createBiquadFilter();
    const cloudGain=this.context.createGain();
    cloud.buffer=this.noiseBuffer(duration);
    cloudLow.type="lowpass";
    cloudLow.frequency.setValueAtTime(1450,t);
    cloudLow.frequency.exponentialRampToValueAtTime(190,t+duration);
    cloudMid.type="peaking";
    cloudMid.frequency.value=285;
    cloudMid.Q.value=.78;
    cloudMid.gain.value=12;
    cloudGain.gain.setValueAtTime(.0001,t);
    cloudGain.gain.linearRampToValueAtTime(.34,t+.14);
    cloudGain.gain.linearRampToValueAtTime(.18,t+.34);
    cloudGain.gain.linearRampToValueAtTime(.52,t+.56);
    cloudGain.gain.linearRampToValueAtTime(.24,t+.82);
    cloudGain.gain.linearRampToValueAtTime(.70,t+1.06);
    cloudGain.gain.linearRampToValueAtTime(.34,t+1.30);
    cloudGain.gain.linearRampToValueAtTime(1.35,t+1.56);
    cloudGain.gain.linearRampToValueAtTime(.94,t+1.94);
    cloudGain.gain.linearRampToValueAtTime(.48,t+2.48);
    cloudGain.gain.exponentialRampToValueAtTime(.0001,t+duration);
    cloud.connect(cloudLow);
    cloudLow.connect(cloudMid);
    cloudMid.connect(cloudGain);
    cloudGain.connect(thunderBus);
    cloud.start(t);

    // 地面まで響く低音。超低域だけにせず、スマホでも残る帯域まで持ち上げる。
    [
      {delay:.16,start:72,end:44,peak:.22,attack:.12,release:.78},
      {delay:.54,start:66,end:40,peak:.34,attack:.10,release:.88},
      {delay:.96,start:60,end:36,peak:.46,attack:.09,release:.96},
      {delay:1.40,start:56,end:31,peak:1.05,attack:.12,release:1.42},
      {delay:1.68,start:50,end:28,peak:.82,attack:.10,release:1.34}
    ].forEach(spec=>{
      const o=this.context.createOscillator();
      const g=this.context.createGain();
      const pt=t+spec.delay;
      o.type="sine";
      o.frequency.setValueAtTime(spec.start,pt);
      o.frequency.exponentialRampToValueAtTime(spec.end,pt+spec.release);
      g.gain.setValueAtTime(.0001,pt);
      g.gain.linearRampToValueAtTime(spec.peak,pt+spec.attack);
      g.gain.exponentialRampToValueAtTime(.0001,pt+spec.release);
      o.connect(g);
      g.connect(thunderBus);
      o.start(pt);
      o.stop(pt+spec.release+.05)
    });

    // 中低域の不規則な崩れ。雷鳴の「ゴロゴロ」をスマホでも明瞭にする。
    [
      {delay:.10,freq:320,peak:.24,duration:.50},
      {delay:.40,freq:280,peak:.32,duration:.58},
      {delay:.74,freq:250,peak:.42,duration:.64},
      {delay:1.10,freq:220,peak:.54,duration:.72},
      {delay:1.42,freq:195,peak:1.02,duration:.98},
      {delay:1.70,freq:165,peak:.88,duration:1.12}
    ].forEach(spec=>{
      const source=this.context.createBufferSource();
      const band=this.context.createBiquadFilter();
      const lowpass=this.context.createBiquadFilter();
      const gain=this.context.createGain();
      const pt=t+spec.delay;
      source.buffer=this.noiseBuffer(spec.duration+.10);
      band.type="bandpass";
      band.frequency.setValueAtTime(spec.freq,pt);
      band.Q.value=.58;
      lowpass.type="lowpass";
      lowpass.frequency.value=1350;
      gain.gain.setValueAtTime(.0001,pt);
      gain.gain.linearRampToValueAtTime(spec.peak,pt+.07);
      gain.gain.linearRampToValueAtTime(spec.peak*.70,pt+spec.duration*.48);
      gain.gain.exponentialRampToValueAtTime(.0001,pt+spec.duration);
      source.connect(band);
      band.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(thunderBus);
      source.start(pt)
    });

    // 終盤の大きな「ドドーン」。鋭い破裂音ではなく、厚い空気の塊として鳴らす。
    const impact=this.context.createBufferSource();
    const impactBand=this.context.createBiquadFilter();
    const impactLow=this.context.createBiquadFilter();
    const impactGain=this.context.createGain();
    const impactTime=t+1.46;
    impact.buffer=this.noiseBuffer(1.45);
    impactBand.type="bandpass";
    impactBand.frequency.value=360;
    impactBand.Q.value=.48;
    impactLow.type="lowpass";
    impactLow.frequency.value=1650;
    impactGain.gain.setValueAtTime(.0001,impactTime);
    impactGain.gain.linearRampToValueAtTime(1.45,impactTime+.055);
    impactGain.gain.linearRampToValueAtTime(1.05,impactTime+.24);
    impactGain.gain.linearRampToValueAtTime(.58,impactTime+.72);
    impactGain.gain.exponentialRampToValueAtTime(.0001,impactTime+1.42);
    impact.connect(impactBand);
    impactBand.connect(impactLow);
    impactLow.connect(impactGain);
    impactGain.connect(thunderBus);
    impact.start(impactTime);

    // 遠い反響を追加し、巨大な雷鳴が空間の奥へ消えていく感じを出す。
    [2.02,2.34].forEach((delay,index)=>{
      const tail=this.context.createBufferSource();
      const tailLow=this.context.createBiquadFilter();
      const tailGain=this.context.createGain();
      const pt=t+delay;
      tail.buffer=this.noiseBuffer(.88);
      tailLow.type="lowpass";
      tailLow.frequency.value=index===0?560:390;
      tailGain.gain.setValueAtTime(.0001,pt);
      tailGain.gain.linearRampToValueAtTime(index===0?.52:.38,pt+.10);
      tailGain.gain.exponentialRampToValueAtTime(.0001,pt+.86);
      tail.connect(tailLow);
      tailLow.connect(tailGain);
      tailGain.connect(thunderBus);
      tail.start(pt)
    })
  }

  titleWhiteoutHiss(){
    if(!this.enabled||this.context===null){return}

    const t=this.context.currentTime;
    const duration=3.35;

    // 白が広がる間だけ、意識すれば聞こえる程度の薄い「サーッ」。
    const air=this.context.createBufferSource();
    const highpass=this.context.createBiquadFilter();
    const lowpass=this.context.createBiquadFilter();
    const gain=this.context.createGain();
    air.buffer=this.noiseBuffer(duration);
    highpass.type="highpass";
    highpass.frequency.setValueAtTime(620,t);
    lowpass.type="lowpass";
    lowpass.frequency.setValueAtTime(3200,t);
    lowpass.frequency.linearRampToValueAtTime(2400,t+duration);
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.linearRampToValueAtTime(.012,t+.65);
    gain.gain.linearRampToValueAtTime(.018,t+1.55);
    gain.gain.linearRampToValueAtTime(.010,t+2.45);
    gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
    air.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.se);
    air.start(t)
  }

  victory(){
    [293.66,392,523.25,659.25,783.99].forEach((f,i)=>{
      this.tone(f,.28,i<2?"sawtooth":"triangle",.27,i*.14)
    });
    if(this.context!==null){this.cymbal(this.context.currentTime,.24)}
  }

  defeat(){
    this.tone(293.66,.30,"sawtooth",.25);
    this.tone(220,.38,"sawtooth",.27,.19);
    this.tone(146.83,.56,"sine",.32,.40)
  }
}

class Game{
  constructor(){
    this.audio=new AudioController();this.width=8;this.height=16;this.currentStage=0;this.phase="player";this.mode="select";this.turn=1;this.units=[];
    this.chargeDustEffectDataUrl=CHARGE_DUST_EFFECT_DATA_URL;
    this.wideIllusionMistDataUrl=WIDE_ILLUSION_MIST_DATA_URL;
    this.wideIllusionSkeletonDataUrl=WIDE_ILLUSION_SKELETON_DATA_URL;
    this.selectedUnitId=null;this.pendingFacingUnitId=null;this.selectedCellX=null;this.selectedCellY=null;this.selectionRingSuppressionDepth=0;this.reachable=new Map();this.previous=null;this.locked=false;this.finished=false;this.finishing=false;this.logs=[];this.dialogueActive=false;this.missionActive=false;this.longPressTimer=0;this.longPressTriggered=false;this.longPressUnitId=null;this.suppressLongPressClick=false;this.abilityOverlayClickReadyAt=0;this.pointerStartX=0;this.pointerStartY=0;this.pointerMoved=false;this.longPressScrollLock=null;this.facingCanUndoMovement=false;this.attackReturnMode="command";this.skillReturnMode="move";this.strategyReturnMode="move";this.selectedStrategyLevel=0;this.activeEscape=null;this.currentObjective="";this.stageEventTriggered=false;this.pendingStageEvent=null;this.turnReinforcementTriggered=false;this.raidReinforcementSpawned=false;this.turnReinforcementResult={spawnedUnitIds:[],failedUnitIds:[]};this.raidReinforcementResult={spawnedUnitIds:[],failedUnitIds:[]};this.zhujiaBetrayalTriggered=false;this.zengtouBetrayalTriggered=false;this.gaotangSpellTrapDialogueTriggered=false;this.hiddenTraps=[];this.stageSevenWideIllusionEffectTestEnabled=false;this.stageNineFireWaterEffectTestEnabled=false;this.elementalTacticConfusionAlwaysSuccessTestEnabled=false;this.battleSessionId=0;this.stageLaunchRequestId=0;this.battleRandom=new BattleRandom();this.backgroundPaused=document.hidden;this.backgroundRecoveryKey="senki_suikoden_active_battle_v1";this.backgroundRecoveryBackupKey="senki_suikoden_active_battle_v1_backup";this.backgroundRecoveryTemporaryKey="senki_suikoden_active_battle_v1_temporary";this.saveNamespace="senki_suikoden_save_v2";this.saveWriterId=globalThis.crypto?.randomUUID?.()||`writer-${Date.now()}-${BattleRandom.createSeed().toString(16)}`;this.recoverySaveTimer=0;this.saveLoadRestoring=false;this.recoveryPromptShown=false;this.pendingRecoverySnapshot=null;this.manualSaveSlotCount=20;this.saveSlotMode=null;this.saveSlotOpenedFromBattle=false;this.saveStatusToastTimer=0;this.saveFailureNotified=false;this.saveConflictNotified=false;this.recoveryCorruptionNotified=false;this.lastSavedRecoveryJson="";this.lastRecoverySavedAt=0;this.commandInstructionMessage="";this.commandDockSpacerSyncQueued=false;this.commandDockSpacerPadding=12;this.actionResolutionInProgress=false;this.playerTurnSetupInProgress=false;this.playerTurnSetupSessionId=null;this.playerTurnSetupFailed=false;
    this.pendingRecoverySelectionGuard=null;
    this.autoSaveStopped=false;
    this.victoryEffectElement=null;
    this.victoryEffectTapResolver=null;
    this.defeatEffectElement=null;
    this.defeatEffectTapResolver=null;
    this.terrainData={
      plain:{name:"平地",move:1,damageRate:0,damageFixed:0,attackBonus:0,pass:true},
      road:{name:"道",move:1,damageRate:0,damageFixed:0,attackBonus:0,pass:true},
      forest:{name:"森",move:2,damageRate:.30,damageFixed:8,attackBonus:0,pass:true},
      hill:{name:"丘",move:2,damageRate:.15,damageFixed:4,attackBonus:3,pass:true},
      mountain:{name:"山岳",move:3,damageRate:.60,damageFixed:16,attackBonus:3,pass:true},
      wall:{name:"城壁",move:99,damageRate:0,damageFixed:0,attackBonus:0,pass:false},
      swamp:{name:"湿地",move:3,damageRate:0,damageFixed:0,attackBonus:0,attackPenaltyRate:.30,attackPenaltyFixed:8,defensePenaltyRate:.30,defensePenaltyFixed:8,pass:true},
      water:{name:"川",move:99,damageRate:0,damageFixed:0,attackBonus:0,pass:false}
    };
    this.stages=this.createStages();
    this.validateStageDefinitions();
    try{
      this.saveRepository=new SaveRepository(window.localStorage,this.saveNamespace,{
        primary:this.backgroundRecoveryKey,
        backup:this.backgroundRecoveryBackupKey,
        temporary:this.backgroundRecoveryTemporaryKey
      });
      this.saveCodec=new SaveCodec(this);
      this.saveService=new SaveService(this,this.saveRepository,this.saveCodec,this.saveWriterId)
    }catch(error){
      this.saveRepository=null;
      this.saveCodec=null;
      this.saveService=null
    }
    this.e=id=>document.getElementById(id);this.board=this.e("board");this.boardScroll=this.e("boardScroll");this.unitInfoPanel=this.e("unitInfoPanel");this.terrainInfoPanel=this.e("terrainInfoPanel");this.terrainInfo=this.e("terrainInfo");this.info=this.e("unitInfo");this.abilityOverlay=this.e("abilityOverlay");this.abilityCard=this.e("abilityCard");
    this.commandArea=this.e("commandArea");this.unitCommandButtons=this.e("unitCommandButtons");this.commandInstructionText=this.e("commandInstructionText");this.bowBtn=this.e("bowButton");this.chargeBtn=this.e("chargeButton");this.strategyBtn=this.e("strategyButton");this.waitBtn=this.e("waitButton");this.cancelBtn=this.e("cancelButton");this.endTurnBtn=this.e("endTurnButton");
    this.stageInfoBtn=this.e("stageInfoButton");this.stageInfoOverlay=this.e("stageInfoOverlay");this.battleStatusBtn=this.e("battleStatusButton");this.battleStatusOverlay=this.e("battleStatusOverlay");this.strategyGuideBtn=this.e("strategyGuideButton");this.strategyGuideOverlay=this.e("strategyGuideOverlay");this.selectionInfoContainer=this.e("selectionInfoContainer");this.battleActionButtons=this.e("battleActionButtons");this.saveSlotOverlay=this.e("saveSlotOverlay");this.saveSlotList=this.e("saveSlotList");this.saveSlotTitle=this.e("saveSlotTitle");this.saveSlotInstruction=this.e("saveSlotInstruction");this.autoSaveStoppedNotice=this.e("autoSaveStoppedNotice");
    this.battleViewport=this.e("battleViewport");this.commandDock=this.e("commandDock");this.boardTopSpacer=this.e("boardTopSpacer");this.boardBottomSpacer=this.e("boardBottomSpacer");
    this.strategyLevelPanel=this.e("strategyLevelPanel");this.strategyLevelButtons=[...document.querySelectorAll("[data-strategy-level]")];
    this.commandDockResizeObserver=typeof ResizeObserver==="function"&&this.commandDock!==null?new ResizeObserver(()=>this.queueCommandDockSpacerSync()):null;
    if(this.commandDockResizeObserver!==null){
      this.commandDockResizeObserver.observe(this.commandDock);
      if(this.battleActionButtons!==null){this.commandDockResizeObserver.observe(this.battleActionButtons)}
    }
    this.bind();this.bindPageLifecycle();this.renderStageList();this.showBlankInfo();this.updateAutoSaveStoppedNotice()
  }

  /**
   * セーブ互換性に使うステージ定義の固定情報を起動時に検査する。
   */
  validateStageDefinitions(){
    const ids=new Set();
    const chapterNumbers=new Set();
    for(const stage of this.stages){
      if(typeof stage.id!=="string"||stage.id.length===0||ids.has(stage.id)){
        throw new Error("STAGE_ID_INVALID")
      }
      if(!Number.isInteger(stage.chapterNumber)||stage.chapterNumber<1||stage.chapterNumber>9||chapterNumbers.has(stage.chapterNumber)){
        throw new Error(`STAGE_CHAPTER_NUMBER_INVALID: ${stage.id}`)
      }
      if(!Number.isInteger(stage.turnLimit)||stage.turnLimit<1){
        throw new Error(`STAGE_TURN_LIMIT_INVALID: ${stage.id}`)
      }
      if(!Array.isArray(stage.map)||stage.map.length===0||!Array.isArray(stage.map[0])||stage.map[0].length===0||stage.map.some(row=>!Array.isArray(row)||row.length!==stage.map[0].length)){
        throw new Error(`STAGE_MAP_INVALID: ${stage.id}`)
      }
      ids.add(stage.id)
      chapterNumbers.add(stage.chapterNumber)
    }
  }

  stageIndexFromId(stageId){
    return this.stages.findIndex(stage=>stage.id===stageId)
  }

  applyStageBoardClass(stage){
    const classNames=[
      "stage-one-map","stage-two-map","stage-three-map",
      "stage-four-map","stage-five-map","stage-six-map",
      "stage-seven-map","stage-eight-map","stage-nine-map"
    ];
    classNames.forEach((className,index)=>this.board.classList.toggle(className,stage.chapterNumber===index+1))
  }

  randomFloat(){
    return this.battleRandom.next()
  }

  /**
   * ブラウザのバックグラウンド移行・復帰・ページ破棄に備える。
   */
  bindPageLifecycle(){
    document.addEventListener("visibilitychange",()=>this.handleDocumentVisibilityChange());
    window.addEventListener("pagehide",()=>this.saveRecoverySnapshot());
    window.addEventListener("beforeunload",()=>this.saveRecoverySnapshot());
    window.addEventListener("storage",event=>{
      if(this.saveService!==null){this.saveService.handleStorageEvent(event)}
    });
    window.addEventListener("pageshow",()=>{if(!document.hidden){this.resumeFromBackground()}});
    document.addEventListener("freeze",()=>this.saveRecoverySnapshot());
    document.addEventListener("resume",()=>this.resumeFromBackground())
  }

  /**
   * 非表示中は音声と戦闘演出の進行を止め、盤面を即時退避する。
   */
  handleDocumentVisibilityChange(){
    if(document.hidden){
      this.backgroundPaused=true;
      this.saveRecoverySnapshot();
      if(this.audio.context!==null&&this.audio.context.state==="running"){
        this.audio.context.suspend().catch(()=>{})
      }
      return
    }
    this.resumeFromBackground()
  }

  /**
   * バックグラウンドから戻った際に、停止していた音声と画面を復帰する。
   */
  resumeFromBackground(){
    this.backgroundPaused=false;
    if(this.audio.enabled&&this.audio.context!==null&&this.audio.context.state==="suspended"){
      this.audio.context.resume().catch(()=>{})
    }
    if(this.units.length>0&&!this.finished){
      this.render()
    }
  }

  /**
   * 手動・自動で共用する戦闘スナップショットを保存してよい安定状態かを返す。
   * 保存可否の条件はここへ集約し、呼び出し側で個別判定を増やさない。
   */
  canSaveBattleSnapshot(){
    return !this.saveLoadRestoring
      && !this.actionResolutionInProgress
      && !this.playerTurnSetupInProgress
      && !this.playerTurnSetupFailed
      && !this.dialogueActive
      && !this.missionActive
      && this.units.length>0
      && !this.finished
      && this.phase!=="finished"
  }

  canSaveManualSnapshot(){
    return this.canSaveBattleSnapshot()&&this.isPlayerInteractionReady()
  }

  /**
   * 現在が最終方向の選択待ちかを返す。
   */
  isWaitingForFacing(){
    return this.mode==="facing"
  }

  /**
   * 操作状態の矛盾を診断する。
   * ゲーム進行には一切介入せず、異常があれば console.warn へ出力するだけとする。
   * 非同期行動解決中には一時的な中間状態が存在するため、参照破損以外の厳密検査は安定状態だけで行う。
   */
  validateInteractionState(context=""){
    const issues=[];
    const addIssue=(code,message)=>issues.push(`${code}: ${message}`);
    const selected=this.selected();
    const pending=this.pendingFacing();
    const stable=!this.actionResolutionInProgress&&!this.playerTurnSetupInProgress&&!this.playerTurnSetupFailed&&!this.saveLoadRestoring&&!this.finishing&&!this.dialogueActive&&!this.missionActive;

    if(this.selectedUnitId!==null&&selected===null){
      addIssue("SELECTED_UNIT_MISSING",`selectedUnitId=${this.selectedUnitId} に対応する部隊が存在しません。`)
    }
    if(this.pendingFacingUnitId!==null&&pending===null){
      addIssue("PENDING_FACING_UNIT_MISSING",`pendingFacingUnitId=${this.pendingFacingUnitId} に対応する部隊が存在しません。`)
    }
    if(this.actionResolutionInProgress&&!this.locked){
      addIssue("RESOLUTION_WITHOUT_LOCK","行動解決中なのに入力ロックが解除されています。")
    }

    if(stable){
      const validModes=new Set(["select","move","command","bow","charge","strategy","strategy-level","strategy-resolving","facing"]);
      if(!validModes.has(this.mode)){
        addIssue("UNKNOWN_MODE",`未定義のmode=${this.mode}です。`)
      }

      if(this.isWaitingForFacing()){
        if(pending===null){
          addIssue("FACING_WITHOUT_PENDING","mode=facing なのに最終方向待ち部隊がありません。")
        }
        if(selected===null){
          addIssue("FACING_WITHOUT_SELECTED","mode=facing なのに選択中部隊がありません。")
        }
        if(selected!==null&&pending!==null&&selected.id!==pending.id){
          addIssue("FACING_UNIT_MISMATCH",`選択中=${selected.id} と方向待ち=${pending.id} が一致しません。`)
        }
        if(pending!==null&&pending.hasActed){
          addIssue("FACING_AFTER_COMPLETION",`${pending.id} は行動完了済みなのに方向選択待ちです。`)
        }
      }else if(this.pendingFacingUnitId!==null){
        addIssue("PENDING_OUTSIDE_FACING",`mode=${this.mode} なのに pendingFacingUnitId が残っています。`)
      }

      if(this.facingCanUndoMovement){
        if(!this.isWaitingForFacing()){
          addIssue("UNDO_FACING_WRONG_MODE","facingCanUndoMovement=true なのに方向選択モードではありません。")
        }
        if(this.previous===null){
          addIssue("UNDO_FACING_WITHOUT_PREVIOUS","移動取消可能なのに移動前位置 previous がありません。")
        }
        if(pending!==null&&pending.actionCommitted===true){
          addIssue("UNDO_AFTER_COMMIT",`${pending.id} は行動確定済みなのに移動取消可能です。`)
        }
        if(pending!==null&&!pending.hasMoved){
          addIssue("UNDO_WITHOUT_MOVE",`${pending.id} は未移動なのに移動取消可能です。`)
        }
      }

      if(this.mode==="select"){
        if(this.selectedUnitId!==null){
          addIssue("SELECT_MODE_WITH_ACTIVE_UNIT",`mode=select なのに selectedUnitId=${this.selectedUnitId} が残っています。`)
        }
        if(this.previous!==null){
          addIssue("SELECT_MODE_WITH_PREVIOUS","mode=select なのに移動前位置 previous が残っています。")
        }
      }

      if(selected!==null){
        if(this.phase==="player"&&selected.team!=="player"){
          addIssue("ENEMY_AS_ACTIVE_UNIT",`自軍ターンに敵部隊 ${selected.id} が操作対象になっています。`)
        }
        if(selected.hasActed){
          addIssue("COMPLETED_UNIT_SELECTED",`${selected.id} は行動完了済みなのに操作対象として残っています。`)
        }
        if(selected.actionCommitted===true&&!selected.hasActed&&!this.isWaitingForFacing()){
          addIssue("COMMITTED_OUTSIDE_FACING",`${selected.id} は行動確定済み・方向未確定なのに mode=${this.mode} です。`)
        }
        if(selected.actionCommitted===true&&this.previous!==null){
          addIssue("COMMITTED_WITH_PREVIOUS",`${selected.id} は行動確定済みなのに previous が残っています。`)
        }
      }

      const playerUnits=this.alive("player");
      const pendingCommitted=playerUnits.filter(unit=>unit.actionCommitted===true&&!unit.hasActed&&!unit.stationary);
      if(pendingCommitted.length>1){
        addIssue("MULTIPLE_COMMITTED_PENDING",`最終方向未確定の味方が複数います: ${pendingCommitted.map(unit=>unit.id).join(", ")}`)
      }
      if(pendingCommitted.length===1){
        const unit=pendingCommitted[0];
        if(!this.isWaitingForFacing()||pending===null||pending.id!==unit.id){
          addIssue("COMMITTED_PENDING_NOT_FACING",`${unit.id} は行動確定済みですが最終方向選択へ復帰していません。`)
        }
      }
      for(const unit of this.units.filter(candidate=>candidate.isAlive)){
        if(unit.hasActed&&unit.actionCommitted!==true){
          addIssue("ACTED_WITHOUT_COMMIT",`${unit.id} (${unit.team}) は hasActed=true ですが actionCommitted=false です。`)
        }
      }

      if(this.mode==="strategy-resolving"){
        addIssue("RESOLVING_MODE_WHILE_STABLE","行動解決終了後も mode=strategy-resolving が残っています。")
      }
    }

    const signature=issues.join("\n");
    if(signature.length===0){
      this.lastInteractionStateWarningSignature="";
      return true
    }
    if(signature!==this.lastInteractionStateWarningSignature){
      this.lastInteractionStateWarningSignature=signature;
      const label=context?` [${context}]`:"";
      console.warn(`[戦旗水滸伝] 操作状態の矛盾を検出${label}\n${signature}`)
    }
    return false
  }

  /**
   * 現在選択中の部隊が「戻る」で一段階前へ戻れる状態かを返す。
   * 実際の取消処理はcancel()が担当し、可否判定だけをここへ集約する。
   */
  canUndoCurrentAction(unit=this.selected()){
    if(unit===null){return false}
    // 行動確定済み・最終方向未確定なら、mode に関係なく不可逆とする。
    // 非同期処理中の例外などで mode が途中状態に残っても、戻る経路から再行動させない。
    if(unit.actionCommitted===true&&!unit.hasActed){return false}
    if(this.mode==="bow"||this.mode==="charge"||this.mode==="strategy"||this.mode==="strategy-level"){return true}
    if(this.isWaitingForFacing()){
      const canCancelWait=this.previous!==null&&!unit.hasMoved&&!unit.hasActed;
      const canUndoMovement=this.facingCanUndoMovement&&this.previous!==null;
      return canCancelWait||canUndoMovement
    }
    if(this.mode==="command"){return this.previous!==null}
    return this.mode==="move"
  }

  /**
   * 現在の部隊から別の部隊へ選択を切り替えてよいかを返す。
   * 既存ルールをそのまま一か所へ集約する。
   */
  canSelectAnotherUnit(currentUnit,nextUnit){
    if(currentUnit===null||nextUnit===null||currentUnit.id===nextUnit.id){return true}
    // 行動確定済み・最終方向未確定の部隊を放置して別部隊へ切り替えることは禁止する。
    if(currentUnit.actionCommitted===true&&!currentUnit.hasActed){return false}
    if(currentUnit.hasMoved){return false}
    return !(this.mode==="command"||this.mode==="strategy-level"||this.mode==="strategy"||this.mode==="strategy-resolving"||this.mode==="bow"||this.mode==="charge"||this.isWaitingForFacing())
  }

  /**
   * 非同期の行動解決を開始する。
   * 通常は入力も同時にロックするが、敵ターンのように既にロック済みの場合はfalseを指定する。
   */
  beginActionResolution(lockInput=true){
    this.actionResolutionInProgress=true;
    if(lockInput){this.locked=true}
  }

  /**
   * 非同期の行動解決を終了する。
   * 通常は入力ロックも解除するが、敵ターンのように継続してロックする場合はfalseを指定する。
   */
  endActionResolution(unlockInput=true){
    this.actionResolutionInProgress=false;
    if(unlockInput){this.locked=false}
  }

  /**
   * 非同期の行動解決をtry/finallyで実行し、例外や早期returnがあっても必ず状態を復旧する。
   */
  async runActionResolution(action,{lockInput=true,unlockInput=true,sessionId=this.battleSessionId}={}){
    if(!this.isBattleSessionActive(sessionId)){return}
    this.beginActionResolution(lockInput);
    let actionFailed=false;
    try{
      return await action()
    }catch(error){
      actionFailed=true;
      // 戦闘破棄後に旧セッションの例外を現在画面へ持ち越さない。
      if(!this.isBattleSessionActive(sessionId)){return}
      throw error
    }finally{
      // cancelCurrentBattle() や新戦闘開始後は、旧行動のfinallyから現在の入力状態を変更しない。
      if(this.isBattleSessionActive(sessionId)){
        this.endActionResolution(unlockInput);
        if(actionFailed){
          // ダメージ等の不可逆処理後に演出だけが失敗した場合でも、勝敗判定を取りこぼさない。
          // 再評価側の例外は隔離し、元の行動例外を上書きしない。
          try{
            this.checkResult()
          }catch(resultError){
            console.error("[戦旗水滸伝] 行動解決失敗後の勝敗再評価エラー",resultError)
          }
          this.recoverPlayerInteractionAfterResolutionFailure()
        }
      }
    }
  }

  /**
   * 自動復元枠の競合により、このタブの自動保存が停止しているかを画面へ反映する。
   */
  setAutoSaveStopped(stopped){
    this.autoSaveStopped=stopped===true;
    this.updateAutoSaveStoppedNotice()
  }

  updateAutoSaveStoppedNotice(){
    const notice=this.autoSaveStoppedNotice||document.getElementById("autoSaveStoppedNotice");
    if(notice===null){return}
    notice.hidden=!this.autoSaveStopped;
    notice.setAttribute("aria-hidden",this.autoSaveStopped?"false":"true")
  }

  showSaveStatusMessage(message){
    const toast=this.e("saveStatusToast");
    if(toast===null){return}
    toast.textContent=message;
    toast.classList.add("show");
    if(this.saveStatusToastTimer!==0){window.clearTimeout(this.saveStatusToastTimer)}
    this.saveStatusToastTimer=window.setTimeout(()=>{
      toast.classList.remove("show");
      this.saveStatusToastTimer=0
    },4800)
  }

  notifySaveFailureOnce(){
    if(this.saveFailureNotified){return}
    this.saveFailureNotified=true;
    this.showSaveStatusMessage("戦闘データを保存できませんでした。ブラウザの保存設定または空き容量を確認してください。")
  }

  notifySaveConflictOnce(){
    if(this.saveConflictNotified){return}
    this.saveConflictNotified=true;
    this.showSaveStatusMessage("別のタブで戦闘データが更新されたため、このタブからの上書きを停止しました。")
  }

  notifyRecoveryBackupUsedOnce(){
    if(this.recoveryCorruptionNotified){return}
    this.recoveryCorruptionNotified=true;
    this.showSaveStatusMessage("最新の戦闘データに問題があったため、前回正常データを読み込みます。")
  }

  notifyRecoveryCorruptionOnce(){
    if(this.recoveryCorruptionNotified){return}
    this.recoveryCorruptionNotified=true;
    this.showSaveStatusMessage("保存されていた戦闘データが壊れていたため、読み込み候補から除外しました。")
  }

  /**
   * 初期配置と各増援定義を、部隊IDから参照できるようにまとめる。
   */
  buildStageUnitTemplateMap(stage){
    const templates=new Map();
    const addTemplates=items=>{
      for(const item of items||[]){
        if(item!==null&&typeof item==="object"&&typeof item.id==="string"){
          templates.set(item.id,item)
        }
      }
    };
    addTemplates(stage.units);
    addTemplates(stage.turnReinforcement?.units);
    addTemplates(stage.raidReinforcements);
    addTemplates(stage.qinMingReinforcement?.units);
    return templates
  }

  createUnitFromCurrentTemplate(stage,template){
    const sourceMapHeight=stage.map.length;
    const targetHeight=sourceMapHeight===8?16:sourceMapHeight;
    const y=sourceMapHeight===targetHeight?template.y:template.y*2;
    const unit=new Unit({...template,y});
    const stationaryIds=new Set(stage.stationaryUnits||[]);
    const stationaryLabels=stage.stationaryLabels||{};
    unit.stationary=stationaryIds.has(unit.id);
    unit.stationaryLabel=unit.stationary?(stationaryLabels[unit.id]||""):"";
    if(unit.stationary){
      unit.hasMoved=true;
      unit.actionCommitted=true;
      unit.hasActed=true
    }
    return unit
  }

  buildBattleUnitState(unit){
    return {
      id:unit.id,
      hp:unit.hp,
      x:unit.x,
      y:unit.y,
      facing:unit.facing,
      team:unit.team,
      isAlive:unit.isAlive===true,
      hasMoved:unit.hasMoved===true,
      actionCommitted:unit.actionCommitted===true,
      hasActed:unit.hasActed===true,
      confusedTurns:unit.confusedTurns,
      illusionTurns:unit.illusionTurns,
      strategyUses:unit.strategyUses,
      bowUses:unit.bowUses,
      chargeUses:unit.chargeUses,
      stationary:unit.stationary===true,
      stationaryLabel:typeof unit.stationaryLabel==="string"?unit.stationaryLabel:"",
      knowsZhujiaTraps:unit.knowsZhujiaTraps===true
    }
  }

  buildBattleSnapshot(){
    const stage=this.stages[this.currentStage];
    return {
      schema:SAVE_FORMAT_VERSION,
      saveFormatVersion:SAVE_FORMAT_VERSION,
      gameVersion:GAME_VERSION,
      contentRevision:BATTLE_CONTENT_REVISION,
      saveKind:"recovery",
      savedAt:Date.now(),
      stageId:stage.id,
      turn:this.turn,
      phase:this.phase,
      random:this.battleRandom.exportState(),
      units:this.units.map(unit=>this.buildBattleUnitState(unit)),
      interaction:{
        selectedUnitId:this.selectedUnitId,
        selectedCellX:this.selectedCellX,
        selectedCellY:this.selectedCellY,
        previous:this.previous===null?null:{
          x:this.previous.x,
          y:this.previous.y,
          facing:this.previous.facing
        }
      },
      battle:{
        activeEscape:this.activeEscape===null?null:{...this.activeEscape},
        logs:this.logs.slice(-300).map(log=>String(log).slice(0,1000)),
        stageEventTriggered:this.stageEventTriggered===true,
        pendingStageEvent:this.pendingStageEvent,
        turnReinforcementTriggered:this.turnReinforcementTriggered===true,
        raidReinforcementSpawned:this.raidReinforcementSpawned===true,
        turnReinforcementResult:{
          spawnedUnitIds:[...this.turnReinforcementResult.spawnedUnitIds],
          failedUnitIds:[...this.turnReinforcementResult.failedUnitIds]
        },
        raidReinforcementResult:{
          spawnedUnitIds:[...this.raidReinforcementResult.spawnedUnitIds],
          failedUnitIds:[...this.raidReinforcementResult.failedUnitIds]
        },
        zhujiaBetrayalTriggered:this.zhujiaBetrayalTriggered===true,
        zengtouBetrayalTriggered:this.zengtouBetrayalTriggered===true,
        gaotangSpellTrapDialogueTriggered:this.gaotangSpellTrapDialogueTriggered===true,
        hiddenTraps:this.hiddenTraps.map(trap=>({
          x:trap.x,
          y:trap.y,
          type:trap.type,
          label:trap.label,
          damage:trap.damage,
          confusionTurns:trap.confusionTurns,
          illusionTurns:trap.illusionTurns,
          active:trap.active===true
        }))
      }
    }
  }

  legacyRandomState(stage,savedAt,units){
    const source=`${stage.id}|${Number(savedAt)||0}|${units.map(unit=>`${unit.id}:${unit.x}:${unit.y}:${unit.hp}`).join("|")}`;
    let hash=2166136261;
    for(let index=0;index<source.length;index++){
      hash^=source.charCodeAt(index);
      hash=Math.imul(hash,16777619)>>>0
    }
    return {algorithm:"xorshift32",state:hash===0?0x6d2b79f5:hash}
  }

  normalizeMigratedHiddenTraps(stage,sourceTraps){
    const source=Array.isArray(sourceTraps)?sourceTraps:[];
    const usedPositions=new Set();
    const normalized=[];
    for(const zone of stage.hiddenTrapZones||[]){
      const candidates=(zone.candidates||[]).map(position=>({x:position[0],y:position[1]}));
      const candidateKeys=new Set(candidates.map(position=>`${position.x},${position.y}`));
      const matching=source.filter(trap=>trap!==null&&typeof trap==="object"&&candidateKeys.has(`${trap.x},${trap.y}`));
      const selected=[];
      for(const trap of matching){
        const key=`${trap.x},${trap.y}`;
        if(usedPositions.has(key)||selected.length>=(zone.count||0)){continue}
        usedPositions.add(key);
        selected.push({
          x:trap.x,
          y:trap.y,
          type:zone.type||"normal",
          label:zone.label||"中央戦域",
          damage:zone.damage,
          confusionTurns:zone.confusionTurns,
          illusionTurns:zone.illusionTurns,
          active:trap.active!==false
        })
      }
      for(const position of candidates){
        if(selected.length>=(zone.count||0)){break}
        const key=`${position.x},${position.y}`;
        if(usedPositions.has(key)){continue}
        usedPositions.add(key);
        selected.push({
          x:position.x,
          y:position.y,
          type:zone.type||"normal",
          label:zone.label||"中央戦域",
          damage:zone.damage,
          confusionTurns:zone.confusionTurns,
          illusionTurns:zone.illusionTurns,
          active:true
        })
      }
      normalized.push(...selected)
    }
    return normalized
  }

  migratedReinforcementResult(definitions,triggered,units){
    const expectedIds=(definitions||[]).map(unit=>unit.id);
    if(!triggered){return {spawnedUnitIds:[],failedUnitIds:[]}}
    const actualIds=new Set(units.map(unit=>unit.id));
    return {
      spawnedUnitIds:expectedIds.filter(id=>actualIds.has(id)),
      failedUnitIds:expectedIds.filter(id=>!actualIds.has(id))
    }
  }

  /**
   * 旧schema 1～4を、可変状態と再現用情報だけを持つschema 5へ変換する。
   */
  migrateLegacyBattleSnapshot(legacy,expectedSaveKind="recovery"){
    let stageIndex=-1;
    if(typeof legacy.stageId==="string"){
      stageIndex=this.stageIndexFromId(legacy.stageId)
    }
    if(stageIndex<0&&Number.isInteger(legacy.currentStage)){
      stageIndex=legacy.currentStage
    }
    if(stageIndex<0||stageIndex>=this.stages.length||!Array.isArray(legacy.units)){return null}
    const stage=this.stages[stageIndex];
    const templates=this.buildStageUnitTemplateMap(stage);
    const units=[];
    for(const data of legacy.units){
      if(data===null||typeof data!=="object"||typeof data.id!=="string"){return null}
      const template=templates.get(data.id);
      if(template===undefined){return null}
      const currentUnit=this.createUnitFromCurrentTemplate(stage,template);
      const hp=Number.isFinite(data.hp)?Math.max(0,Math.min(currentUnit.maxHp,Math.trunc(data.hp))):currentUnit.maxHp;
      units.push({
        id:data.id,
        hp,
        x:Number.isInteger(data.x)?data.x:currentUnit.x,
        y:Number.isInteger(data.y)?data.y:currentUnit.y,
        facing:typeof data.facing==="string"?data.facing:currentUnit.facing,
        team:data.team==="player"||data.team==="enemy"?data.team:currentUnit.team,
        isAlive:typeof data.isAlive==="boolean"?data.isAlive:hp>0,
        hasMoved:typeof data.hasMoved==="boolean"?data.hasMoved:currentUnit.hasMoved,
        actionCommitted:typeof data.actionCommitted==="boolean"?data.actionCommitted:data.hasActed===true||currentUnit.actionCommitted,
        hasActed:typeof data.hasActed==="boolean"?data.hasActed:currentUnit.hasActed,
        confusedTurns:Number.isInteger(data.confusedTurns)?data.confusedTurns:0,
        illusionTurns:Number.isInteger(data.illusionTurns)?data.illusionTurns:0,
        strategyUses:Number.isInteger(data.strategyUses)?data.strategyUses:currentUnit.strategyUses,
        bowUses:Number.isInteger(data.bowUses)?data.bowUses:currentUnit.bowUses,
        chargeUses:Number.isInteger(data.chargeUses)?data.chargeUses:currentUnit.chargeUses,
        stationary:typeof data.stationary==="boolean"?data.stationary:currentUnit.stationary,
        stationaryLabel:typeof data.stationaryLabel==="string"?data.stationaryLabel:currentUnit.stationaryLabel,
        knowsZhujiaTraps:typeof data.knowsZhujiaTraps==="boolean"?data.knowsZhujiaTraps:currentUnit.knowsZhujiaTraps===true
      })
    }

    const legacyInteraction=legacy.interaction&&typeof legacy.interaction==="object"?legacy.interaction:{};
    const legacyBattle=legacy.schema===4&&legacy.battle&&typeof legacy.battle==="object"?legacy.battle:legacy;
    const selectedCandidate=units.find(state=>state.id===legacyInteraction.selectedUnitId);
    const selectedUnitId=legacy.phase==="player"&&selectedCandidate!==undefined&&selectedCandidate.isAlive&&selectedCandidate.team==="player"&&!selectedCandidate.hasActed&&!selectedCandidate.stationary
      ?selectedCandidate.id
      :null;
    const hasValidSelectedCell=Number.isInteger(legacyInteraction.selectedCellX)&&Number.isInteger(legacyInteraction.selectedCellY);
    const previousCandidate=legacyInteraction.previous;
    const previous=selectedUnitId!==null
      &&previousCandidate!==null
      &&typeof previousCandidate==="object"
      &&Number.isInteger(previousCandidate.x)
      &&Number.isInteger(previousCandidate.y)
      &&["north","east","south","west"].includes(previousCandidate.facing)
      ?{x:previousCandidate.x,y:previousCandidate.y,facing:previousCandidate.facing}
      :null;
    const turnReinforcementIds=new Set([
      ...(stage.turnReinforcement?.units||[]),
      ...(stage.qinMingReinforcement?.units||[])
    ].map(unit=>unit.id));
    const raidReinforcementIds=new Set((stage.raidReinforcements||[]).map(unit=>unit.id));
    const turnReinforcementTriggered=legacyBattle.turnReinforcementTriggered===true||units.some(state=>turnReinforcementIds.has(state.id));
    const raidReinforcementSpawned=legacyBattle.raidReinforcementSpawned===true||units.some(state=>raidReinforcementIds.has(state.id));
    const stageEventTriggered=legacyBattle.stageEventTriggered===true
      ||raidReinforcementSpawned
      ||stage.battleType==="raid_escape"&&legacyBattle.activeEscape!==null&&typeof legacyBattle.activeEscape==="object";
    const zhujiaBetrayalTriggered=legacyBattle.zhujiaBetrayalTriggered===true||(stage.zhujiaBetrayal?.units||[]).some(id=>units.find(state=>state.id===id)?.team==="player");
    const zengtouBetrayalTriggered=legacyBattle.zengtouBetrayalTriggered===true||(stage.zengtouBetrayal!==undefined&&units.find(state=>state.id===stage.zengtouBetrayal.unitId)?.team==="player");
    const activeEscape=stage.battleType==="escape"
      ?{...stage.escape}
      :stage.battleType==="raid_escape"&&stageEventTriggered?{...stage.escapeAfterRaid}:null;
    const pendingStageEvent=legacyBattle.pendingStageEvent==="raid_reinforcement"&&stageEventTriggered&&!raidReinforcementSpawned
      ?"raid_reinforcement"
      :null;
    const turnDefinitions=stage.turnReinforcement?.units||stage.qinMingReinforcement?.units||[];
    const raidDefinitions=stage.raidReinforcements||[];
    return {
      schema:SAVE_FORMAT_VERSION,
      saveFormatVersion:SAVE_FORMAT_VERSION,
      gameVersion:GAME_VERSION,
      contentRevision:BATTLE_CONTENT_REVISION,
      saveKind:expectedSaveKind,
      slotId:expectedSaveKind==="recovery"?"recovery":"manual-migrated",
      revision:0,
      writerId:"legacy-migration",
      savedAt:legacy.savedAt,
      stageId:stage.id,
      turn:legacy.turn,
      phase:legacy.phase,
      random:this.legacyRandomState(stage,legacy.savedAt,units),
      units,
      interaction:{
        selectedUnitId,
        selectedCellX:hasValidSelectedCell?legacyInteraction.selectedCellX:null,
        selectedCellY:hasValidSelectedCell?legacyInteraction.selectedCellY:null,
        previous
      },
      battle:{
        activeEscape,
        logs:Array.isArray(legacyBattle.logs)
          ?legacyBattle.logs.filter(log=>typeof log==="string").slice(expectedSaveKind==="manual"?-30:-300).map(log=>log.slice(0,expectedSaveKind==="manual"?200:1000))
          :[],
        stageEventTriggered,
        pendingStageEvent,
        turnReinforcementTriggered,
        raidReinforcementSpawned,
        turnReinforcementResult:this.migratedReinforcementResult(turnDefinitions,turnReinforcementTriggered,units),
        raidReinforcementResult:this.migratedReinforcementResult(raidDefinitions,raidReinforcementSpawned,units),
        zhujiaBetrayalTriggered,
        zengtouBetrayalTriggered,
        gaotangSpellTrapDialogueTriggered:legacyBattle.gaotangSpellTrapDialogueTriggered===true,
        hiddenTraps:this.normalizeMigratedHiddenTraps(stage,legacyBattle.hiddenTraps)
      }
    }
  }

  migrateContentBattleSnapshot(snapshot,expectedSaveKind="recovery"){
    if(snapshot===null||typeof snapshot!=="object"||snapshot.schema!==SAVE_FORMAT_VERSION){return null}
    const stageIndex=this.stageIndexFromId(snapshot.stageId);
    if(stageIndex<0){return null}
    const stage=this.stages[stageIndex];
    const sourceContentRevision=snapshot.contentRevision;
    const migrated=JSON.parse(JSON.stringify(snapshot));
    migrated.schema=SAVE_FORMAT_VERSION;
    migrated.saveFormatVersion=SAVE_FORMAT_VERSION;
    migrated.gameVersion=GAME_VERSION;
    migrated.contentRevision=BATTLE_CONTENT_REVISION;
    migrated.saveKind=expectedSaveKind;
    migrated.slotId=typeof migrated.slotId==="string"?migrated.slotId:(expectedSaveKind==="recovery"?"recovery":"manual-migrated");
    migrated.revision=Number.isInteger(migrated.revision)&&migrated.revision>=0?migrated.revision:0;
    migrated.writerId=typeof migrated.writerId==="string"&&migrated.writerId.length>0?migrated.writerId:"content-migration";
    delete migrated.currentStage;
    if(migrated.random===null||typeof migrated.random!=="object"){
      migrated.random=this.legacyRandomState(stage,migrated.savedAt,Array.isArray(migrated.units)?migrated.units:[])
    }
    if(migrated.battle===null||typeof migrated.battle!=="object"){return null}
    const logLimit=expectedSaveKind==="manual"?30:300;
    const logLengthLimit=expectedSaveKind==="manual"?200:1000;
    migrated.battle.logs=Array.isArray(migrated.battle.logs)?migrated.battle.logs.filter(log=>typeof log==="string").slice(-logLimit).map(log=>log.slice(0,logLengthLimit)):[];
    migrated.battle.hiddenTraps=this.normalizeMigratedHiddenTraps(stage,migrated.battle.hiddenTraps);
    const units=Array.isArray(migrated.units)?migrated.units:[];
    if(sourceContentRevision!==BATTLE_CONTENT_REVISION){
      const templates=this.buildStageUnitTemplateMap(stage);
      const stageMap=stage.map.length===8?stage.map.flatMap(row=>[[...row],[...row]]):stage.map;
      const width=stageMap[0].length;
      const height=stageMap.length;
      const occupied=new Set();
      for(const state of units){
        if(state===null||typeof state!=="object"||typeof state.id!=="string"){return null}
        const template=templates.get(state.id);
        if(template===undefined){return null}
        const currentUnit=this.createUnitFromCurrentTemplate(stage,template);
        state.hp=Number.isFinite(state.hp)?Math.max(0,Math.min(currentUnit.maxHp,Math.trunc(state.hp))):currentUnit.maxHp;
        state.isAlive=state.hp>0;
        state.strategyUses=Number.isInteger(state.strategyUses)?Math.max(0,Math.min(currentUnit.maxStrategyUses,state.strategyUses)):currentUnit.strategyUses;
        state.bowUses=Number.isInteger(state.bowUses)?Math.max(0,Math.min(currentUnit.maxBowUses,state.bowUses)):currentUnit.bowUses;
        state.chargeUses=Number.isInteger(state.chargeUses)?Math.max(0,Math.min(currentUnit.maxChargeUses,state.chargeUses)):currentUnit.chargeUses;
        const stagePosition=stage.positions?.[state.id];
        const fallbackX=Array.isArray(stagePosition)?stagePosition[0]:currentUnit.x;
        const fallbackY=Array.isArray(stagePosition)?stagePosition[1]:currentUnit.y;
        const originX=Number.isInteger(state.x)?state.x:fallbackX;
        const originY=Number.isInteger(state.y)?state.y:fallbackY;
        const searchOriginX=originX>=0&&originX<width?originX:fallbackX;
        const searchOriginY=originY>=0&&originY<height?originY:fallbackY;
        const canUse=(x,y)=>x>=0&&x<width&&y>=0&&y<height&&this.canEnterTerrain(currentUnit,stageMap[y][x])&&(!state.isAlive||!occupied.has(`${x},${y}`));
        if(canUse(originX,originY)){
          state.x=originX;
          state.y=originY
        }else{
          let replacement=null;
          for(let radius=0;radius<width+height&&replacement===null;radius++){
            for(let y=0;y<height&&replacement===null;y++){
              for(let x=0;x<width;x++){
                if(Math.abs(x-searchOriginX)+Math.abs(y-searchOriginY)!==radius||!canUse(x,y)){continue}
                replacement={x,y};
                break
              }
            }
          }
          if(replacement===null){return null}
          state.x=replacement.x;
          state.y=replacement.y
        }
        if(state.isAlive){occupied.add(`${state.x},${state.y}`)}
      }
    }
    const turnDefinitions=stage.turnReinforcement?.units||stage.qinMingReinforcement?.units||[];
    const raidDefinitions=stage.raidReinforcements||[];
    if(migrated.battle.turnReinforcementResult===null||typeof migrated.battle.turnReinforcementResult!=="object"){
      migrated.battle.turnReinforcementResult=this.migratedReinforcementResult(turnDefinitions,migrated.battle.turnReinforcementTriggered===true,units)
    }
    if(migrated.battle.raidReinforcementResult===null||typeof migrated.battle.raidReinforcementResult!=="object"){
      migrated.battle.raidReinforcementResult=this.migratedReinforcementResult(raidDefinitions,migrated.battle.raidReinforcementSpawned===true,units)
    }
    return migrated
  }

  normalizeRecoverySnapshot(snapshot){
    if(this.saveCodec===null){return null}
    return this.saveCodec.normalizeSnapshot(snapshot,"recovery").snapshot
  }

  /**
   * B5：保存データの interaction.previous を、復元時に「戻る」で安全に使える値だけ残す。
   * previous は操作補助情報なので、不整合時は戦闘データ全体を破棄せず null へ正規化する。
   */
  normalizeSnapshotInteractionPrevious(snapshot){
    if(snapshot===null||typeof snapshot!=="object"){return false}
    const interaction=snapshot.interaction;
    if(interaction===null||typeof interaction!=="object"||interaction.previous===null){return false}

    const clearPrevious=()=>{
      interaction.previous=null;
      return true
    };

    const previous=interaction.previous;
    if(
      snapshot.phase!=="player"||
      typeof interaction.selectedUnitId!=="string"||
      !Array.isArray(snapshot.units)||
      previous===null||
      typeof previous!=="object"
    ){
      return clearPrevious()
    }

    const stageIndex=this.stageIndexFromId(snapshot.stageId);
    if(stageIndex<0){return clearPrevious()}
    const stage=this.stages[stageIndex];
    if(stage===undefined||!Array.isArray(stage.map)||stage.map.length===0||!Array.isArray(stage.map[0])){
      return clearPrevious()
    }

    const width=stage.map[0].length;
    const height=stage.map.length===8?16:stage.map.length;
    const stageMap=stage.map.length===height
      ?stage.map
      :stage.map.flatMap(row=>[[...row],[...row]]);
    const validFacings=new Set(["north","east","south","west"]);

    if(
      !Number.isInteger(previous.x)||
      !Number.isInteger(previous.y)||
      previous.x<0||previous.x>=width||
      previous.y<0||previous.y>=height||
      !validFacings.has(previous.facing)
    ){
      return clearPrevious()
    }

    const selectedState=snapshot.units.find(state=>state!==null&&typeof state==="object"&&state.id===interaction.selectedUnitId);
    if(
      selectedState===undefined||
      selectedState.team!=="player"||
      selectedState.isAlive!==true||
      selectedState.hasActed===true||
      selectedState.stationary===true||
      selectedState.actionCommitted===true||
      typeof selectedState.hasMoved!=="boolean"||
      !Number.isInteger(selectedState.x)||
      !Number.isInteger(selectedState.y)||
      selectedState.x<0||selectedState.x>=width||
      selectedState.y<0||selectedState.y>=height
    ){
      return clearPrevious()
    }

    const templates=this.buildStageUnitTemplateMap(stage);
    const template=templates.get(selectedState.id);
    if(template===undefined){return clearPrevious()}
    const currentUnit=this.createUnitFromCurrentTemplate(stage,template);

    if(!this.canEnterTerrain(currentUnit,stageMap[previous.y][previous.x])){
      return clearPrevious()
    }

    // 戻り先に別の生存部隊がいれば、復元後の「戻る」で重複配置になるため使用しない。
    const occupiedByAnother=snapshot.units.some(state=>
      state!==null&&
      typeof state==="object"&&
      state.id!==selectedState.id&&
      state.isAlive===true&&
      state.x===previous.x&&
      state.y===previous.y
    );
    if(occupiedByAnother){return clearPrevious()}

    if(!selectedState.hasMoved){
      // 移動前選択状態では previous は現在位置と現在向きそのもの。
      if(
        previous.x!==selectedState.x||
        previous.y!==selectedState.y||
        previous.facing!==selectedState.facing
      ){
        return clearPrevious()
      }
      return false
    }

    // 移動済み未確定状態では、previous は現在位置とは別の元位置でなければならない。
    if(previous.x===selectedState.x&&previous.y===selectedState.y){
      return clearPrevious()
    }

    // 部隊占有は履歴上変化し得るため経路検証には含めず、
    // 地形移動コストだけで「元位置から現在位置まで移動力内だったか」を確認する。
    const costs=new Map([[`${previous.x},${previous.y}`,0]]);
    const open=[{x:previous.x,y:previous.y,c:0}];
    const directions=[[1,0],[-1,0],[0,1],[0,-1]];
    let reachable=false;

    while(open.length>0){
      open.sort((a,b)=>a.c-b.c);
      const cur=open.shift();
      const curKey=`${cur.x},${cur.y}`;
      if(cur.c!==costs.get(curKey)){continue}
      if(cur.c>currentUnit.move){continue}
      if(cur.x===selectedState.x&&cur.y===selectedState.y){
        reachable=true;
        break
      }

      for(const [dx,dy] of directions){
        const x=cur.x+dx;
        const y=cur.y+dy;
        if(x<0||x>=width||y<0||y>=height){continue}
        const terrainType=stageMap[y][x];
        if(!this.canEnterTerrain(currentUnit,terrainType)){continue}
        const nextCost=cur.c+this.terrainMoveCost(currentUnit,terrainType);
        if(nextCost>currentUnit.move){continue}
        const key=`${x},${y}`;
        const old=costs.has(key)?costs.get(key):Infinity;
        if(nextCost<old){
          costs.set(key,nextCost);
          open.push({x,y,c:nextCost})
        }
      }
    }

    if(!reachable){return clearPrevious()}
    return false
  }

  validateBattleSnapshot(snapshot,expectedSaveKind="recovery"){
    const invalid=reason=>({valid:false,expired:false,reason});
    // B5：previous は復元可能な操作補助情報なので、厳密検査の前に安全な値だけ残す。
    this.normalizeSnapshotInteractionPrevious(snapshot);
    if(snapshot===null||typeof snapshot!=="object"){return invalid("SNAPSHOT_MISSING")}
    if(snapshot.schema!==SAVE_FORMAT_VERSION||snapshot.saveFormatVersion!==SAVE_FORMAT_VERSION||snapshot.saveKind!==expectedSaveKind){return invalid("FORMAT_INVALID")}
    if(typeof snapshot.gameVersion!=="string"||snapshot.gameVersion.length===0||snapshot.gameVersion.length>40||typeof snapshot.contentRevision!=="string"||snapshot.contentRevision.length===0||snapshot.contentRevision.length>80){return invalid("VERSION_METADATA_INVALID")}
    if(snapshot.contentRevision!==BATTLE_CONTENT_REVISION){return invalid("CONTENT_REVISION_INVALID")}
    if(typeof snapshot.slotId!=="string"||!/^[a-z0-9_-]{1,40}$/.test(snapshot.slotId)||!Number.isInteger(snapshot.revision)||snapshot.revision<0||typeof snapshot.writerId!=="string"||snapshot.writerId.length===0||snapshot.writerId.length>100){return invalid("SLOT_METADATA_INVALID")}
    if(!Number.isFinite(snapshot.savedAt)){return invalid("SAVED_AT_INVALID")}
    const age=Date.now()-snapshot.savedAt;
    if(expectedSaveKind==="recovery"&&age>7*24*60*60*1000){return {valid:false,expired:true,reason:"EXPIRED"}}
    if(age<-(5*60*1000)){return invalid("SAVED_AT_FUTURE")}
    if(snapshot.random===null||typeof snapshot.random!=="object"||snapshot.random.algorithm!=="xorshift32"||!Number.isInteger(snapshot.random.state)||snapshot.random.state<1||snapshot.random.state>0xffffffff){return invalid("RANDOM_STATE_INVALID")}

    const stageIndex=this.stageIndexFromId(snapshot.stageId);
    if(stageIndex<0){return invalid("STAGE_INVALID")}
    const stage=this.stages[stageIndex];
    const width=stage.map[0].length;
    const height=stage.map.length===8?16:stage.map.length;
    const stageMap=stage.map.length===height
      ?stage.map
      :stage.map.flatMap(row=>[[...row],[...row]]);
    if(!Number.isInteger(snapshot.turn)||snapshot.turn<1||snapshot.turn>stage.turnLimit){return invalid("TURN_INVALID")}
    if(snapshot.phase!=="player"&&snapshot.phase!=="enemy"){return invalid("PHASE_INVALID")}
    if(!Array.isArray(snapshot.units)||snapshot.units.length===0){return invalid("UNITS_INVALID")}

    const templates=this.buildStageUnitTemplateMap(stage);
    const unitIds=new Set();
    const alivePositions=new Set();
    const validFacings=new Set(["north","east","south","west"]);
    for(const state of snapshot.units){
      if(state===null||typeof state!=="object"||typeof state.id!=="string"||unitIds.has(state.id)){return invalid("UNIT_ID_INVALID")}
      unitIds.add(state.id);
      const template=templates.get(state.id);
      if(template===undefined){return invalid("UNIT_TEMPLATE_MISSING")}
      const currentUnit=this.createUnitFromCurrentTemplate(stage,template);
      if(!Number.isInteger(state.hp)||state.hp<0||state.hp>currentUnit.maxHp){return invalid("UNIT_HP_INVALID")}
      if(!Number.isInteger(state.x)||state.x<0||state.x>=width||!Number.isInteger(state.y)||state.y<0||state.y>=height){return invalid("UNIT_POSITION_INVALID")}
      if(!validFacings.has(state.facing)){return invalid("UNIT_FACING_INVALID")}
      if(state.team!=="player"&&state.team!=="enemy"){return invalid("UNIT_TEAM_INVALID")}
      if(typeof state.isAlive!=="boolean"||state.isAlive!==(state.hp>0)){return invalid("UNIT_LIFE_INVALID")}
      if(typeof state.hasMoved!=="boolean"||typeof state.actionCommitted!=="boolean"||typeof state.hasActed!=="boolean"){return invalid("UNIT_ACTION_INVALID")}
      if(state.hasActed&&!state.actionCommitted){return invalid("UNIT_COMMIT_INVALID")}
      if(!Number.isInteger(state.confusedTurns)||state.confusedTurns<0||state.confusedTurns>2){return invalid("UNIT_CONFUSION_INVALID")}
      if(!Number.isInteger(state.illusionTurns)||state.illusionTurns<0||state.illusionTurns>2){return invalid("UNIT_ILLUSION_INVALID")}
      if(!Number.isInteger(state.strategyUses)||state.strategyUses<0||state.strategyUses>currentUnit.maxStrategyUses){return invalid("UNIT_STRATEGY_USES_INVALID")}
      if(!Number.isInteger(state.bowUses)||state.bowUses<0||state.bowUses>currentUnit.maxBowUses){return invalid("UNIT_BOW_USES_INVALID")}
      if(!Number.isInteger(state.chargeUses)||state.chargeUses<0||state.chargeUses>currentUnit.maxChargeUses){return invalid("UNIT_CHARGE_USES_INVALID")}
      if(typeof state.stationary!=="boolean"||typeof state.stationaryLabel!=="string"||state.stationaryLabel.length>100||typeof state.knowsZhujiaTraps!=="boolean"){return invalid("UNIT_FLAGS_INVALID")}
      if(state.stationary&&(!state.hasMoved||!state.actionCommitted||!state.hasActed)){return invalid("STATIONARY_ACTION_INVALID")}
      if(state.isAlive){
        const positionKey=`${state.x},${state.y}`;
        if(alivePositions.has(positionKey)){return invalid("UNIT_POSITION_DUPLICATED")}
        alivePositions.add(positionKey);
        if(!this.canEnterTerrain(currentUnit,stageMap[state.y][state.x])){return invalid("UNIT_TERRAIN_INVALID")}
      }
    }
    if((stage.units||[]).some(template=>!unitIds.has(template.id))){return invalid("INITIAL_UNIT_MISSING")}

    const interaction=snapshot.interaction;
    if(interaction===null||typeof interaction!=="object"){return invalid("INTERACTION_INVALID")}
    if(interaction.selectedUnitId!==null&&typeof interaction.selectedUnitId!=="string"){return invalid("SELECTED_UNIT_INVALID")}
    if(interaction.selectedUnitId!==null&&!unitIds.has(interaction.selectedUnitId)){return invalid("SELECTED_UNIT_MISSING")}
    if(snapshot.phase==="enemy"&&interaction.selectedUnitId!==null){return invalid("ENEMY_PHASE_SELECTION_INVALID")}
    if(interaction.selectedUnitId!==null){
      const selectedState=snapshot.units.find(state=>state.id===interaction.selectedUnitId);
      if(selectedState===undefined||!selectedState.isAlive||selectedState.team!=="player"||selectedState.hasActed||selectedState.stationary){return invalid("SELECTED_UNIT_STATE_INVALID")}
    }
    const hasSelectedCell=interaction.selectedCellX!==null||interaction.selectedCellY!==null;
    if(hasSelectedCell&&(!Number.isInteger(interaction.selectedCellX)||!Number.isInteger(interaction.selectedCellY)||interaction.selectedCellX<0||interaction.selectedCellX>=width||interaction.selectedCellY<0||interaction.selectedCellY>=height)){return invalid("SELECTED_CELL_INVALID")}
    if(interaction.previous!==null){
      const previous=interaction.previous;
      if(previous===null||typeof previous!=="object"||!Number.isInteger(previous.x)||!Number.isInteger(previous.y)||previous.x<0||previous.x>=width||previous.y<0||previous.y>=height||!validFacings.has(previous.facing)){return invalid("PREVIOUS_POSITION_INVALID")}
      if(interaction.selectedUnitId===null){return invalid("PREVIOUS_WITHOUT_UNIT")}
    }

    if(snapshot.phase==="player"){
      const pendingUnits=snapshot.units.filter(state=>state.team==="player"&&state.isAlive&&!state.stationary&&!state.hasActed&&(state.hasMoved||state.actionCommitted));
      if(pendingUnits.length>1){return invalid("MULTIPLE_PENDING_UNITS")}
    }

    const battle=snapshot.battle;
    if(battle===null||typeof battle!=="object"){return invalid("BATTLE_STATE_INVALID")}
    const booleanFlags=["stageEventTriggered","turnReinforcementTriggered","raidReinforcementSpawned","zhujiaBetrayalTriggered","zengtouBetrayalTriggered","gaotangSpellTrapDialogueTriggered"];
    if(booleanFlags.some(name=>typeof battle[name]!=="boolean")){return invalid("EVENT_FLAGS_INVALID")}
    if(battle.pendingStageEvent!==null&&battle.pendingStageEvent!=="raid_reinforcement"){return invalid("PENDING_EVENT_INVALID")}
    if(stage.battleType!=="raid_escape"&&(battle.stageEventTriggered||battle.raidReinforcementSpawned||battle.pendingStageEvent!==null)){return invalid("RAID_EVENT_STAGE_INVALID")}
    if(stage.battleType==="raid_escape"){
      if(battle.raidReinforcementSpawned&&!battle.stageEventTriggered){return invalid("RAID_REINFORCEMENT_ORDER_INVALID")}
      if(battle.pendingStageEvent!==null&&(!battle.stageEventTriggered||battle.raidReinforcementSpawned)){return invalid("PENDING_RAID_EVENT_STATE_INVALID")}
    }
    if(battle.turnReinforcementTriggered&&stage.turnReinforcement===undefined&&stage.qinMingReinforcement===undefined){return invalid("TURN_REINFORCEMENT_STAGE_INVALID")}
    if(battle.zhujiaBetrayalTriggered&&stage.zhujiaBetrayal===undefined){return invalid("ZHUJIA_BETRAYAL_STAGE_INVALID")}
    if(battle.zengtouBetrayalTriggered&&stage.zengtouBetrayal===undefined){return invalid("ZENGTOU_BETRAYAL_STAGE_INVALID")}
    if(battle.gaotangSpellTrapDialogueTriggered&&!(stage.hiddenTrapZones||[]).some(zone=>zone.type==="spell")){return invalid("SPELL_TRAP_EVENT_STAGE_INVALID")}
    const zhujiaBetrayalIds=new Set(stage.zhujiaBetrayal?.units||[]);
    const zengtouBetrayalId=stage.zengtouBetrayal?.unitId||null;
    for(const state of snapshot.units){
      const currentUnit=this.createUnitFromCurrentTemplate(stage,templates.get(state.id));
      const baseKnowsTraps=currentUnit.knowsZhujiaTraps===true;
      const matchesBaseState=state.team===currentUnit.team
        &&state.stationary===currentUnit.stationary
        &&state.stationaryLabel===currentUnit.stationaryLabel
        &&state.knowsZhujiaTraps===baseKnowsTraps;
      const canJoinFromZhujia=battle.zhujiaBetrayalTriggered&&zhujiaBetrayalIds.has(state.id);
      const canJoinFromZengtou=battle.zengtouBetrayalTriggered&&zengtouBetrayalId===state.id;
      const matchesJoinedState=(canJoinFromZhujia||canJoinFromZengtou)
        &&state.team==="player"
        &&!state.stationary
        &&state.stationaryLabel===""
        &&state.knowsZhujiaTraps===canJoinFromZhujia;
      if(!matchesBaseState&&!matchesJoinedState){return invalid("UNIT_ALLEGIANCE_STATE_INVALID")}
      if(state.isAlive&&(canJoinFromZhujia||canJoinFromZengtou)&&!matchesJoinedState){return invalid("LIVING_BETRAYAL_UNIT_STATE_INVALID")}
    }
    if(battle.stageEventTriggered){
      const initialEnemyIds=stage.raidInitialEnemyIds||stage.units.filter(unit=>unit.team==="enemy").map(unit=>unit.id);
      if(initialEnemyIds.some(id=>snapshot.units.find(state=>state.id===id)?.isAlive!==false)){return invalid("RAID_INITIAL_ENEMY_STATE_INVALID")}
    }
    const logLimit=expectedSaveKind==="manual"?30:300;
    const logLengthLimit=expectedSaveKind==="manual"?200:1000;
    if(!Array.isArray(battle.logs)||battle.logs.length>logLimit||battle.logs.some(log=>typeof log!=="string"||log.length>logLengthLimit)){return invalid("LOGS_INVALID")}
    const expectedEscape=stage.battleType==="escape"
      ?stage.escape
      :stage.battleType==="raid_escape"&&battle.stageEventTriggered?stage.escapeAfterRaid:null;
    if((expectedEscape===null||expectedEscape===undefined)!==(battle.activeEscape===null)){return invalid("ESCAPE_STATE_INVALID")}
    if(battle.activeEscape!==null){
      const escape=battle.activeEscape;
      if(escape===null||typeof escape!=="object"||!Number.isInteger(escape.x)||escape.x<0||escape.x>=width||!Number.isInteger(escape.y)||escape.y<0||escape.y>=height||!Number.isInteger(escape.radius)||escape.radius<0||!Array.isArray(escape.required)||escape.required.some(id=>typeof id!=="string"||!templates.has(id))){return invalid("ESCAPE_INVALID")}
      if(escape.x!==expectedEscape.x||escape.y!==expectedEscape.y||escape.radius!==expectedEscape.radius||escape.required.length!==expectedEscape.required.length||escape.required.some((id,index)=>id!==expectedEscape.required[index])){return invalid("ESCAPE_DEFINITION_INVALID")}
    }
    if(!Array.isArray(battle.hiddenTraps)){return invalid("TRAPS_INVALID")}
    const turnReinforcementIds=new Set([
      ...(stage.turnReinforcement?.units||[]),
      ...(stage.qinMingReinforcement?.units||[])
    ].map(unit=>unit.id));
    if(!battle.turnReinforcementTriggered&&[...turnReinforcementIds].some(id=>unitIds.has(id))){return invalid("TURN_REINFORCEMENT_FLAG_INVALID")}
    const raidReinforcementIds=new Set((stage.raidReinforcements||[]).map(unit=>unit.id));
    if(!battle.raidReinforcementSpawned&&[...raidReinforcementIds].some(id=>unitIds.has(id))){return invalid("RAID_REINFORCEMENT_FLAG_INVALID")}
    const validateReinforcementResult=(result,expectedIds,triggered)=>{
      if(result===null||typeof result!=="object"||!Array.isArray(result.spawnedUnitIds)||!Array.isArray(result.failedUnitIds)){return false}
      const spawned=new Set(result.spawnedUnitIds);
      const failed=new Set(result.failedUnitIds);
      if(spawned.size!==result.spawnedUnitIds.length||failed.size!==result.failedUnitIds.length){return false}
      if([...spawned].some(id=>typeof id!=="string"||!expectedIds.has(id)||!unitIds.has(id))){return false}
      if([...failed].some(id=>typeof id!=="string"||!expectedIds.has(id)||unitIds.has(id)||spawned.has(id))){return false}
      if(!triggered){return spawned.size===0&&failed.size===0}
      return expectedIds.size===spawned.size+failed.size&&[...expectedIds].every(id=>spawned.has(id)||failed.has(id))
    };
    if(!validateReinforcementResult(battle.turnReinforcementResult,turnReinforcementIds,battle.turnReinforcementTriggered)){return invalid("TURN_REINFORCEMENT_RESULT_INVALID")}
    if(!validateReinforcementResult(battle.raidReinforcementResult,raidReinforcementIds,battle.raidReinforcementSpawned)){return invalid("RAID_REINFORCEMENT_RESULT_INVALID")}
    const trapDefinitions=new Map();
    for(const zone of stage.hiddenTrapZones||[]){
      for(const position of zone.candidates||[]){
        trapDefinitions.set(`${position[0]},${position[1]}`,{
          type:zone.type||"normal",
          label:zone.label||"中央戦域",
          damage:zone.damage,
          confusionTurns:zone.confusionTurns,
          illusionTurns:zone.illusionTurns
        })
      }
    }
    const trapPositions=new Set();
    for(const trap of battle.hiddenTraps){
      if(trap===null||typeof trap!=="object"||!Number.isInteger(trap.x)||trap.x<0||trap.x>=width||!Number.isInteger(trap.y)||trap.y<0||trap.y>=height||(trap.type!=="normal"&&trap.type!=="spell")||typeof trap.label!=="string"||trap.label.length>100||typeof trap.active!=="boolean"){return invalid("TRAP_INVALID")}
      const trapPositionKey=`${trap.x},${trap.y}`;
      if(trapPositions.has(trapPositionKey)){return invalid("TRAP_POSITION_DUPLICATED")}
      trapPositions.add(trapPositionKey);
      const definition=trapDefinitions.get(trapPositionKey);
      if(definition===undefined||definition.type!==trap.type||definition.label!==trap.label){return invalid("TRAP_DEFINITION_INVALID")}
      for(const name of ["damage","confusionTurns","illusionTurns"]){
        if(trap[name]!==undefined&&!Number.isFinite(trap[name])){return invalid("TRAP_VALUE_INVALID")}
        if(trap[name]!==definition[name]){return invalid("TRAP_VALUE_MISMATCH")}
      }
    }
    const expectedTrapCount=(stage.hiddenTrapZones||[]).reduce((total,zone)=>total+Math.min(zone.count||0,(zone.candidates||[]).length),0);
    if(battle.hiddenTraps.length!==expectedTrapCount){return invalid("TRAP_COUNT_INVALID")}
    for(const zone of stage.hiddenTrapZones||[]){
      const candidateKeys=new Set((zone.candidates||[]).map(position=>`${position[0]},${position[1]}`));
      const actualCount=battle.hiddenTraps.filter(trap=>candidateKeys.has(`${trap.x},${trap.y}`)).length;
      if(actualCount!==Math.min(zone.count||0,(zone.candidates||[]).length)){return invalid("TRAP_ZONE_COUNT_INVALID")}
    }
    return {valid:true,expired:false,reason:""}
  }

  /**
   * 保存要求を短時間でまとめる。中間状態の場合はSaveServiceが次の安定状態まで保留する。
   */
  queueRecoverySnapshot(){
    if(this.saveService===null){
      this.notifySaveFailureOnce();
      return {ok:false,status:"failed",code:"SAVE_SERVICE_UNAVAILABLE",slotId:"recovery"}
    }
    return this.saveService.requestSave("recovery","recovery",500)
  }

  /**
   * 現在の戦闘状態を、タブ破棄後の復元用として保存する。
   */
  saveRecoverySnapshot(){
    if(this.saveService===null){
      this.notifySaveFailureOnce();
      return false
    }
    return this.saveService.requestSave("recovery","recovery",0).ok
  }

  /**
   * 正常終了・ステージ選択時は、主データ・前回正常データ・一時データを削除する。
   */
  clearRecoverySnapshot(){
    if(this.saveService===null){return false}
    return this.saveService.clearSlot("recovery").ok
  }

  parseRecoveryCandidate(raw){
    if(this.saveCodec===null){return {snapshot:null,valid:false,expired:false,migrated:false,reason:"SAVE_CODEC_UNAVAILABLE"}}
    return this.saveCodec.parseCandidate(raw,"recovery")
  }

  /**
   * 主データを検査し、破損時は前回正常データへフォールバックする。
   */
  readRecoverySnapshot(selectionGuard=null){
    if(this.saveService===null){return null}
    try{
      return this.saveService.readSlot("recovery","recovery",selectionGuard).snapshot
    }catch(error){
      console.error("[戦旗水滸伝] 戦闘データ読込エラー",error);
      this.notifySaveFailureOnce();
      return null
    }
  }

  /**
   * 起動時の確認画面へ表示する自動復元候補と、選択時照合用ガードを同時に取得する。
   */
  inspectRecoverySelection(){
    if(this.saveService===null){return null}
    try{
      const selection=this.saveService.inspectSlot("recovery","recovery");
      if(selection.snapshot!==null){return selection}
      // 破損・非対応データの通知と、既存の安全な後始末は共通読込処理へ任せる。
      this.readRecoverySnapshot(selection.guard);
      return null
    }catch(error){
      console.error("[戦旗水滸伝] 自動復元候補の確認エラー",error);
      this.notifySaveFailureOnce();
      return null
    }
  }

  /**
   * タイトル演出終了後、ステージ選択画面で直前の戦闘を読み込むか確認する。
   * 自動復元は行わない。
   */
  showRecoveryPromptAfterOpening(){
    if(this.recoveryPromptShown){return false}
    this.recoveryPromptShown=true;
    const selection=this.inspectRecoverySelection();
    if(selection===null){return false}
    const snapshot=selection.snapshot;

    this.pendingRecoverySnapshot=snapshot;
    this.pendingRecoverySelectionGuard=selection.guard;
    const stage=this.stages[this.stageIndexFromId(snapshot.stageId)];
    const savedAt=new Date(snapshot.savedAt);
    const savedText=Number.isNaN(savedAt.getTime())
      ?"保存日時不明"
      :savedAt.toLocaleString("ja-JP");
    const phaseText=snapshot.phase==="enemy"?"敵軍ターン":"自軍ターン";
    this.e("recoverySummary").textContent=`${stage.title}\n第${Number.isInteger(snapshot.turn)&&snapshot.turn>0?snapshot.turn:1}ターン・${phaseText}\n${savedText}`;
    const overlay=this.e("recoveryOverlay");
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden","false");
    return true
  }

  /**
   * 復元確認を閉じ、ステージ選択を続行する。
   * この時点では退避データを削除せず、新しいステージを選択した時に破棄する。
   */
  closeRecoveryPrompt(){
    const overlay=this.e("recoveryOverlay");
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden","true");
    this.pendingRecoverySnapshot=null;
    this.pendingRecoverySelectionGuard=null
  }

  /**
   * 「読み込む」が選ばれた場合、先に対象ステージへ画面遷移し、次の描画後に退避状態を適用する。
   */
  loadRecoveryFromPrompt(){
    if(this.saveService===null){
      this.closeRecoveryPrompt();
      this.showSaveStatusMessage("ブラウザの保存機能を利用できません。");
      return false
    }

    let selectionGuard=this.pendingRecoverySelectionGuard;
    if(selectionGuard===null){
      const selection=this.inspectRecoverySelection();
      if(selection===null){
        this.closeRecoveryPrompt();
        return false
      }
      selectionGuard=selection.guard
    }

    // リカバリーデータの読込を開始する時点で、音声準備待ち中の古いステージ開始要求を失効させる。
    this.invalidateStageLaunchRequests();
    let result=null;
    try{
      result=this.saveService.readSlot("recovery","recovery",selectionGuard)
    }catch(error){
      console.error("[戦旗水滸伝] 起動時の戦闘データ読込エラー",error)
    }
    if(result===null||result.snapshot===null){
      const conflict=result?.status==="conflict";
      this.closeRecoveryPrompt();
      this.showSaveStatusMessage(conflict
        ?"別のタブで自動復元データが更新されたため、読み込みを中止しました。ページを再読み込みしてください。"
        :"戦闘データを読み込めませんでした。");
      return false
    }

    const snapshot=result.snapshot;
    this.closeRecoveryPrompt();
    return this.beginSaveLoadTransition(snapshot,"recovery")
  }

  /**
   * 戦闘データの復元に失敗した場合、中間状態を破棄してステージ選択へ安全に戻す。
   * 壊れた復元データを再提示しないよう保存データも削除し、旧復元セッションを無効化する。
   */
  handleSaveLoadFailure(sessionId,error,saveKind="recovery"){
    if(!this.isBattleSessionActive(sessionId)){return false}
    console.error("[戦旗水滸伝] 戦闘データ復元エラー",error);
    this.saveLoadRestoring=false;
    this.pendingRecoverySnapshot=null;
    this.pendingRecoverySelectionGuard=null;
    if(saveKind==="recovery"){this.clearRecoverySnapshot()}
    this.openStageSelect();
    this.showSaveStatusMessage(saveKind==="manual"?"手動セーブを読み込めなかったため、ステージ選択へ戻りました。":"戦闘データを復元できなかったため、ステージ選択へ戻りました。")
    return false
  }

  /**
   * 復元対象ステージを通常の初期状態で一度描画し、戦闘画面への遷移を成立させる。
   * @param {object} snapshot 復元する保存データ
   * @param {string} saveKind 保存種別
   */
  beginSaveLoadTransition(snapshot,saveKind="recovery"){
    if(snapshot===null||snapshot===undefined){return false}

    // 実際のロード開始時だけ、音声準備待ち中の古いステージ開始要求を失効させる。
    this.invalidateStageLaunchRequests();
    this.saveLoadRestoring=true;
    const sessionId=this.beginBattleSession();
    try{
      const stageIndex=this.stageIndexFromId(snapshot.stageId);
      if(stageIndex<0){throw new Error("STAGE_ID_INVALID")}
      const stage=this.stages[stageIndex];
      this.currentStage=stageIndex;
      this.applyStageBoardClass(stage);

      const sourceMapHeight=stage.map.length;
      this.width=stage.map[0].length;
      this.height=sourceMapHeight===8?16:sourceMapHeight;
      this.board.style.gridTemplateColumns=`repeat(${this.width},var(--cell))`;
      this.board.style.gridTemplateRows=`repeat(${this.height},var(--cell))`;
      const mapIsExpanded=sourceMapHeight===this.height;
      this.map=this.expandMapRows(stage.map);
      this.units=stage.units.map(data=>new Unit({...data,y:mapIsExpanded?data.y:data.y*2}));

      if(stage.positions!==undefined){
        for(const unit of this.units){
          const position=stage.positions[unit.id];
          if(position!==undefined){
            unit.x=position[0];
            unit.y=position[1]
          }
        }
      }

      const stationaryIds=new Set(stage.stationaryUnits||[]);
      const stationaryLabels=stage.stationaryLabels||{};
      for(const unit of this.units){
        unit.stationary=stationaryIds.has(unit.id);
        unit.stationaryLabel=unit.stationary?(stationaryLabels[unit.id]||""):"";
        if(unit.stationary){
          unit.hasMoved=true;
          this.markUnitActionCompleted(unit)
        }
      }

      this.resetStageState(stage);
      this.initializeHiddenTraps(stage);
      this.locked=true;
      this.e("stageOverlay").classList.remove("show");
      this.e("resultOverlay").classList.remove("show");
      this.hideDialogue();
      this.hideMissionConditions();
      this.e("stageTitle").textContent=stage.title+" — "+stage.description;
      this.addLog(saveKind==="manual"?"手動セーブを読み込んでいます……":"前回の戦闘データを読み込んでいます……");
      this.showBlankInfo();
      this.render();
      this.audio.startBattleThemeForStage(stage.chapterNumber-1).catch(()=>{});

      window.requestAnimationFrame(()=>{
        window.requestAnimationFrame(()=>{
          if(this.isBattleSessionActive(sessionId)){
            this.restoreBattleSnapshot(snapshot,sessionId,saveKind)
          }
        })
      });
      return true
    }catch(error){
      return this.handleSaveLoadFailure(sessionId,error,saveKind)
    }
  }

  /**
   * 保存済みイベント状態と現在の章定義から、画面表示用の勝敗条件を再構築する。
   * HTML文字列そのものはセーブデータから受け取らない。
   */
  restoreCurrentObjective(stage){
    this.currentObjective=stage.objective;
    if(stage.battleType!=="raid_escape"){return}
    if(this.stageEventTriggered){
      this.currentObjective=stage.escapeObjective;
      return
    }
    if(stage.raidTurnLimit===undefined){return}
    const remaining=Math.max(0,stage.raidTurnLimit-this.turn+1);
    this.currentObjective=`勝利：${stage.raidTurnLimit}ターン以内に護送車を含む初期護送部隊を殲滅し、その後、晁蓋が北の旗へ到達。または追捕軍出現後、敵軍を全滅（護送部隊殲滅まで残り${remaining}ターン）<br>敗北：晁蓋が敗走・${stage.raidTurnLimit}ターン以内に護送部隊を殲滅できない`
  }

  /**
   * 戦闘画面へ遷移した後で、直前の盤面・ターン・状態を復元する。
   * @param {object} snapshot 復元する保存データ
   * @param {number} sessionId 復元対象の戦闘セッション番号
   * @param {string} saveKind 保存種別
   */
  restoreBattleSnapshot(snapshot,sessionId,saveKind="recovery"){
    if(!this.isBattleSessionActive(sessionId)){
      this.saveLoadRestoring=false;
      return false
    }

    try{
      const validation=this.validateBattleSnapshot(snapshot,saveKind);
      if(!validation.valid){throw new Error(`SNAPSHOT_NOT_VALIDATED: ${validation.reason}`)}
      const stage=this.stages[this.stageIndexFromId(snapshot.stageId)];
      const templates=this.buildStageUnitTemplateMap(stage);
      this.units=snapshot.units.map(state=>{
        const template=templates.get(state.id);
        if(template===undefined){throw new Error(`UNIT_TEMPLATE_MISSING: ${state.id}`)}
        const unit=this.createUnitFromCurrentTemplate(stage,template);
        unit.hp=state.hp;
        unit.x=state.x;
        unit.y=state.y;
        unit.facing=state.facing;
        unit.team=state.team;
        unit.isAlive=state.isAlive;
        unit.hasMoved=state.hasMoved;
        unit.actionCommitted=state.actionCommitted;
        unit.hasActed=state.hasActed;
        unit.confusedTurns=state.confusedTurns;
        unit.illusionTurns=state.illusionTurns;
        unit.strategyUses=state.strategyUses;
        unit.bowUses=state.bowUses;
        unit.chargeUses=state.chargeUses;
        unit.stationary=state.stationary;
        unit.stationaryLabel=state.stationaryLabel;
        unit.knowsZhujiaTraps=state.knowsZhujiaTraps;
        return unit
      });

      this.resetStageState(stage);
      this.battleRandom.importState(snapshot.random);
      const battle=snapshot.battle;
      this.turn=Number.isInteger(snapshot.turn)&&snapshot.turn>0?snapshot.turn:1;
      this.phase=snapshot.phase==="enemy"?"enemy":"player";
      this.mode="select";
      this.selectedUnitId=null;
      this.pendingFacingUnitId=null;
      this.selectedCellX=null;
      this.selectedCellY=null;
      this.reachable.clear();
      this.previous=null;
      this.facingCanUndoMovement=false;
      this.selectedStrategyLevel=0;
      this.locked=this.phase==="enemy";
      this.finished=false;
      this.finishing=false;
      this.actionResolutionInProgress=false;
      this.playerTurnSetupInProgress=false;
      this.playerTurnSetupSessionId=null;
      this.playerTurnSetupFailed=false;
      this.dialogueActive=false;
      this.missionActive=false;
      this.activeEscape=battle.activeEscape===null?null:{...battle.activeEscape};
      this.logs=battle.logs.slice(-300);
      this.stageEventTriggered=battle.stageEventTriggered;
      this.pendingStageEvent=battle.pendingStageEvent;
      this.turnReinforcementTriggered=battle.turnReinforcementTriggered;
      this.raidReinforcementSpawned=battle.raidReinforcementSpawned;
      this.turnReinforcementResult={
        spawnedUnitIds:[...battle.turnReinforcementResult.spawnedUnitIds],
        failedUnitIds:[...battle.turnReinforcementResult.failedUnitIds]
      };
      this.raidReinforcementResult={
        spawnedUnitIds:[...battle.raidReinforcementResult.spawnedUnitIds],
        failedUnitIds:[...battle.raidReinforcementResult.failedUnitIds]
      };
      this.zhujiaBetrayalTriggered=battle.zhujiaBetrayalTriggered;
      this.zengtouBetrayalTriggered=battle.zengtouBetrayalTriggered;
      this.gaotangSpellTrapDialogueTriggered=battle.gaotangSpellTrapDialogueTriggered;
      this.hiddenTraps=battle.hiddenTraps.map(trap=>({...trap}));
      this.restoreCurrentObjective(stage);

      // 対象選択など一時的な画面状態は復元せず、部隊の行動状態から安全な操作段階を再構成する。
      let restoredActiveUnit=null;
      if(this.phase==="player"){
        const interaction=snapshot.interaction;
        if(interaction!==null){
          const candidate=this.units.find(unit=>unit.id===interaction.selectedUnitId&&unit.isAlive&&unit.team==="player"&&!unit.hasActed&&!unit.stationary)||null;
          if(candidate!==null){
            restoredActiveUnit=candidate;
            const savedPrevious=interaction.previous;
            if(savedPrevious!==null&&typeof savedPrevious==="object"&&Number.isInteger(savedPrevious.x)&&Number.isInteger(savedPrevious.y)){
              this.previous={x:savedPrevious.x,y:savedPrevious.y,facing:savedPrevious.facing||candidate.facing}
            }
          }else if(Number.isInteger(interaction.selectedCellX)&&Number.isInteger(interaction.selectedCellY)&&this.inside(interaction.selectedCellX,interaction.selectedCellY)){
            this.selectedCellX=interaction.selectedCellX;
            this.selectedCellY=interaction.selectedCellY
          }
        }

        if(restoredActiveUnit===null){
          const committedPending=this.alive("player").filter(unit=>unit.actionCommitted===true&&!unit.hasActed&&!unit.stationary);
          if(committedPending.length>0){restoredActiveUnit=committedPending[0]}
        }
        if(restoredActiveUnit===null){
          const movedPending=this.alive("player").filter(unit=>unit.hasMoved&&!unit.hasActed&&!unit.stationary);
          if(movedPending.length>0){restoredActiveUnit=movedPending[0]}
        }
      }

      this.addLog(saveKind==="manual"?"手動セーブを読み込みました。":"直前の戦闘データを読み込みました。");
      this.saveLoadRestoring=false;

      if(restoredActiveUnit!==null){
        if(restoredActiveUnit.actionCommitted===true&&!restoredActiveUnit.hasActed){
          this.resumeCommittedUnitFacing(restoredActiveUnit)
        }else if(restoredActiveUnit.hasMoved){
          this.resumeMovedUnitAction(restoredActiveUnit)
        }else{
          this.selectedUnitId=restoredActiveUnit.id;
          this.setSelectedCellToUnit(restoredActiveUnit);
          this.mode="move";
          this.facingCanUndoMovement=false;
          if(this.previous===null){this.previous={x:restoredActiveUnit.x,y:restoredActiveUnit.y,facing:restoredActiveUnit.facing}}
          this.reachable=this.calcReachable(restoredActiveUnit);
          const available=this.availableActionNames(restoredActiveUnit);
          this.showInfo(restoredActiveUnit,this.hasAdjacentEnemy(restoredActiveUnit)?`赤丸の敵を直接攻撃できます。${available.length>0?" 使用可能："+available.join("・")+"。":""} 移動、または「待機」でその場の方向転換も選べます。`:`移動先を選べます。${available.length>0?" 使用可能："+available.join("・")+"。":""} 移動せず向きだけ変える場合は「待機」を選べます。`);
          this.render()
        }
        window.setTimeout(()=>this.keepCellVisible(restoredActiveUnit.x,restoredActiveUnit.y),80)
      }else{
        this.showBlankInfo();
        this.render();
        window.setTimeout(()=>this.scrollBoardToPlayer(),80)
      }

      if(this.phase==="player"){
        if(saveKind==="manual"){
          this.saveRecoverySnapshot()
        }else{
          this.queueRecoverySnapshot()
        }
      }
      if(this.phase==="enemy"){
        window.setTimeout(()=>{
          if(this.isBattleSessionActive(sessionId)&&!this.finished){
            this.enemyTurn(true)
          }
        },100)
      }
      return true
    }catch(error){
      return this.handleSaveLoadFailure(sessionId,error,saveKind)
    }finally{
      // 成功・失敗のどちらでも、現在の復元セッションに保存禁止フラグを残さない。
      if(this.isBattleSessionActive(sessionId)&&this.saveLoadRestoring){
        this.saveLoadRestoring=false
      }
    }
  }

  createStages(){
    return [
      {
        id:"shaohuashan-road",
        chapterNumber:1,
        turnLimit:15,
        title:"第一章　少華山への道",
        description:"史進と少華山三頭領で、山道各所の官軍と後方の追手を突破し、少華山へ脱出する。敵軍を全滅させても勝利となる。",
        objective:"勝利：史進が北の旗へ到達、または敵軍を全滅<br>敗北：史進が敗走",
        leader:"shi_jin",
        battleType:"escape",
        allowAnnihilationVictory:true,
        escape:{x:3,y:0,radius:0,required:["shi_jin"]},
        positions:{
          shi_jin:[1,14],zhu_wu:[0,12],chen_da:[2,14],yang_chun:[3,14],
          captain1:[6,15],soldier1:[7,14],soldier2:[5,4],guard1:[3,2],
          mid_guard1:[1,10],mid_soldier1:[6,9],mid_archer1:[2,7],strategist1:[5,8]
        },
        intro:[
          {unit:"shi_jin",text:"官軍が迫っている。ここで囲まれる前に、少華山へ抜けるぞ！"},
          {unit:"zhu_wu",text:"北の旗を目指しましょう。前には守備兵、後ろには追手がいます。"}
        ],
        victory:[
          {unit:"shi_jin",text:"よし、包囲を抜けた！　このまま少華山へ急ぐぞ！"},
          {unit:"zhu_wu",text:"追手もすぐには追いつけますまい。皆、無事で何よりです。"}
        ],
        map:[
          ["mountain","mountain","mountain","hill","mountain","forest","mountain","mountain"],
          ["mountain","mountain","mountain","hill","mountain","forest","mountain","mountain"],
          ["mountain","forest","plain","plain","road","road","forest","mountain"],
          ["mountain","forest","plain","plain","plain","road","forest","mountain"],
          ["forest","hill","forest","forest","water","hill","road","mountain"],
          ["forest","hill","forest","forest","water","hill","road","mountain"],
          ["forest","road","hill","forest","water","forest","road","forest"],
          ["forest","road","hill","forest","water","forest","road","forest"],
          ["plain","road","plain","hill","water","plain","road","forest"],
          ["plain","road","plain","hill","water","plain","road","forest"],
          ["forest","road","road","road","road","road","road","plain"],
          ["forest","road","plain","plain","plain","plain","road","plain"],
          ["plain","road","forest","hill","plain","forest","plain","plain"],
          ["plain","road","forest","hill","plain","forest","plain","plain"],
          ["plain","road","plain","hill","plain","plain","plain","plain"],
          ["road","plain","plain","hill","plain","plain","plain","plain"]
        ],
        units:[
          this.createPlayerCharacterUnit("shi_jin","shi_jin",1,7,4,"north"),
          this.createPlayerCharacterUnit("zhu_wu","zhu_wu",0,6,4,"north"),
          this.createPlayerCharacterUnit("chen_da","chen_da",2,7,4,"north"),
          this.createPlayerCharacterUnit("yang_chun","yang_chun",3,7,4,"north"),
          this.u("captain1","官軍騎兵隊長","騎","enemy",6,1,52,48,34,28,4,"south","mob_captain_unreliable_middle","官軍騎兵隊長","騎乗戦闘","なし","慎重・威圧的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("soldier1","官兵甲","甲","enemy",7,2,36,32,20,18,3,"south","mob_infantry_very_weak","官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("soldier2","官軍弓兵","弓","enemy",6,3,35,34,24,18,3,"south","mob_bow_very_weak","官軍弓兵","弓弩術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("guard1","関所守備兵","守","enemy",5,0,44,46,28,25,2,"south","mob_infantry_older_weak","守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("mid_guard1","山道守備兵","守","enemy",1,10,43,47,30,24,3,"south","mob_infantry_older_weak","山道守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("mid_soldier1","官兵乙","乙","enemy",6,9,39,38,24,20,3,"south","mob_infantry_young_weak","官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("mid_archer1","山道弓兵","弓","enemy",2,7,37,38,30,20,3,"south","mob_bow_young_weak","官軍弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("strategist1","官軍参謀","謀","enemy",5,8,22,46,88,40,3,"south","mob_adviser_military_frontline","官軍参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定")
        ]
      },
      {
        id:"wild-boar-forest",
        chapterNumber:2,
        turnLimit:15,
        title:"第二章　野猪林の危機",
        description:"林冲を狙う董超・薛覇と増派された開封府の公人・参謀部隊を、魯智深とともに退ける。",
        objective:"勝利：董超・薛覇らを全滅<br>敗北：林冲が敗走",
        leader:"lin_chong",
        positions:{
          lin_chong:[3,12],lu_zhishen:[2,14],dong_chao:[4,2],xue_ba:[2,4],
          escort_yz1:[5,6],escort_yz2:[6,2],escort_yz4:[5,10],escort_yz5:[1,4],kaifeng_adviser:[1,8]
        },
        intro:[
          {unit:"lin_chong",text:"董超、薛覇……まさか、ここで俺を殺すつもりだったのか。"},
          {unit:"lu_zhishen",text:"林冲、話はあとだ！　まずはこいつらを叩き伏せるぞ！"}
        ],
        victory:[
          {unit:"lu_zhishen",text:"はっはっは！　これで悪党どもは片付いたな！"},
          {unit:"lin_chong",text:"魯智深、この恩は忘れぬ。だが俺の受難は、まだ終わりそうにない。"}
        ],
        map:[
          ["forest","forest","forest","road","plain","forest","forest","forest"],
          ["forest","forest","forest","road","plain","forest","forest","forest"],
          ["forest","road","road","road","road","road","road","forest"],
          ["forest","road","plain","plain","plain","plain","road","forest"],
          ["forest","road","forest","plain","plain","forest","road","forest"],
          ["forest","road","forest","plain","plain","forest","road","forest"],
          ["plain","road","forest","hill","hill","forest","road","plain"],
          ["plain","road","forest","hill","hill","forest","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["forest","road","forest","plain","plain","forest","road","forest"],
          ["forest","road","forest","plain","plain","forest","road","forest"],
          ["forest","road","plain","plain","plain","plain","road","forest"],
          ["forest","road","road","road","road","road","road","forest"],
          ["forest","forest","forest","plain","road","forest","forest","forest"],
          ["forest","forest","forest","plain","road","forest","forest","forest"]
        ],
        units:[
          this.createPlayerCharacterUnit("lin_chong","lin_chong",3,6,4,"north"),
          this.createPlayerCharacterUnit("lu_zhishen","lu_zhishen",2,7,3,"north"),
          this.createEnemyCharacterUnit("dong_chao","dong_chao",4,1,3,"south"),
          this.createEnemyCharacterUnit("xue_ba","xue_ba",2,2,3,"south"),
          this.u("escort_yz1","開封府公人丙一隊","丙","enemy",5,3,36,34,24,18,3,"south","mob_infantry_young_weak","下級公人","なし","なし","小心・未熟","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("escort_yz2","開封府公人丙二隊","丙","enemy",6,1,36,34,24,18,3,"south","mob_infantry_young_weak","下級公人","なし","なし","小心・未熟","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("escort_yz4","開封府公人丁","丁","enemy",5,5,34,32,22,16,3,"south","mob_infantry_very_weak","下級公人","なし","なし","小心・未熟","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("escort_yz5","開封府弓兵","弓","enemy",1,2,40,40,34,20,3,"south","mob_bow_older_weak","開封府弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("kaifeng_adviser","開封府参謀","謀","enemy",1,4,24,48,88,42,3,"south","mob_adviser_civil_document","開封府参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定")
        ]
      },
      {
        id:"birthday-convoy",
        chapterNumber:3,
        turnLimit:15,
        title:"第三章　生辰綱奪取",
        description:"晁蓋・呉用らで5ターン以内に護送車を含む初期護送部隊を全滅させ、第5自軍ターン開始時、または第5自軍ターン中の護送隊壊滅直後に現れる追捕軍をかわして北の湿地帯へ脱出する。追捕軍出現後は敵軍を全滅させても勝利となる。",
        objective:"勝利：5ターン以内に護送車を含む初期護送部隊を殲滅し、その後、晁蓋が北の旗へ到達。または追捕軍出現後、敵軍を全滅<br>敗北：晁蓋が敗走・5ターン以内に護送部隊を殲滅できない",
        raidTurnLimit:5,
        raidReinforcementTurn:5,
        escapeObjective:"勝利：生辰綱を奪取し、晁蓋が北端の旗へ到達。または追捕軍出現後、敵軍を全滅<br>敗北：晁蓋が敗走",
        leader:"chao_gai",
        battleType:"raid_escape",
        escapeAfterRaid:{x:3,y:0,radius:0,required:["chao_gai"]},
        stationaryUnits:["convoy_cart"],
        intro:[
          {unit:"wu_yong",text:"護送車だけを狙っても護送隊は追ってきます。五ターン以内に楊志を含む初期護送部隊を全滅させ、その後、晁蓋殿を北の旗まで退かせましょう。"},
          {unit:"chao_gai",text:"よし！　七星と白勝、護送隊を打ち破って生辰綱を奪い取るぞ！"},
          {unit:"ruan_xiaoer",text:"北は水と湿地だ。俺たち水軍なら動きやすい。退路は任せろ。"}
        ],
        raidArrivalDialogue:[
          {unit:"raid_captain",action:"官軍増援",text:"追捕軍、到着！　生辰綱を狙う賊どもを一人も逃がすな！"},
          {unit:"wu_yong",text:"追捕軍が来ました。作戦どおり生辰綱を奪取し、北の湿地へ抜けます。包囲される前に道を開きましょう！"}
        ],
        victory:[
          {unit:"chao_gai",text:"官軍の包囲を抜けた！　生辰綱を持って、このまま逃げ切るぞ！"},
          {unit:"wu_yong",text:"湿地を退路に選んだ甲斐がありました。追手が立て直す前に散りましょう。"}
        ],
        map:[
          ["water","water","swamp","swamp","water","water","water","water"],
          ["water","swamp","swamp","water","water","swamp","water","water"],
          ["swamp","swamp","water","water","swamp","swamp","swamp","water"],
          ["water","swamp","swamp","swamp","swamp","water","swamp","swamp"],
          ["swamp","swamp","water","swamp","swamp","swamp","swamp","water"],
          ["plain","swamp","swamp","swamp","road","swamp","swamp","plain"],
          ["forest","plain","road","road","road","road","plain","forest"],
          ["forest","plain","road","forest","plain","road","plain","forest"],
          ["plain","plain","road","hill","hill","road","plain","plain"],
          ["plain","road","road","road","road","road","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["road","road","road","road","road","road","road","road"],
          ["plain","plain","plain","plain","plain","plain","plain","plain"],
          ["plain","plain","plain","plain","plain","plain","plain","plain"]
        ],
        units:[
          this.createPlayerCharacterUnit("chao_gai","chao_gai",2,15,4,"north"),
          this.createPlayerCharacterUnit("wu_yong","wu_yong",1,15,4,"north"),
          this.createPlayerCharacterUnit("gongsun_sheng","gongsun_sheng",3,15,4,"north"),
          this.createPlayerCharacterUnit("liu_tang","liu_tang",4,15,4,"north"),
          this.createPlayerCharacterUnit("ruan_xiaoer","ruan_xiaoer",0,14,4,"north"),
          this.createPlayerCharacterUnit("ruan_xiaowu","ruan_xiaowu",1,14,4,"north"),
          this.createPlayerCharacterUnit("ruan_xiaoqi","ruan_xiaoqi",2,14,4,"north"),
          this.createPlayerCharacterUnit("bai_sheng","bai_sheng",4,14,3,"north"),
          this.u("convoy_cart","生辰綱護送車","車","enemy",4,12,8,20,10,10,0,"south","convoy_cart_portrait","生辰綱","なし","なし","なし","ゲーム用仮設定","ゲーム用仮設定"),
          this.createEnemyCharacterUnit("yang_zhi","yang_zhi",4,10,4,"south"),
          this.u("escort1","護送騎兵","騎","enemy",5,11,45,45,28,24,4,"south","mob_cavalry_very_weak","護送騎兵","騎乗戦闘","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("escort2","護送兵乙","乙","enemy",3,11,40,42,28,24,3,"south","mob_infantry_young_weak","護送兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("escort3","護送兵丙","丙","enemy",6,12,38,40,26,22,3,"south","mob_infantry_older_weak","護送兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("escort4","護送槍兵甲","槍","enemy",2,10,42,44,28,24,3,"south","mob_infantry_young_normal_a","護送槍兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("escort5","護送槍兵乙","槍","enemy",6,10,42,44,28,24,3,"south","mob_infantry_older_normal_a","護送槍兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("escort6","護送弓兵","弓","enemy",1,11,38,40,32,22,3,"south","mob_bow_older_weak","護送弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定")
        ],
        raidReinforcements:[
          this.u("raid_captain","追捕軍隊長","将","enemy",7,15,58,60,42,38,4,"north","mob_captain_high_trust_young","官軍追捕隊長","騎乗戦闘","なし","慎重・威圧的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_cavalry1","追捕騎兵甲","騎","enemy",6,15,48,48,30,24,4,"north","mob_cavalry_young_normal_a","官軍騎兵","騎乗戦闘","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_cavalry2","追捕騎兵乙","騎","enemy",0,13,46,46,28,22,4,"north","mob_cavalry_young_weak","官軍騎兵","騎乗戦闘","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_soldier1","追捕官兵甲","甲","enemy",7,13,40,42,28,22,3,"north","mob_infantry_young_normal_a","官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_soldier2","追捕官兵乙","乙","enemy",6,9,40,42,28,22,3,"south","mob_infantry_young_normal_b","官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_soldier3","追捕官兵丙","丙","enemy",0,9,40,42,28,22,3,"south","mob_infantry_older_normal_a","官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_soldier4","追捕官兵丁","丁","enemy",7,7,42,44,30,24,3,"south","mob_infantry_older_normal_a","官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_soldier5","追捕官兵戊","戊","enemy",0,6,42,44,30,24,3,"south","mob_infantry_older_normal_b","官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_archer1","追捕弓兵甲","弓","enemy",7,11,38,38,32,20,3,"north","mob_bow_young_normal_a","官軍弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_archer2","追捕弓兵乙","弓","enemy",0,11,38,38,32,20,3,"north","mob_bow_young_normal_b","官軍弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_guard1","湿地入口守備兵","守","enemy",5,6,44,48,32,26,3,"south","mob_infantry_older_normal_a","守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_guard2","北路守備兵","守","enemy",2,7,44,48,32,26,3,"south","mob_infantry_older_normal_b","守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_adviser","追捕軍参謀","謀","enemy",4,8,25,50,90,44,3,"south","mob_adviser_military_scout","追捕軍参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_water_soldier","追捕水兵甲","水","enemy",5,3,46,48,36,28,4,"south","mob_infantry_older_normal_b","追捕水兵","水中戦","なし","冷静・執拗","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("raid_water_soldier2","追捕水兵乙","水","enemy",7,2,45,47,35,27,4,"south","mob_infantry_older_normal_a","追捕水兵","水中戦","なし","冷静・執拗","ゲーム用仮設定","ゲーム用仮設定")
        ]
      },
      {
        id:"qingfeng-fort",
        chapterNumber:4,
        turnLimit:15,
        title:"第四章　清風寨の激突",
        description:"宋江を北へ逃がしながら、秦明・黄信の大規模追撃軍と前方の青州封鎖部隊を突破する。敵軍を全滅させても勝利となる。",
        objective:"勝利：宋江が北の旗へ到達、または敵軍を全滅<br>敗北：宋江が敗走",
        leader:"song_jiang",
        battleType:"escape",
        allowAnnihilationVictory:true,
        escape:{x:3,y:0,radius:0,required:["song_jiang"]},
        positions:{
          song_jiang:[1,14],hua_rong:[0,12],yan_shun:[2,14],wang_ying:[3,14],zheng_tianshou:[4,14],
          qin_ming:[6,15],huang_xin:[7,14],qingzhou1:[3,2],qingzhou2:[5,4],qingzhou3:[1,4],
          qingzhou5:[1,10],qingzhou6:[5,11]
        },
        intro:[
          {unit:"song_jiang",text:"秦明・黄信の軍勢が迫っている。ここは戦いながら北へ抜けよう。"},
          {unit:"hua_rong",text:"兄上は旗を目指してください。追手は私たちが食い止めます。"}
        ],
        victory:[
          {unit:"song_jiang",text:"皆のおかげで包囲を抜けられた。秦明殿、どうか話を聞いてほしい。"},
          {unit:"qin_ming",text:"……この宋江、ただの賊ではないようだな。"}
        ],
        map:[
          ["forest","mountain","plain","plain","plain","mountain","forest","forest"],
          ["forest","road","road","road","road","road","road","plain"],
          ["plain","road","forest","plain","hill","forest","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["water","water","road","road","hill","plain","road","forest"],
          ["plain","road","road","road","road","road","road","forest"],
          ["plain","plain","forest","plain","plain","forest","plain","plain"],
          ["mountain","plain","plain","plain","plain","plain","plain","mountain"]
        ],
        units:[
          this.createPlayerCharacterUnit("song_jiang","song_jiang",1,7,3,"north"),
          this.createPlayerCharacterUnit("hua_rong","hua_rong",0,6,4,"north"),
          this.createPlayerCharacterUnit("yan_shun","yan_shun",2,7,4,"north"),
          this.createPlayerCharacterUnit("wang_ying","wang_ying",3,7,4,"north"),
          this.createPlayerCharacterUnit("zheng_tianshou","zheng_tianshou",4,7,3,"north"),
          this.createEnemyCharacterUnit("qin_ming","qin_ming",6,1,4,"south"),
          this.createEnemyCharacterUnit("huang_xin","huang_xin",5,1,4,"south"),
          this.u("qingzhou1","青州官兵甲","甲","enemy",7,2,40,38,24,20,3,"south","mob_infantry_young_normal_a","青州官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("qingzhou2","青州弩兵","弩","enemy",6,3,39,40,30,20,3,"south","mob_bow_young_normal_a","青州弩兵","弓弩術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("qingzhou3","青州騎兵","騎","enemy",4,1,48,45,28,24,4,"south","mob_cavalry_young_normal_a","青州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("qingzhou5","青州弩兵乙","弩","enemy",1,10,40,42,34,20,3,"south","mob_bow_young_normal_b","青州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("qingzhou6","青州騎兵乙","騎","enemy",5,11,50,48,30,24,4,"north","mob_cavalry_young_normal_b","青州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定")
        ]
      },
      {
        id:"jiangzhou-execution-ground",
        chapterNumber:5,
        turnLimit:15,
        title:"第五章　江州法場の救出",
        description:"宋江・戴宗・李逵は右下奥の騎兵・参謀を含む江州官軍をかわし、第2ターンに現れる晁蓋救援隊と、右側湿地を進む李俊ら水軍衆の援護を受けて船着き場を目指す。敵軍を全滅させても勝利となる。",
        objective:"勝利：宋江と晁蓋が北の旗周辺へ到達、または敵軍を全滅<br>敗北：宋江または晁蓋が敗走",
        leader:"song_jiang_jiangzhou",
        battleType:"escape",
        allowAnnihilationVictory:true,
        escape:{x:3,y:0,radius:1,required:["song_jiang_jiangzhou","chao_gai_jiangzhou"]},
        positions:{
          song_jiang_jiangzhou:[3,15],dai_zong:[4,15],li_kui:[3,14],
          li_jun_jiangzhou:[0,1],zhang_heng_jiangzhou:[1,1],zhang_shun_jiangzhou:[2,1],tong_wei_jiangzhou:[5,1],tong_meng_jiangzhou:[6,1],
          jiangzhou_cavalry1:[0,15],
          jiangzhou_cavalry2:[7,15],jiangzhou_cavalry3:[7,14],jiangzhou_cavalry4:[5,15],jiangzhou_adviser2:[6,14],jiangzhou_soldier2:[6,15],jiangzhou_soldier4:[5,14],cai_jiu:[7,13],jiangzhou_soldier3:[6,13],
          jiangzhou_captain2:[5,12],jiangzhou_soldier5:[5,11],jiangzhou_soldier6:[5,13],jiangzhou_elite_cavalry1:[6,12],jiangzhou_elite_cavalry2:[7,12],jiangzhou_spear3:[7,11],jiangzhou_spear4:[6,11],jiangzhou_captain1:[5,10],jiangzhou_archer3:[6,10],
          jiangzhou_spear1:[4,9],jiangzhou_cavalry5:[5,9],jiangzhou_water_soldier1:[6,9],jiangzhou_spear2:[7,9],jiangzhou_archer4:[4,10],huang_wenbing:[4,11],jiangzhou_archer2:[7,10],jiangzhou_mid_archer1:[5,8],jiangzhou_mid_archer2:[7,7],jiangzhou_guard3:[5,7],
          jiangzhou_adviser:[6,8],executioner:[4,6],jiangzhou_archer5:[4,7],jiangzhou_archer6:[4,8],jiangzhou_guard1:[6,5],jiangzhou_guard2:[7,5]
        },
        intro:[
          {unit:"cai_jiu",text:"罪人宋江、戴宗の処刑を執行せよ。法場を固め、一人たりとも近づけるな！"},
          {unit:"huang_wenbing",text:"知府様、宋江の仲間どもが救出を企てているやもしれません。北の船着き場まで兵を配し、退路を断つべきでしょう。"},
          {unit:"executioner",text:"罪人宋江、戴宗！　法場の刻限だ！　官兵ども、脱走を許すな！"},
          {unit:"li_kui",text:"兄貴に指一本触れてみろ！　黒旋風が官兵どもをまとめてぶった斬るぞ！"},
          {unit:"song_jiang_jiangzhou",text:"戴宗殿、李逵、まずは包囲を抜けよう。騎兵だけに足を止められず、北の船着き場へ急ぐのだ。"},
          {unit:"li_jun_jiangzhou",text:"船は用意してある！　俺たち水軍衆も水路から打って出る。湿地と川を使って官兵の横腹を突くぞ！"}
        ],
        victory:[
          {unit:"li_jun_jiangzhou",text:"よし、二人とも来たな！　全員、船へ乗れ！　江州を離れるぞ！"},
          {unit:"song_jiang_jiangzhou",text:"皆が命を懸けて救ってくれた。この恩、宋江は決して忘れぬ。"},
          {unit:"chao_gai_jiangzhou",text:"話は船の上だ。今は一刻も早くここを離れるぞ！"}
        ],
        turnReinforcement:{
          turn:2,
          name:"晁蓋救援隊",
          dialogue:[
            {unit:"chao_gai_jiangzhou",action:"味方救援",text:"宋江兄弟、待たせた！　晁蓋、救援に参った！　左手から包囲を崩すぞ！"},
            {unit:"huang_wenbing",action:"敵軍警戒",text:"やはり賊徒どもが現れたか！　左手の包囲を崩されるな。弩兵は救援隊を狙い撃て！"},
            {unit:"cai_jiu",text:"江州の官威を侮るな！　全軍、宋江を逃がすでない！"},
            {unit:"song_jiang_jiangzhou",text:"晁蓋兄長！　来てくださったか！　これで活路を開ける！"},
            {unit:"hua_rong_jiangzhou",text:"兄上、騎兵に構いすぎてはいけません。私たちが左側を崩します。歩兵の包囲が狭まる前に北へ！"},
            {unit:"li_kui",text:"晁蓋の兄貴！　よく来た！　これで官兵どもをまとめて蹴散らせるぞ！"}
          ],
          units:[
            this.createPlayerCharacterUnit("chao_gai_jiangzhou","chao_gai",0,9,4,"north"),
            this.createPlayerCharacterUnit("hua_rong_jiangzhou","hua_rong",0,8,4,"north"),
            this.createPlayerCharacterUnit("huang_xin_jiangzhou","huang_xin",1,9,4,"north"),
            this.createPlayerCharacterUnit("yan_shun_jiangzhou","yan_shun",0,10,4,"north"),
            this.createPlayerCharacterUnit("wang_ying_jiangzhou","wang_ying",1,10,4,"north"),
            this.createPlayerCharacterUnit("zheng_tianshou_jiangzhou","zheng_tianshou",1,8,3,"north"),
            this.createPlayerCharacterUnit("liu_tang_jiangzhou","liu_tang",2,9,4,"north")
          ]
        },
        map:[
          ["water","water","water","plain","plain","water","water","water"],
          ["water","water","water","plain","plain","water","water","water"],
          ["swamp","swamp","swamp","road","plain","swamp","swamp","swamp"],
          ["swamp","swamp","swamp","road","plain","swamp","swamp","swamp"],
          ["plain","plain","swamp","road","plain","swamp","swamp","swamp"],
          ["plain","plain","swamp","road","plain","swamp","swamp","swamp"],
          ["plain","plain","plain","road","plain","swamp","swamp","swamp"],
          ["plain","plain","plain","road","plain","swamp","swamp","swamp"],
          ["forest","plain","plain","road","plain","plain","swamp","swamp"],
          ["forest","plain","plain","road","plain","plain","swamp","swamp"],
          ["plain","plain","plain","road","plain","plain","plain","swamp"],
          ["plain","plain","plain","road","plain","plain","plain","swamp"],
          ["plain","plain","plain","road","plain","plain","plain","plain"],
          ["road","road","road","road","road","road","road","road"],
          ["plain","plain","forest","plain","plain","forest","plain","plain"],
          ["plain","plain","forest","plain","plain","forest","plain","plain"]
        ],
        units:[
          this.createPlayerCharacterUnit("song_jiang_jiangzhou","song_jiang",3,7,3,"north"),
          this.createPlayerCharacterUnit("dai_zong","dai_zong",1,7,6,"north"),
          this.createPlayerCharacterUnit("li_kui","li_kui",2,6,4,"north"),
          this.createPlayerCharacterUnit("li_jun_jiangzhou","li_jun",5,6,4,"north"),
          this.createPlayerCharacterUnit("zhang_heng_jiangzhou","zhang_heng",6,6,4,"north"),
          this.createPlayerCharacterUnit("zhang_shun_jiangzhou","zhang_shun",7,6,4,"north"),
          this.createPlayerCharacterUnit("tong_wei_jiangzhou","tong_wei",3,5,4,"north"),
          this.createPlayerCharacterUnit("tong_meng_jiangzhou","tong_meng",4,5,4,"north"),
          this.u("jiangzhou_cavalry1","江州騎兵甲","騎","enemy",0,7,48,46,28,24,4,"north","mob_cavalry_young_normal_b","江州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_cavalry2","江州騎兵乙","騎","enemy",7,7,48,46,28,24,4,"north","mob_cavalry_young_normal_b","江州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_cavalry3","江州騎兵丙","騎","enemy",7,7,48,46,28,24,4,"north","mob_cavalry_older_normal_a","江州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_cavalry4","江州騎兵丁","騎","enemy",5,7,50,48,30,24,4,"north","mob_cavalry_older_normal_a","江州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_cavalry5","江州騎兵戊","騎","enemy",5,9,50,48,30,24,4,"south","mob_cavalry_older_normal_b","江州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_adviser2","江州軍参謀乙","謀","enemy",6,7,24,50,90,44,3,"north","mob_adviser_military_scout","江州軍参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_soldier2","江州官兵甲一隊","甲","enemy",6,7,42,44,28,24,3,"north","mob_infantry_young_normal_b","江州官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_soldier4","江州官兵丁","丁","enemy",5,7,40,42,25,22,3,"north","mob_infantry_older_normal_a","江州官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_soldier5","江州官兵甲二隊","甲","enemy",5,6,42,44,28,24,3,"south","mob_infantry_young_normal_a","江州官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_soldier6","江州官兵甲三隊","甲","enemy",5,6,42,44,28,24,3,"south","mob_infantry_young_normal_b","江州官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_water_soldier1","江州水兵","水","enemy",6,4,46,48,36,28,4,"south","mob_infantry_older_normal_b","江州水兵","水中戦","なし","冷静・執拗","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_archer2","江州弩兵乙","弩","enemy",7,10,38,40,32,20,3,"north","mob_bow_older_normal_a","江州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.createEnemyCharacterUnit("cai_jiu","cai_jiuzhifu",7,13,2,"north"),
          this.u("jiangzhou_soldier3","江州官兵甲四隊","甲","enemy",6,6,42,44,28,24,3,"north","mob_infantry_older_normal_a","江州官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_captain1","江州隊長甲一隊","将","enemy",3,5,52,55,36,30,3,"south","mob_captain_standard_young","江州隊長","槍術","なし","威圧的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_captain2","江州隊長甲二隊","将","enemy",6,5,52,55,36,30,3,"south","mob_captain_standard_middle","江州隊長","槍術","なし","威圧的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_elite_cavalry1","江州精鋭騎兵甲","精","enemy",6,6,64,62,38,32,4,"south","mob_cavalry_young_strong","江州精鋭騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_elite_cavalry2","江州精鋭騎兵乙","精","enemy",7,6,63,61,37,31,4,"south","mob_cavalry_older_strong","江州精鋭騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_spear1","江州槍兵甲","槍","enemy",4,4,43,46,28,24,3,"south","mob_infantry_young_normal_a","江州槍兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_spear2","江州槍兵乙","槍","enemy",7,4,43,46,28,24,3,"south","mob_infantry_young_normal_b","江州槍兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_spear3","江州槍兵丙","槍","enemy",7,5,42,45,27,23,3,"south","mob_infantry_older_normal_a","江州槍兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_spear4","江州槍兵丁","槍","enemy",6,5,42,45,27,23,3,"south","mob_infantry_older_normal_b","江州槍兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_archer3","江州弩兵戊","弩","enemy",6,4,39,42,34,22,3,"south","mob_bow_older_normal_b","江州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_archer4","江州弩兵己","弩","enemy",4,10,39,42,34,22,3,"south","mob_bow_older_normal_a","江州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.createEnemyCharacterUnit("huang_wenbing","huang_wenbing",4,11,3,"south"),
          this.u("jiangzhou_archer5","江州弩兵庚","弩","enemy",4,7,39,42,34,22,3,"south","mob_bow_young_normal_a","江州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_archer6","江州弩兵辛","弩","enemy",4,8,39,42,34,22,3,"south","mob_bow_young_normal_b","江州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_mid_archer1","江州弩兵丙","弩","enemy",3,3,39,42,34,22,3,"south","mob_bow_older_normal_a","江州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_mid_archer2","江州弩兵丁","弩","enemy",6,3,39,42,34,22,3,"south","mob_bow_older_normal_b","江州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_adviser","江州軍参謀","謀","enemy",5,4,24,50,90,44,3,"south","mob_adviser_military_formation","江州軍参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("executioner","刑場執行官","刑","enemy",4,2,78,67,54,25,2,"south","mob_executioner","刑場執行官","刀術","なし","冷酷","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_guard1","北路守備兵甲","守","enemy",2,2,45,50,30,26,3,"south","mob_infantry_older_normal_b","江州守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_guard2","北路守備兵乙","守","enemy",5,2,45,50,30,26,3,"south","mob_infantry_older_normal_b","江州守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("jiangzhou_guard3","右路守備兵","守","enemy",5,3,45,50,30,26,3,"south","mob_infantry_older_normal_a","江州守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定")
        ]
      },
      {
        id:"zhu-family-manor",
        chapterNumber:6,
        turnLimit:20,
        title:"第六章　三打祝家荘・総力戦",
        description:"梁山泊軍は呉用の策のもと総力を挙げ、祝朝奉が率いる大軍と欒廷玉・祝家三兄弟の防衛線へ挑む。登州の孫立らは祝家荘への援軍を装い、左上寄りの中段で戦況を見守っている。",
        objective:"勝利：祝家荘軍を全滅<br>敗北：宋江が敗走",
        leader:"song_jiang_zhujia",
        stationaryUnits:["sun_li_zhujia","sun_xin_zhujia","gu_dasao_zhujia","yue_he_zhujia","xie_zhen_zhujia","xie_bao_zhujia","zou_yuan_zhujia","zou_run_zhujia"],
        stationaryLabels:{
          sun_li_zhujia:"潜入待機",sun_xin_zhujia:"潜入待機",gu_dasao_zhujia:"潜入待機",yue_he_zhujia:"潜入待機",
          xie_zhen_zhujia:"潜入待機",xie_bao_zhujia:"潜入待機",zou_yuan_zhujia:"潜入待機",zou_run_zhujia:"潜入待機"
        },
        zhujiaBetrayal:{
          turn:4,
          units:["sun_li_zhujia","sun_xin_zhujia","gu_dasao_zhujia","yue_he_zhujia","xie_zhen_zhujia","xie_bao_zhujia","zou_yuan_zhujia","zou_run_zhujia"],
          dialogue:[
            {unit:"wu_yong_zhujia",text:"今です、孫提轄！　内より祝家荘の陣を崩してください！"},
            {unit:"sun_li_zhujia",text:"承知した！　登州の者ども、これより梁山泊軍に加勢する。祝家荘の大軍を内側から崩すぞ！"},
            {unit:"zhu_chaofeng",text:"な、何だと！　孫立め、最初から梁山泊と通じておったのか！　各隊、陣を立て直せ！"}
          ]
        },
        hiddenTrapZones:[
          {label:"中盤前方",count:1,candidates:[[4,7],[5,7],[7,7]]},
          {label:"中盤中央",count:2,candidates:[[2,10],[5,10],[0,11],[7,11]]},
          {label:"中盤後方",count:1,candidates:[[1,14],[3,14],[4,14],[6,14]]}
        ],
        trapDamage:20,
        trapConfusionTurns:1,
        intro:[
          {unit:"song_jiang_zhujia",text:"祝家荘との長い戦いも、ここで決着をつける。敵は大軍だ。隊列を崩さず、一歩ずつ進もう。"},
          {unit:"wu_yong_zhujia",text:"祝朝奉は荘中の兵を総動員しました。正面だけを見ず、左右の道を使って敵陣を分断しましょう。孫提轄らには、すでに別の役目を託してあります。"},
          {unit:"ma_lin_zhujia",text:"敵は多いが、こちらも梁山泊の精鋭だ。俺が右翼を支える。皆でこの大陣を崩そう！"},
          {unit:"zhu_chaofeng",text:"梁山泊の賊どもめ！　我が祝家荘の兵は尽きぬ。荘を踏みにじろうとしたことを後悔させてくれる！"},
          {unit:"luan_tingyu",text:"各隊、持ち場を守れ。梁山泊の勢いに呑まれるな。前衛で削り、後衛の弓弩で仕留めるのだ！"},
          {unit:"sun_li_zhujia",text:"登州の孫立、援軍として参った。皆はここで陣を保ち、戦況が動くまで軽々しく動くな。"}
        ],
        victory:[
          {unit:"song_jiang_zhujia",text:"祝家荘は落ちた。時遷を救い出し、長き戦いにもようやく決着がついた。"},
          {unit:"lin_chong_zhujia",text:"敵の守りは見事だった。だが皆で力を合わせ、ついに荘を破ったな。"}
        ],
        map:[
          ["mountain","forest","plain","road","road","plain","forest","mountain"],
          ["forest","road","road","road","road","road","road","forest"],
          ["plain","road","hill","plain","plain","hill","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["forest","road","plain","hill","hill","plain","road","forest"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["forest","plain","plain","plain","plain","forest","road","forest"],
          ["plain","plain","plain","plain","plain","plain","road","plain"],
          ["plain","plain","plain","water","water","plain","road","plain"],
          ["plain","road","plain","water","water","plain","road","plain"],
          ["forest","road","plain","plain","plain","plain","road","forest"],
          ["plain","road","forest","hill","hill","forest","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["forest","road","road","road","road","road","road","forest"],
          ["plain","road","forest","plain","plain","forest","road","plain"],
          ["hill","road","plain","plain","plain","plain","road","hill"],
          ["forest","road","plain","plain","plain","plain","road","forest"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["forest","road","plain","plain","plain","plain","road","forest"]
        ],
        units:[
          this.createPlayerCharacterUnit("shi_xiu_zhujia","shi_xiu",0,19,4,"north"),
          this.createPlayerCharacterUnit("lin_chong_zhujia","lin_chong",1,19,4,"north"),
          this.createPlayerCharacterUnit("song_jiang_zhujia","song_jiang",2,19,3,"north"),
          this.createPlayerCharacterUnit("wu_yong_zhujia","wu_yong",3,19,4,"north"),
          this.createPlayerCharacterUnit("ma_lin_zhujia","ma_lin",4,19,4,"north"),
          this.createPlayerCharacterUnit("li_kui_zhujia","li_kui",5,19,4,"north"),
          this.createPlayerCharacterUnit("qin_ming_zhujia","qin_ming",6,19,4,"north"),
          this.createPlayerCharacterUnit("yang_xiong_zhujia","yang_xiong",6,17,4,"north"),
          this.createPlayerCharacterUnit("hua_rong_zhujia","hua_rong",1,18,4,"north"),
          this.createPlayerCharacterUnit("yang_lin_zhujia","yang_lin",2,18,4,"north"),
          this.createPlayerCharacterUnit("wang_ying_zhujia","wang_ying",3,18,4,"north"),
          this.createPlayerCharacterUnit("ou_peng_zhujia","ou_peng",4,18,4,"north"),
          this.createPlayerCharacterUnit("deng_fei_zhujia","deng_fei",5,18,4,"north"),
          this.createPlayerCharacterUnit("li_jun_zhujia","li_jun",0,18,4,"north"),
          this.createPlayerCharacterUnit("dai_zong_zhujia","dai_zong",6,18,6,"north"),
          this.createPlayerCharacterUnit("zhang_shun_zhujia","zhang_shun",7,18,4,"north"),
          this.createPlayerCharacterUnit("mu_hong_zhujia","mu_hong",0,17,4,"north"),
          this.createPlayerCharacterUnit("huang_xin_zhujia","huang_xin",2,17,4,"north"),
          this.createPlayerCharacterUnit("zhang_heng_zhujia","zhang_heng",4,17,4,"north"),
          this.createPlayerCharacterUnit("bai_sheng_zhujia","bai_sheng",7,19,3,"north"),

          this.createEnemyCharacterUnit("zhu_chaofeng","zhu_chaofeng",3,0,3,"south"),
          this.createEnemyCharacterUnit("luan_tingyu","luan_tingyu",4,1,4,"south"),
          this.createEnemyCharacterUnit("zhu_long","zhu_long",2,1,4,"south"),
          this.createEnemyCharacterUnit("zhu_hu","zhu_hu",5,1,4,"south"),
          this.createEnemyCharacterUnit("zhu_biao","zhu_biao",6,2,4,"south"),
          this.createEnemyCharacterUnit("hu_sanniang","hu_sanniang",1,2,4,"south"),
          this.u("hu_female_cavalry","扈家荘女騎馬隊甲","女","enemy",1,3,62,58,45,52,4,"south","mob_female_cavalry","扈家荘女騎馬隊","騎乗戦闘","なし","寡黙・勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("hu_female_cavalry_a3","扈家荘女騎馬隊乙","女","enemy",0,2,62,58,45,52,4,"south","mob_female_cavalry","扈家荘女騎馬隊","騎乗戦闘","なし","寡黙・勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("hu_female_cavalry_b2","扈家荘女騎馬隊丙","女","enemy",1,1,62,58,45,52,4,"south","mob_female_cavalry","扈家荘女騎馬隊","騎乗戦闘","なし","寡黙・勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          Object.assign(this.u("hu_female_adviser","扈家荘女軍師","謀","enemy",0,4,24,52,87,48,3,"south","mob_female_cavalry","扈家荘女軍師","なし","なし","冷静・機敏","ゲーム用仮設定","ゲーム用仮設定"),{maxHp:190}),
          this.u("manor1","祝家荘兵甲","甲","enemy",2,3,46,45,30,22,3,"south","zhujia_infantry_young_strong","祝家荘兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("manor2","祝家荘兵乙","乙","enemy",5,3,46,45,30,22,3,"south","zhujia_infantry_older_strong","祝家荘兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("manor3","祝家荘兵丙","丙","enemy",2,4,46,45,30,22,3,"south","zhujia_infantry_young_strong","祝家荘兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("manor4","祝家荘兵丁","丁","enemy",7,4,46,45,30,22,3,"south","zhujia_infantry_older_strong","祝家荘兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_front_cavalry_left","祝家荘前衛騎馬隊甲","騎","enemy",1,11,56,55,34,30,4,"south","zhujia_cavalry_young_strong","祝家荘騎馬隊","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_front_cavalry_right","祝家荘前衛騎馬隊乙","騎","enemy",6,11,56,55,34,30,4,"south","zhujia_cavalry_older_strong","祝家荘騎馬隊","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("manor5","祝家荘弓兵甲","弓","enemy",0,5,42,42,36,20,3,"south","zhujia_bow_older_strong","祝家荘弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("manor6","祝家荘弓兵乙","弩","enemy",7,5,42,42,36,20,3,"south","zhujia_bow_older_strong","祝家荘弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("manor7","祝家荘弓兵丙","弓","enemy",2,5,42,42,36,20,3,"south","zhujia_bow_young_strong","祝家荘弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("manor8","祝家荘弓兵丁","弩","enemy",5,5,42,42,36,20,3,"south","zhujia_bow_young_strong","祝家荘弓兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_rear_crossbow_left","祝家荘後衛弩隊甲","弩","enemy",1,0,44,46,40,24,3,"south","zhujia_bow_older_strong","祝家荘弩隊","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_rear_crossbow_right","祝家荘後衛弩隊乙","弩","enemy",6,0,44,46,40,24,3,"south","zhujia_bow_older_strong","祝家荘弩隊","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("manor_adviser","祝家荘参謀甲","謀","enemy",4,2,24,52,90,44,3,"south","mob_adviser_master_geography","祝家荘参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),

          this.u("zhujia_water_soldier1","祝家荘水軍甲","水","enemy",4,7,48,52,34,26,3,"south","zhujia_infantry_older_strong","祝家荘水軍","槍術","水軍適正","実直・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_water_soldier2","祝家荘水軍乙","水","enemy",5,7,48,52,34,26,3,"south","zhujia_infantry_young_strong","祝家荘水軍","槍術","水軍適正","実直・規律的","ゲーム用仮設定","ゲーム用仮設定"),

          this.u("zhujia_infantry1","祝家荘歩兵隊甲","歩","enemy",0,8,48,52,34,26,3,"south","zhujia_infantry_older_strong","祝家荘歩兵隊","槍術","なし","実直・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_infantry2","祝家荘歩兵隊乙","歩","enemy",7,8,48,52,34,26,3,"south","zhujia_infantry_older_strong","祝家荘歩兵隊","槍術","なし","実直・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_infantry3","祝家荘歩兵隊丙","歩","enemy",2,9,50,54,35,27,3,"south","zhujia_infantry_young_strong","祝家荘歩兵隊","槍術","なし","実直・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_infantry4","祝家荘歩兵隊丁","歩","enemy",5,9,50,54,35,27,3,"south","zhujia_infantry_older_strong","祝家荘歩兵隊","槍術","なし","実直・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_front_adviser_left","祝家荘前衛参謀甲","謀","enemy",0,12,24,54,88,44,3,"south","mob_adviser_military_frontline","祝家荘参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          Object.assign(this.u("zhujia_fire_captain_left","祝家荘隊長丙","将","enemy",1,12,62,68,46,34,3,"south","mob_captain_high_trust_young","祝家荘隊長","槍術","火計・山野適正","実直・指揮的","ゲーム用仮設定","ゲーム用仮設定"),{maxStrategyUses:1,specialTacticDamageRate:.75,zhujiaMobTacticAi:true}),
          Object.assign(this.u("zhujia_fire_captain_right","祝家荘隊長丁","将","enemy",6,12,62,68,46,34,3,"south","mob_captain_high_trust_middle","祝家荘隊長","槍術","火計・山野適正","実直・指揮的","ゲーム用仮設定","ゲーム用仮設定"),{maxStrategyUses:1,specialTacticDamageRate:.75,zhujiaMobTacticAi:true}),
          this.u("zhujia_front_adviser_right","祝家荘前衛参謀乙","謀","enemy",7,12,24,54,88,44,3,"south","mob_adviser_military_scout","祝家荘参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_infantry5","祝家荘歩兵隊戊","歩","enemy",1,13,52,56,36,28,3,"south","zhujia_infantry_older_strong","祝家荘歩兵隊","槍術","なし","実直・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_infantry6","祝家荘歩兵隊己","歩","enemy",6,13,52,56,36,28,3,"south","zhujia_infantry_young_strong","祝家荘歩兵隊","槍術","なし","実直・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_cavalry5","祝家荘騎馬隊戊","騎","enemy",2,12,62,60,40,34,4,"south","zhujia_cavalry_very_strong","祝家荘騎馬隊","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_cavalry6","祝家荘騎馬隊己","騎","enemy",5,12,62,60,40,34,4,"south","zhujia_cavalry_very_strong","祝家荘騎馬隊","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_archer5","祝家荘弓兵戊","弓","enemy",0,14,44,46,40,24,3,"south","zhujia_bow_older_strong","祝家荘弓兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_archer6","祝家荘弓兵己","弓","enemy",7,14,44,46,40,24,3,"south","zhujia_bow_older_strong","祝家荘弓兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_archer7","祝家荘弓兵庚","弓","enemy",2,14,45,47,41,25,3,"south","zhujia_bow_young_strong","祝家荘弓兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_archer8","祝家荘弓兵辛","弓","enemy",5,14,45,47,41,25,3,"south","zhujia_bow_young_strong","祝家荘弓兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_crossbow3","祝家荘弩兵丙","弩","enemy",1,4,46,48,42,26,3,"south","zhujia_bow_older_strong","祝家荘弩兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_crossbow4","祝家荘弩兵丁","弩","enemy",6,4,46,48,42,26,3,"south","zhujia_bow_older_strong","祝家荘弩兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_crossbow5","祝家荘弩兵戊","弩","enemy",3,5,48,50,44,28,3,"south","zhujia_bow_very_strong","祝家荘弩兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_crossbow6","祝家荘弩兵己","弩","enemy",4,5,48,50,44,28,3,"south","zhujia_bow_very_strong","祝家荘弩兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_elite1","祝家荘精鋭兵甲","精","enemy",1,9,62,66,42,34,3,"south","zhujia_infantry_older_strong","祝家荘精鋭兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_elite2","祝家荘精鋭兵乙","精","enemy",6,9,62,66,42,34,3,"south","zhujia_infantry_older_strong","祝家荘精鋭兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_elite3","祝家荘精鋭兵丙","精","enemy",3,10,64,68,44,36,3,"south","zhujia_infantry_very_strong","祝家荘精鋭兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zhujia_elite4","祝家荘精鋭兵丁","精","enemy",4,10,64,68,44,36,3,"south","zhujia_infantry_very_strong","祝家荘精鋭兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          Object.assign(this.u("zhujia_captain1","祝家荘隊長甲","将","enemy",2,8,68,70,50,40,4,"south","zhujia_captain","祝家荘隊長","騎乗戦闘","水計・水軍適正","冷静・勇猛","ゲーム用仮設定","ゲーム用仮設定"),{maxStrategyUses:1,specialTacticDamageRate:.75,zhujiaMobTacticAi:true}),
          Object.assign(this.u("zhujia_captain2","祝家荘隊長乙","将","enemy",5,8,68,70,50,40,4,"south","zhujia_captain","祝家荘隊長","騎乗戦闘","水計・水軍適正","冷静・勇猛","ゲーム用仮設定","ゲーム用仮設定"),{maxStrategyUses:1,specialTacticDamageRate:.75,zhujiaMobTacticAi:true}),
          this.u("manor_adviser2","祝家荘参謀乙","謀","enemy",3,3,24,56,92,46,3,"south","mob_adviser_master_strategy","祝家荘参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),

          this.createEnemyCharacterUnit("sun_li_zhujia","sun_li",0,6,4,"south"),
          this.createEnemyCharacterUnit("sun_xin_zhujia","sun_xin",1,6,3,"south"),
          this.createEnemyCharacterUnit("gu_dasao_zhujia","gu_dasao",2,6,3,"south"),
          this.createEnemyCharacterUnit("yue_he_zhujia","yue_he",3,6,3,"south"),
          this.createEnemyCharacterUnit("xie_zhen_zhujia","xie_zhen",0,7,4,"south"),
          this.createEnemyCharacterUnit("xie_bao_zhujia","xie_bao",1,7,4,"south"),
          this.createEnemyCharacterUnit("zou_yuan_zhujia","zou_yuan",2,7,3,"south"),
          this.createEnemyCharacterUnit("zou_run_zhujia","zou_run",3,7,3,"south")
        ]
      },
      {
        id:"gaotang-prefecture",
        chapterNumber:7,
        turnLimit:18,
        title:"第七章　高唐州・飛天妖術陣",
        description:"高唐州遠征軍の総力を結集し、高廉の飛天兵と妖術陣を突破して柴進を救出する。",
        objective:"勝利：高廉を含む高唐州軍を全滅<br>敗北：宋江が敗走<br><br><b>特殊ルール：</b>高廉は公孫勝が3マス以内にいない場合、自身から3マス以内へ広域幻術を使用し、使用回数を消費しない。公孫勝が3マス以内にいる間は広域幻術を封じ、通常幻術のみ使用する。",
        leader:"song_jiang_gaotang",
        hiddenTrapZones:[
          {type:"normal",label:"中盤前方",count:2,candidates:[[0,11],[3,11],[4,11],[7,11]]},
          {type:"spell",label:"中盤後方",count:2,candidates:[[2,13],[5,13],[0,14],[7,14],[0,15],[7,15]]}
        ],
        trapDamage:20,
        trapConfusionTurns:1,
        spellTrapDamage:10,
        spellTrapIllusionTurns:1,
        intro:[
          {unit:"song_jiang_gaotang",text:"柴進殿を救うため、高唐州へ総攻撃をかける。敵兵の数に惑わされず、妖術陣を一つずつ崩すぞ。"},
          {unit:"gongsun_sheng_gaotang",text:"高廉は私が3マス以内にいない間、自身の周囲3マスへ広域幻術を放ちます。しかもその間は術力が高まり、広域幻術では使用回数を消費しません。私が3マス以内へ入れば広域幻術を封じ、通常幻術だけにできます。"},
          {unit:"wu_yong_gaotang",text:"公孫勝殿が敗走しても戦いは続きますが、高廉の広域幻術を封じる手段を失います。飛天兵と術士を崩しつつ、公孫勝殿を高廉へ近づけるのが要です。"},
          {unit:"gao_lian",text:"飛天神兵よ、妖気をまといて梁山泊の賊どもを打ち砕け！　この高唐州から一人も帰すな！"},
          {unit:"lei_heng_gaotang",text:"妖術で仲間を苦しめる高廉め。俺たち全員でその妖陣を踏み破ってやる！"}
        ],
        victory:[
          {unit:"lei_heng_gaotang",text:"高廉、討ち取った！　妖術に頼った報いだ！"},
          {name:"柴進",text:"宋江殿……これほど多くの仲間が来てくれるとは。皆の恩は忘れぬ。"},
          {unit:"song_jiang_gaotang",text:"柴進殿を救い出した。高唐州の妖術陣は破れた。皆、梁山泊へ戻ろう。"}
        ],
        map:[
          ["mountain","forest","hill","plain","plain","hill","forest","mountain"],
          ["forest","hill","plain","plain","plain","plain","hill","forest"],
          ["plain","road","road","road","road","road","road","plain"],
          ["plain","road","forest","plain","plain","forest","road","plain"],
          ["hill","road","plain","plain","plain","plain","road","hill"],
          ["plain","road","forest","plain","plain","forest","road","plain"],
          ["forest","road","plain","plain","plain","plain","road","forest"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["plain","road","plain","hill","hill","plain","road","plain"],
          ["plain","road","forest","plain","plain","forest","road","plain"],
          ["forest","road","plain","plain","plain","plain","road","forest"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["hill","road","forest","plain","plain","forest","road","hill"],
          ["forest","road","plain","plain","plain","plain","road","forest"],
          ["plain","road","plain","hill","hill","plain","road","plain"],
          ["plain","road","forest","plain","plain","forest","road","plain"],
          ["forest","road","plain","plain","plain","plain","road","forest"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"],
          ["plain","road","plain","plain","plain","plain","road","plain"]
        ],
        units:[
          // 梁山泊・高唐州遠征軍 23隊
          this.createPlayerCharacterUnit("bai_sheng_gaotang","bai_sheng",0,19,3,"north"),
          this.createPlayerCharacterUnit("lu_fang_gaotang","lu_fang",1,19,4,"north"),
          this.createPlayerCharacterUnit("song_jiang_gaotang","song_jiang",2,19,3,"north"),
          this.createPlayerCharacterUnit("wu_yong_gaotang","wu_yong",3,19,4,"north"),
          this.createPlayerCharacterUnit("gongsun_sheng_gaotang","gongsun_sheng",4,19,4,"north"),
          this.createPlayerCharacterUnit("zhu_tong_gaotang","zhu_tong",5,19,4,"north"),
          this.createPlayerCharacterUnit("guo_sheng_gaotang","guo_sheng",6,19,4,"north"),
          this.createPlayerCharacterUnit("dai_zong_gaotang","dai_zong",7,19,6,"north"),

          this.createPlayerCharacterUnit("li_jun_gaotang","li_jun",0,18,4,"north"),
          this.createPlayerCharacterUnit("deng_fei_gaotang","deng_fei",1,18,4,"north"),
          this.createPlayerCharacterUnit("lin_chong_gaotang","lin_chong",2,18,4,"north"),
          this.createPlayerCharacterUnit("hua_rong_gaotang","hua_rong",3,18,4,"north"),
          this.createPlayerCharacterUnit("li_kui_gaotang","li_kui",4,18,4,"north"),
          this.createPlayerCharacterUnit("qin_ming_gaotang","qin_ming",5,18,4,"north"),
          this.createPlayerCharacterUnit("ou_peng_gaotang","ou_peng",6,18,4,"north"),
          this.createPlayerCharacterUnit("zhang_shun_gaotang","zhang_shun",7,18,4,"north"),

          this.createPlayerCharacterUnit("zhang_heng_gaotang","zhang_heng",0,17,4,"north"),
          this.createPlayerCharacterUnit("yang_lin_gaotang","yang_lin",1,17,4,"north"),
          this.createPlayerCharacterUnit("ma_lin_gaotang","ma_lin",2,17,4,"north"),
          this.createPlayerCharacterUnit("lei_heng_gaotang","lei_heng",3,17,4,"north"),
          this.createPlayerCharacterUnit("shi_xiu_gaotang","shi_xiu",4,17,4,"north"),
          this.createPlayerCharacterUnit("yang_xiong_gaotang","yang_xiong",5,17,4,"north"),
          this.createPlayerCharacterUnit("sun_li_gaotang","sun_li",6,17,4,"north"),

          // 高唐州軍・固有敵将 4隊
          this.createEnemyCharacterUnit("gao_lian","gao_lian",4,0,3,"south"),
          this.createEnemyCharacterUnit("xue_yuanhui_gaotang","xue_yuanhui",4,4,4,"south"),
          this.createEnemyCharacterUnit("yu_zhi_gaotang","yu_zhi",2,6,4,"south"),
          this.createEnemyCharacterUnit("wen_wenbao_gaotang","wen_wenbao",5,6,4,"south"),

          // 高廉直属の上位兵 3隊
          this.u("feitian_divine1","飛天神兵甲","神","enemy",3,1,78,74,65,50,4,"south","feitian_divine","飛天神兵","なし","なし","勇猛・寡黙","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_divine2","飛天神兵乙","神","enemy",4,2,78,74,65,50,4,"south","feitian_divine","飛天神兵","なし","なし","勇猛・寡黙","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_divine3","飛天神兵丙","神","enemy",5,1,78,74,65,50,4,"south","feitian_divine","飛天神兵","なし","なし","勇猛・寡黙","ゲーム用仮設定","ゲーム用仮設定"),

          // 飛天兵 10隊
          this.u("feitian_archer1","飛天弩兵甲","弩","enemy",1,3,63,56,46,24,3,"south","feitian_archer","飛天弩兵","弓弩術","なし","冷静・慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_archer2","飛天弩兵乙","弩","enemy",6,3,63,56,46,24,3,"south","feitian_archer","飛天弩兵","弓弩術","なし","冷静・慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_infantry1","飛天歩兵甲","飛","enemy",1,5,67,64,38,24,3,"south","feitian_infantry","飛天歩兵","なし","なし","勇猛・実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_infantry2","飛天歩兵乙","飛","enemy",6,5,67,64,38,24,3,"south","feitian_infantry","飛天歩兵","なし","なし","勇猛・実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_infantry3","飛天歩兵丙","飛","enemy",2,8,67,64,38,24,3,"south","feitian_infantry","飛天歩兵","なし","なし","勇猛・実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_infantry4","飛天歩兵丁","飛","enemy",5,8,67,64,38,24,3,"south","feitian_infantry","飛天歩兵","なし","なし","勇猛・実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_cavalry1","飛天騎兵甲","騎","enemy",1,9,73,62,40,26,4,"south","feitian_cavalry","飛天騎兵","騎乗戦闘","なし","勇猛・好戦的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_cavalry2","飛天騎兵乙","騎","enemy",6,9,73,62,40,26,4,"south","feitian_cavalry","飛天騎兵","騎乗戦闘","なし","勇猛・好戦的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_cavalry3","飛天騎兵丙","騎","enemy",2,11,73,62,40,26,4,"south","feitian_cavalry","飛天騎兵","騎乗戦闘","なし","勇猛・好戦的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("feitian_cavalry4","飛天騎兵丁","騎","enemy",5,11,73,62,40,26,4,"south","feitian_cavalry","飛天騎兵","騎乗戦闘","なし","勇猛・好戦的","ゲーム用仮設定","ゲーム用仮設定"),

          // 高唐州通常兵 8隊
          this.u("gaotang_infantry1","高唐州歩兵甲","歩","enemy",1,13,48,50,32,24,3,"south","mob_infantry_young_normal_b","高唐州歩兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_infantry2","高唐州歩兵乙","歩","enemy",6,13,48,50,32,24,3,"south","mob_infantry_older_normal_a","高唐州歩兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_infantry3","高唐州歩兵丙","歩","enemy",2,14,48,50,32,24,3,"south","mob_infantry_young_normal_a","高唐州歩兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_infantry4","高唐州歩兵丁","歩","enemy",5,14,48,50,32,24,3,"south","mob_infantry_older_normal_b","高唐州歩兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_cavalry1","高唐州騎兵甲","騎","enemy",1,11,58,56,36,28,4,"south","mob_cavalry_older_normal_a","高唐州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_cavalry2","高唐州騎兵乙","騎","enemy",6,11,58,56,36,28,4,"south","mob_cavalry_older_normal_b","高唐州騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_archer1","高唐州弩兵甲","弩","enemy",1,10,46,48,42,24,3,"south","mob_bow_older_normal_a","高唐州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_archer2","高唐州弩兵乙","弩","enemy",6,10,46,48,42,24,3,"south","mob_bow_older_normal_b","高唐州弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),

          // 少兵力の参謀 3隊
          this.u("gaotang_adviser1","高唐州参謀甲","謀","enemy",2,2,24,56,92,46,3,"south","mob_adviser_military_frontline","高唐州参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_adviser2","高唐州参謀乙","謀","enemy",6,2,24,54,88,44,3,"south","mob_adviser_civil_logistics","高唐州参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_adviser3","高唐州参謀丙","謀","enemy",3,4,26,58,95,48,3,"south","mob_adviser_military_formation","高唐州参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),

          // 左右外側を中心に散開する高廉食客・術士 10隊
          this.u("gaotang_sorcerer1","高廉食客・術士甲","術","enemy",0,2,24,44,75,35,3,"south","mob_sorcerer","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer2","高廉食客・術士乙","術","enemy",7,2,24,44,65,35,3,"south","mob_sorcerer_low","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer3","高廉食客・術士丙","術","enemy",0,5,26,46,55,36,3,"south","mob_sorcerer_low","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer4","高廉食客・術士丁","術","enemy",7,5,24,44,75,35,3,"south","mob_sorcerer","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer5","高廉食客・術士戊","術","enemy",0,8,24,44,65,35,3,"south","mob_sorcerer_low","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer6","高廉食客・術士己","術","enemy",7,8,26,46,55,36,3,"south","mob_sorcerer_low","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer7","高廉食客・術士庚","術","enemy",3,7,24,44,75,35,3,"south","mob_sorcerer","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer8","高廉食客・術士辛","術","enemy",4,10,24,44,65,35,3,"south","mob_sorcerer_low","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer9","高廉食客・術士壬","術","enemy",1,1,24,44,75,35,3,"south","mob_sorcerer","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("gaotang_sorcerer10","高廉食客・術士癸","術","enemy",6,1,24,44,65,35,3,"south","mob_sorcerer_low","高廉食客・術士","なし","幻術","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定")
        ]
      },
      {
        id:"daming-prison-break",
        chapterNumber:8,
        turnLimit:20,
        title:"第八章　大名府・獄門脱出",
        description:"城内の追捕隊と城外の待ち伏せを突破し、川を越えて盧俊義と石秀を南の脱出地点へ導く。敵軍を全滅させても勝利となる。",
        objective:"勝利：盧俊義と石秀を南の旗へ脱出、または敵軍を全滅<br>敗北：呉用・盧俊義・石秀のいずれかが敗走",
        leader:"wu_yong_daming",
        battleType:"escape",
        allowAnnihilationVictory:true,
        escape:{x:3,y:15,radius:1,required:["lu_junyi_daming","shi_xiu_daming"]},
        requiredSurvivors:["lu_junyi_daming","shi_xiu_daming"],
        damingPursuitUnits:[
          "liang_zhongshu","li_cheng","wen_da","daming_captain",
          "daming_guard3","daming_guard4",
          "daming_cavalry7","daming_cavalry8",
          "daming_inner_cavalry1","daming_inner_cavalry3",
          "daming_inner_archer1","daming_inner_archer2",
          "daming_inner_cavalry4","daming_inner_cavalry5"
        ],
        intro:[
          {name:"物語",text:"高唐州攻略後、梁山泊は勢力を広げた。だが曾頭市との戦いで晁蓋は凶矢に倒れ、帰らぬ人となった。"},
          {name:"物語",text:"晁蓋の遺志を継ぐため、宋江と呉用は河北の豪傑・盧俊義を迎えようとした。しかし盧俊義は大名府で捕らえられ、石秀とともに処刑を待つ身となっていた――。"},
          {unit:"wu_yong_daming",text:"宋江殿は傷を養っておられます。今宵、時遷が翠雲楼に火を放すのを合図に城内外から攻め、盧員外と石秀を救い出します。"},
          {name:"物語",text:"呼延灼・李逵ら別路の軍勢も、各門と街道で官軍を引きつけている。獄門前では、脱出隊と外部救援隊が合流を目指していた。"},
          {unit:"shi_xiu_daming",text:"盧員外、今こそ獄門を破る時です。川向こうに梁山泊の旗が見えます！"},
          {unit:"lu_junyi_daming",text:"皆の恩に報いるためにも、必ずこの包囲を抜けて梁山泊へ向かう。"},
          {unit:"yan_qing_daming",text:"私は水門側から潜り込みました。城門外の街道には伏兵がいます。左右へ回り、川を越えましょう。"},
          {unit:"liang_zhongshu",text:"梁山泊の賊を一人も逃がすな！　李成、聞達、城門と橋を固めよ！"}
        ],
        victory:[
          {unit:"yan_qing_daming",text:"主人、石秀殿、ここまで来れば追手を振り切れます。"},
          {unit:"lu_junyi_daming",text:"この命、今後は梁山泊のために使おう。宋江殿にも、皆にも、必ず恩を返す。"},
          {unit:"wu_yong_daming",text:"救出は成功です。追手が集まる前に大名府を離れ、梁山泊へ戻りましょう。"},
          {name:"物語",text:"こうして盧俊義は梁山泊へ迎えられ、晁蓋の仇・史文恭との決戦へ向かうことになる。"}
        ],
        map:[
          ["plain","plain","plain","road","road","plain","plain","plain"],
          ["plain","plain","plain","road","road","plain","plain","plain"],
          ["wall","wall","wall","road","road","wall","wall","wall"],
          ["wall","wall","wall","road","road","wall","wall","wall"],
          ["plain","plain","plain","road","road","plain","plain","plain"],
          ["forest","plain","plain","road","road","plain","hill","plain"],
          ["forest","plain","hill","road","road","plain","hill","plain"],
          ["plain","plain","hill","road","road","plain","plain","forest"],
          ["plain","forest","plain","road","road","plain","plain","forest"],
          ["plain","plain","plain","road","road","plain","plain","plain"],
          ["water","swamp","water","road","road","water","swamp","water"],
          ["water","swamp","swamp","road","road","swamp","swamp","water"],
          ["plain","plain","forest","road","road","forest","plain","plain"],
          ["forest","plain","plain","road","road","plain","plain","hill"],
          ["forest","plain","plain","road","road","plain","plain","hill"],
          ["plain","plain","plain","road","road","plain","plain","plain"]
        ],
        units:[
          this.createPlayerCharacterUnit("wu_yong_daming","wu_yong",4,15,4,"north"),
          this.createPlayerCharacterUnit("lin_chong_daming","lin_chong",1,14,4,"north"),
          this.createPlayerCharacterUnit("hua_rong_daming","hua_rong",2,14,4,"north"),
          this.createPlayerCharacterUnit("qin_ming_daming","qin_ming",5,14,4,"north"),
          this.createPlayerCharacterUnit("yang_zhi_daming","yang_zhi",6,14,4,"north"),
          this.createPlayerCharacterUnit("dai_zong_daming","dai_zong",7,15,6,"north"),
          this.createPlayerCharacterUnit("guan_sheng_daming","guan_sheng",0,15,4,"north"),
          this.createPlayerCharacterUnit("sun_li_daming","sun_li",1,15,4,"north"),
          this.createPlayerCharacterUnit("lu_junyi_daming","lu_junyi",3,4,4,"south"),
          this.createPlayerCharacterUnit("shi_xiu_daming","shi_xiu",4,4,4,"south"),
          this.createPlayerCharacterUnit("yan_qing_daming","yan_qing",2,4,4,"south"),
          this.createPlayerCharacterUnit("cai_fu_daming","cai_fu",1,4,3,"south"),
          this.createPlayerCharacterUnit("cai_qing_daming","cai_qing",5,4,3,"south"),
          this.createPlayerCharacterUnit("chai_jin_daming","chai_jin",0,4,3,"south"),
          this.createPlayerCharacterUnit("yue_he_daming","yue_he",6,4,3,"south"),
          this.createPlayerCharacterUnit("kong_ming_daming","kong_ming",0,5,3,"south"),
          this.createPlayerCharacterUnit("kong_liang_daming","kong_liang",1,5,3,"south"),
          this.createPlayerCharacterUnit("zou_yuan_daming","zou_yuan",6,5,3,"south"),
          this.createPlayerCharacterUnit("zou_run_daming","zou_run",7,5,3,"south"),
          this.createEnemyCharacterUnit("liang_zhongshu","liang_zhongshu",4,0,2,"south"),
          this.createEnemyCharacterUnit("li_cheng","li_cheng",3,3,4,"south"),
          this.createEnemyCharacterUnit("wen_da","wen_da",4,3,4,"south"),
          this.u("daming_captain","大名府隊長","将","enemy",3,0,62,68,46,34,3,"south","mob_captain_high_trust_middle","大名府隊長","槍術","なし","威圧的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_archer1","大名府弩兵甲","弩","enemy",1,6,48,50,44,24,3,"north","mob_bow_older_normal_a","大名府弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_archer2","大名府弩兵乙","弩","enemy",6,6,48,50,44,24,3,"north","mob_bow_older_normal_b","大名府弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_guard1","獄門守備兵甲","守","enemy",3,5,52,60,36,26,3,"north","mob_infantry_older_normal_a","大名府守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_guard2","獄門守備兵乙","守","enemy",4,5,52,60,36,26,3,"north","mob_infantry_older_normal_b","大名府守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_guard3","城内守備兵甲","守","enemy",0,1,52,60,36,26,3,"south","mob_infantry_older_normal_a","大名府守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_guard4","城内守備兵乙","守","enemy",7,1,52,60,36,26,3,"south","mob_infantry_older_normal_b","大名府守備兵","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_cavalry7","大名府精鋭騎馬隊甲","精","enemy",2,0,64,62,38,32,4,"south","mob_cavalry_young_strong","大名府精鋭騎馬隊","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_cavalry8","大名府精鋭騎馬隊乙","精","enemy",5,0,63,61,37,31,4,"south","mob_cavalry_older_strong","大名府精鋭騎馬隊","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_inner_cavalry1","城内騎馬隊甲","騎","enemy",2,1,60,60,38,28,4,"south","mob_cavalry_young_strong","大名府騎馬隊","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_inner_cavalry3","城内騎馬隊丙","騎","enemy",3,1,60,60,38,28,4,"south","mob_cavalry_young_strong","大名府騎馬隊","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_inner_cavalry5","城内騎馬隊戊","騎","enemy",4,1,60,60,38,28,4,"south","mob_cavalry_older_normal_b","大名府騎馬隊","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_inner_cavalry4","城内騎馬隊丁","騎","enemy",5,1,60,60,38,28,4,"south","mob_cavalry_older_normal_b","大名府騎馬隊","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_inner_archer1","門内弩隊甲","弩","enemy",3,2,48,50,44,24,3,"south","mob_bow_young_normal_a","大名府門内弩隊","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_inner_archer2","門内弩隊乙","弩","enemy",4,2,48,50,44,24,3,"south","mob_bow_older_normal_b","大名府門内弩隊","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_guard5","大名府守備兵丙","守","enemy",3,6,54,62,38,28,3,"north","mob_infantry_young_strong","大名府守備兵","槍術","なし","実直・慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_guard6","大名府守備兵丁","守","enemy",4,6,54,62,38,28,3,"north","mob_infantry_older_strong","大名府守備兵","槍術","なし","実直・慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_captain2","大名府隊長乙","将","enemy",3,7,62,68,46,34,3,"north","mob_captain_high_trust_middle","大名府隊長","槍術","なし","威圧的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_captain3","大名府隊長丙","将","enemy",4,7,62,68,46,34,3,"north","mob_captain_standard_middle","大名府隊長","槍術","なし","実直・指揮的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_adviser2","大名府参謀乙","謀","enemy",3,8,24,58,92,46,3,"north","mob_adviser_civil_negotiation","大名府参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_adviser","大名府参謀","謀","enemy",4,8,24,58,92,46,3,"north","mob_adviser_civil_negotiation","大名府参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_archer3","大名府弩兵丙","弩","enemy",1,8,48,50,44,24,3,"north","mob_bow_young_normal_a","大名府弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_archer4","大名府弩兵丁","弩","enemy",7,8,48,50,44,24,3,"north","mob_bow_young_normal_b","大名府弩兵","弓弩術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_soldier1","大名府官兵甲","甲","enemy",3,10,50,54,34,24,3,"north","mob_infantry_young_normal_a","大名府官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_soldier2","大名府官兵乙","乙","enemy",4,10,50,54,34,24,3,"north","mob_infantry_young_normal_b","大名府官兵","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_cavalry1","大名府騎兵甲","騎","enemy",2,9,60,60,38,28,4,"north","mob_cavalry_older_normal_b","大名府騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_cavalry2","大名府騎兵乙","騎","enemy",5,9,60,60,38,28,4,"north","mob_cavalry_young_strong","大名府騎兵","騎乗戦闘","なし","勇猛","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_front_infantry_left","大名府前衛歩兵隊甲","歩","enemy",1,10,50,54,34,24,3,"north","mob_infantry_young_normal_a","大名府前衛歩兵隊","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_front_infantry_right","大名府前衛歩兵隊乙","歩","enemy",6,10,50,54,34,24,3,"north","mob_infantry_older_normal_a","大名府前衛歩兵隊","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_gate_ambush_left","大名府歩兵隊丙","歩","enemy",1,7,50,56,34,24,3,"north","mob_infantry_young_normal_b","大名府歩兵隊","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_gate_ambush_right","大名府歩兵隊丁","歩","enemy",6,7,50,56,34,24,3,"north","mob_infantry_older_normal_b","大名府歩兵隊","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_street_blocker_left","大名府歩兵隊戊","歩","enemy",2,8,52,58,34,24,3,"north","mob_infantry_young_normal_a","大名府歩兵隊","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_street_blocker_right","大名府歩兵隊己","歩","enemy",5,8,52,58,34,24,3,"north","mob_infantry_older_normal_a","大名府歩兵隊","槍術","なし","慎重","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_reinforcement_infantry_left","大名府歩兵隊庚","歩","enemy",0,9,50,54,34,24,3,"north","mob_infantry_young_normal_b","大名府歩兵隊","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("daming_reinforcement_infantry_right","大名府歩兵隊辛","歩","enemy",7,9,50,54,34,24,3,"north","mob_infantry_older_normal_b","大名府歩兵隊","槍術","なし","実直","ゲーム用仮設定","ゲーム用仮設定")
        ]
      },
      {
        id:"zengtou-fortress",
        chapterNumber:9,
        turnLimit:20,
        title:"第九章　曾頭市・宿命の決戦",
        description:"曾頭市軍を寨外の広い平地へ引き出し、北西・北・北東と南方に展開した梁山泊軍を再結集しながら敵大軍を殲滅する総力戦。",
        objective:"勝利：曾頭市軍を全滅<br>敗北：宋江または盧俊義が敗走",
        leader:"song_jiang_zengtou",
        requiredSurvivors:["lu_junyi_zengtou"],
        intro:[
          {unit:"song_jiang_zengtou",text:"曾頭市軍は寨外へ出た。北側の各隊は互いに呼応し、南の本隊と挟み込め。敵兵は多い、孤立だけはするな。"},
          {unit:"wu_yong_zengtou",text:"包囲の形にこだわりすぎてはいけません。敵の厚い所を避け、二つ三つの隊を合わせて局地的な優勢を作りましょう。"},
          {unit:"qin_ming_zengtou",text:"史文恭め、前へ出てきたな！　霹靂火・秦明が相手をしてやる！"},
          {unit:"lu_junyi_zengtou",text:"私は燕青と北の退路を押さえる。史文恭が逃げれば、ここで受け止めよう。"},
          {unit:"shi_wengong",text:"四方から囲んだつもりか。曾頭市の兵を甘く見るな。梁山泊の包囲を正面から破ってくれる！"},
          {unit:"zeng_nong",text:"各隊、平地へ押し出せ！　兵数はこちらが上だ。梁山泊の薄い戦線を一つずつ潰せ！"}
        ],
        victory:[
          {unit:"song_jiang_zengtou",text:"曾頭市軍は潰えた。これでこの戦いは終わりだ。晁蓋殿への弔いを果たし、寨へ帰ろう。"},
          {unit:"lu_junyi_zengtou",text:"各方面の敵は討ち果たした。史文恭ももはや戦場には立てまい。"},
          {unit:"wu_yong_zengtou",text:"大軍を相手に各戦線をつなぎ直し、最後まで敵戦力を削り切ったことが勝因です。"}
        ],
        zengtouBetrayal:{
          turn:6,
          unitId:"yu_baosi",
          dialogue:[
            {unit:"yu_baosi",action:"寝返り",text:"曾頭市にはこれ以上従えぬ。郁保四、これより梁山泊へ加勢する！"},
            {unit:"wu_yong_zengtou",text:"よし。その位置から敵陣を乱してくれ。本隊も呼応して押し上げる。"}
          ]
        },
        // v9.5.3：郁保四は第6自軍ターンの寝返りまで曾頭市側で固定待機。
        stationaryUnits:["yu_baosi"],
        stationaryLabels:{
          yu_baosi:"陣中待機"
        },
        qinMingReinforcement:{
          triggerUnitId:"qin_ming_zengtou",
          name:this.stageNineFireWaterEffectTestEnabled?"関勝・徐寧の救援隊":"関勝・徐寧・単廷珪・魏定国の救援隊",
          dialogue:[
            {unit:"song_jiang_zengtou",text:"秦明は重傷を負い戦線を離れた。だが梁山泊から新たな援軍が到着したぞ！"},
            {unit:"guan_sheng_zengtou",action:"味方救援",text:"関勝、救援に参った。秦明の分までこの戦線を支える。"},
            {unit:"xu_ning_zengtou",text:"徐寧も参戦する。敵の騎兵は私に任せてもらおう。"},
            ...(this.stageNineFireWaterEffectTestEnabled?[]:[
              {unit:"shan_tinggui_zengtou",text:"単廷珪、到着した。水計を使う機会があれば崩してみせよう。"},
              {unit:"wei_dingguo_zengtou",text:"魏定国も来たぞ。火計で敵陣を焼き崩してやる。"}
            ])
          ],
          units:[
            this.createPlayerCharacterUnit("guan_sheng_zengtou","guan_sheng",0,18,4,"north"),
            this.createPlayerCharacterUnit("xu_ning_zengtou","xu_ning",7,18,4,"north"),
            ...(this.stageNineFireWaterEffectTestEnabled?[]:[
              this.createPlayerCharacterUnit("shan_tinggui_zengtou","shan_tinggui",0,19,4,"north"),
              this.createPlayerCharacterUnit("wei_dingguo_zengtou","wei_dingguo",7,19,4,"north")
            ])
          ]
        },
        map:[
          ["hill","hill","plain","plain","road","plain","forest","forest"],
          ["hill","plain","hill","plain","road","forest","forest","plain"],
          ["plain","hill","hill","hill","road","forest","hill","plain"],
          ["swamp","swamp","plain","hill","road","forest","hill","hill"],
          ["swamp","swamp","plain","road","road","forest","forest","plain"],
          ["swamp","swamp","plain","road","plain","forest","forest","plain"],
          ["plain","swamp","plain","road","plain","plain","forest","plain"],
          ["plain","plain","plain","road","road","plain","plain","plain"],
          ["plain","plain","plain","plain","road","plain","forest","plain"],
          ["plain","plain","plain","plain","road","plain","plain","plain"],
          ["plain","plain","plain","plain","road","plain","plain","plain"],
          ["plain","plain","plain","plain","road","plain","plain","plain"],
          ["plain","plain","forest","plain","road","plain","plain","hill"],
          ["plain","forest","forest","plain","road","plain","hill","hill"],
          ["plain","forest","plain","road","road","plain","hill","plain"],
          ["plain","plain","plain","road","plain","plain","plain","plain"],
          ["plain","plain","road","road","plain","plain","plain","plain"],
          ["plain","road","road","plain","plain","plain","forest","plain"],
          ["plain","road","plain","plain","plain","forest","forest","plain"],
          ["plain","road","plain","plain","plain","plain","plain","plain"]
        ],
        units:[
          this.createPlayerCharacterUnit("yang_zhi_zengtou","yang_zhi",3,0,4,"south"),
          this.createPlayerCharacterUnit("shi_jin_zengtou","shi_jin",4,0,4,"south"),
          this.createPlayerCharacterUnit("yang_chun_zengtou","yang_chun",3,1,4,"south"),
          this.createPlayerCharacterUnit("chen_da_zengtou","chen_da",4,1,4,"south"),
          this.createPlayerCharacterUnit("lu_junyi_zengtou","lu_junyi",0,0,4,"south"),
          this.createPlayerCharacterUnit("yan_qing_zengtou","yan_qing",0,1,4,"south"),
          this.createPlayerCharacterUnit("zhu_tong_zengtou","zhu_tong",1,1,4,"east"),
          this.createPlayerCharacterUnit("lei_heng_zengtou","lei_heng",2,1,4,"east"),
          this.createPlayerCharacterUnit("zou_yuan_zengtou","zou_yuan",1,2,3,"east"),
          this.createPlayerCharacterUnit("zou_run_zengtou","zou_run",2,2,3,"east"),
          this.createPlayerCharacterUnit("lu_zhishen_zengtou","lu_zhishen",5,1,3,"west"),
          this.createPlayerCharacterUnit("wu_song_zengtou","wu_song",6,1,4,"west"),
          this.createPlayerCharacterUnit("kong_ming_zengtou","kong_ming",5,2,3,"west"),
          this.createPlayerCharacterUnit("kong_liang_zengtou","kong_liang",6,2,3,"west"),
          this.createPlayerCharacterUnit("hua_rong_zengtou","hua_rong",2,15,4,"north"),
          this.createPlayerCharacterUnit("qin_ming_zengtou","qin_ming",3,15,4,"north"),
          this.createPlayerCharacterUnit("ma_lin_zengtou","ma_lin",4,15,4,"north"),
          this.createPlayerCharacterUnit("deng_fei_zengtou","deng_fei",5,15,4,"north"),
          this.createPlayerCharacterUnit("lu_fang_zengtou","lu_fang",2,17,4,"north"),
          this.createPlayerCharacterUnit("guo_sheng_zengtou","guo_sheng",3,17,4,"north"),
          this.createPlayerCharacterUnit("xie_zhen_zengtou","xie_zhen",4,17,3,"north"),
          this.createPlayerCharacterUnit("xie_bao_zengtou","xie_bao",5,17,3,"north"),
          this.createPlayerCharacterUnit("dai_zong_zengtou","dai_zong",1,18,6,"north"),
          this.createPlayerCharacterUnit("shi_qian_zengtou","shi_qian",2,18,5,"north"),
          this.createPlayerCharacterUnit("song_jiang_zengtou","song_jiang",3,18,3,"north"),
          this.createPlayerCharacterUnit("wu_yong_zengtou","wu_yong",4,18,4,"north"),
          this.createPlayerCharacterUnit("gongsun_sheng_zengtou","gongsun_sheng",5,18,4,"north"),
          this.createPlayerCharacterUnit("li_kui_zengtou","li_kui",2,19,4,"north"),
          this.createPlayerCharacterUnit("fan_rui_zengtou","fan_rui",3,19,4,"north"),
          this.createPlayerCharacterUnit("xiang_chong_zengtou","xiang_chong",4,19,4,"north"),
          this.createPlayerCharacterUnit("li_gun_zengtou","li_gun",5,19,4,"north"),
          // v9.7.19：火計・水計エフェクト確認用。敵前面へ両術者を置き、開始直後から計略を確認できるようにする。
          ...(this.stageNineFireWaterEffectTestEnabled?[
            this.createPlayerCharacterUnit("shan_tinggui_zengtou","shan_tinggui",2,13,4,"north"),
            this.createPlayerCharacterUnit("wei_dingguo_zengtou","wei_dingguo",5,13,4,"north")
          ]:[]),
          this.createEnemyCharacterUnit("zeng_nong","zeng_nong",4,5,2,"south"),
          this.createEnemyCharacterUnit("su_ding","su_ding",3,6,4,"south"),
          this.createEnemyCharacterUnit("zeng_tu","zeng_tu",2,7,4,"south"),
          this.createEnemyCharacterUnit("zeng_mi","zeng_mi",5,7,4,"south"),
          this.createEnemyCharacterUnit("zeng_kui","zeng_kui",6,8,4,"west"),
          this.createEnemyCharacterUnit("zeng_suo","zeng_suo",1,8,4,"east"),
          this.createEnemyCharacterUnit("zeng_sheng","zeng_sheng",4,9,4,"north"),
          this.createEnemyCharacterUnit("yu_baosi","yu_baosi",3,10,3,"north"),
          this.createEnemyCharacterUnit("shi_wengong","shi_wengong",4,12,4,"south"),
          this.u("zengtou_field_01","曾頭市精鋭騎兵01","精","enemy",2,4,70,72,46,36,4,"south","zengtou_cavalry_very_strong","曾頭市精鋭騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_02","曾頭市歩兵隊02","歩","enemy",3,4,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_03","曾頭市弩兵隊03","弩","enemy",4,4,56,60,52,30,3,"south","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_04","曾頭市歩兵隊04","歩","enemy",7,4,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_05","曾頭市精鋭騎兵05","精","enemy",1,5,70,72,46,36,4,"south","zengtou_cavalry_very_strong","曾頭市精鋭騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_06","曾頭市歩兵隊06","歩","enemy",2,5,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_07","曾頭市弩兵隊07","弩","enemy",3,5,56,60,52,30,3,"south","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_08","曾頭市歩兵隊08","歩","enemy",5,5,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_09","曾頭市騎兵隊09","騎","enemy",6,5,64,68,42,34,4,"south","zengtou_cavalry_young_strong","曾頭市騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_10","曾頭市歩兵隊10","歩","enemy",1,6,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_11","曾頭市弩兵隊11","弩","enemy",2,6,56,60,52,30,3,"south","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_12","曾頭市歩兵隊12","歩","enemy",4,6,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_13","曾頭市騎兵隊13","騎","enemy",5,6,64,68,42,34,4,"south","zengtou_cavalry_young_strong","曾頭市騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_14","曾頭市歩兵隊14","歩","enemy",6,6,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_15","曾頭市弩兵隊15","弩","enemy",0,7,56,60,52,30,3,"south","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_16","曾頭市歩兵隊16","歩","enemy",1,7,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_17","曾頭市騎兵隊17","騎","enemy",3,7,64,68,42,34,4,"south","zengtou_cavalry_young_strong","曾頭市騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_18","曾頭市歩兵隊18","歩","enemy",4,7,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_19","曾頭市弩兵隊19","弩","enemy",6,7,56,60,52,30,3,"south","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_20","曾頭市歩兵隊20","歩","enemy",7,7,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_21","曾頭市精鋭騎兵21","精","enemy",0,8,70,72,46,36,4,"south","zengtou_cavalry_very_strong","曾頭市精鋭騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_22","曾頭市歩兵隊22","歩","enemy",2,8,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_23","曾頭市弩兵隊23","弩","enemy",3,8,56,60,52,30,3,"south","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_24","曾頭市歩兵隊24","歩","enemy",4,8,58,64,40,32,3,"south","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_25","曾頭市精鋭騎兵25","精","enemy",5,8,70,72,46,36,4,"south","zengtou_cavalry_very_strong","曾頭市精鋭騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          // v9.5.1：左右側面の厚みを増す追加部隊（A10～A12 / H10～H12、B13 / G13）
          this.u("zengtou_left_infantry","曾頭市左翼歩兵隊","歩","enemy",0,9,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_left_adviser","曾頭市左翼参謀","謀","enemy",0,10,24,54,88,44,3,"north","mob_adviser_military_formation","曾頭市参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_left_archer","曾頭市左翼弩兵隊","弩","enemy",0,11,56,60,52,30,3,"north","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_right_infantry","曾頭市右翼歩兵隊","歩","enemy",7,9,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_right_adviser","曾頭市右翼参謀","謀","enemy",7,10,24,54,88,44,3,"north","mob_adviser_military_scout","曾頭市参謀","なし","なし","冷静・策謀的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_right_archer","曾頭市右翼弩兵隊","弩","enemy",7,11,56,60,52,30,3,"north","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","慎重・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_left_captain","曾頭市左翼隊長","将","enemy",1,12,62,68,46,34,3,"north","mob_captain_high_trust_middle","曾頭市隊長","槍術","なし","実直・指揮的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_right_captain","曾頭市右翼隊長","将","enemy",6,12,62,68,46,34,3,"north","mob_captain_high_trust_young","曾頭市隊長","槍術","なし","実直・指揮的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_26","曾頭市歩兵隊26","歩","enemy",1,9,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_27","曾頭市弩兵隊27","弩","enemy",2,9,56,60,52,30,3,"north","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_28","曾頭市歩兵隊28","歩","enemy",3,9,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_29","曾頭市騎兵隊29","騎","enemy",5,9,64,68,42,34,4,"north","zengtou_cavalry_young_strong","曾頭市騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_30","曾頭市歩兵隊30","歩","enemy",6,9,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_31","曾頭市弩兵隊31","弩","enemy",1,10,56,60,52,30,3,"north","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_32","曾頭市歩兵隊32","歩","enemy",2,10,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_33","曾頭市騎兵隊33","騎","enemy",4,10,64,68,42,34,4,"north","zengtou_cavalry_young_strong","曾頭市騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_34","曾頭市歩兵隊34","歩","enemy",5,10,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_35","曾頭市弩兵隊35","弩","enemy",1,11,56,60,52,30,3,"north","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_36","曾頭市歩兵隊36","歩","enemy",2,11,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_37","曾頭市騎兵隊37","騎","enemy",5,11,64,68,42,34,4,"north","zengtou_cavalry_young_strong","曾頭市騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_38","曾頭市歩兵隊38","歩","enemy",6,11,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_39","曾頭市弩兵隊39","弩","enemy",2,12,56,60,52,30,3,"north","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_40","曾頭市歩兵隊40","歩","enemy",3,12,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_41","曾頭市精鋭騎兵41","精","enemy",5,12,70,72,46,36,4,"north","zengtou_cavalry_very_strong","曾頭市精鋭騎兵","騎乗戦闘","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_42","曾頭市歩兵隊42","歩","enemy",3,13,58,64,40,32,3,"north","zengtou_infantry_older_strong","曾頭市歩兵","槍術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定"),
          this.u("zengtou_field_43","曾頭市弩兵隊43","弩","enemy",4,13,56,60,52,30,3,"north","zengtou_bow_older_strong","曾頭市弩兵","弓弩術","なし","勇猛・規律的","ゲーム用仮設定","ゲーム用仮設定")
        ]
      }
    ]
  }

  /**
   * 自軍部隊の最大兵力を算出する。
   * @param {number} command 統率
   * @returns {number} 最大兵力
   */
  playerMaxHp(command){
    return 100+Math.floor(command*.50)
  }

  /**
   * 敵軍へ追加する統率由来の兵力を算出する。
   * 統率の半分を10単位で切り上げる。
   * @param {number} command 統率
   * @returns {number} 追加兵力
   */
  enemyCommandHpBonus(command){
    return Math.ceil((command*.50)/10)*10
  }

  enemyMaxHp(name,combatSkill,command){
    const commandBasedFutureAllies=new Set(["孫立","孫新","顧大嫂","解珍","解宝","鄒淵","鄒潤","楽和","郁保四"]);
    if(commandBasedFutureAllies.has(name)){return this.playerMaxHp(command)}

    const namedEnemyHp={
      "祝朝奉":500,
      "董超":180,
      "薛覇":180,
      "楊志":220,
      "秦明":240,
      "黄信":220,
      "欒廷玉":240,
      "祝龍":220,
      "祝虎":220,
      "祝彪":220,
      "扈三娘":220,
      "黄文炳":160,
      "蔡得章":300,
      "刑場執行官":250,
      "高廉":400,
      "于直":220,
      "温文宝":230,
      "薛元輝":240,
      "梁世傑":320,
      "李成":260,
      "聞達":260,
      "曾弄":340,
      "史文恭":320,
      "蘇定":240,
      "曾塗":250,
      "曾密":240,
      "曾索":240,
      "曾魁":250,
      "曾昇":230
    };

    let baseHp=180;
    if(namedEnemyHp[name]!==undefined){baseHp=namedEnemyHp[name]}
    else if(name.includes("飛天神兵")){baseHp=260}
    else if(name.includes("飛天歩兵")){baseHp=220}
    else if(name.includes("飛天騎兵")){baseHp=240}
    else if(name.includes("飛天弩兵")){baseHp=200}
    else if(name.includes("高廉食客・術士")){baseHp=100}
    else if(name.includes("高唐州参謀")){baseHp=120}
    else if(name.includes("隊長")||name.includes("守将")){baseHp=240}
    else if(name.includes("参謀")||name.includes("術師")){baseHp=160}
    else if(name.includes("刺客頭")){baseHp=200}
    else if(name.includes("刺客")){baseHp=140}
    else if(name.includes("弓兵")||name.includes("弩兵")||combatSkill.includes("弓弩")){baseHp=180}
    else if(name.includes("騎兵")||combatSkill.includes("騎乗戦闘")||combatSkill.includes("騎馬戦闘")){baseHp=220}
    else if(name.includes("官兵")||name.includes("守備兵")||name.includes("執行官")){baseHp=200}
    else if(name.includes("護送兵")||name.includes("祝家荘兵")){baseHp=180}

    return baseHp+this.enemyCommandHpBonus(command)
  }

  strategyPointByIntelligence(intelligence){
    if(intelligence>=100){return 10}
    if(intelligence>=95){return 8}
    if(intelligence>=90){return 7}
    if(intelligence>=85){return 6}
    if(intelligence>=80){return 5}
    if(intelligence>=70){return 4}
    if(intelligence>=65){return 3}
    if(intelligence>=60){return 2}
    if(intelligence>=50){return 1}
    return 0
  }

  /**
   * 人物管理に登録された固有人物から、自軍ユニット定義を生成する。
   * 最大兵力は既存の自軍用計算 playerMaxHp() を経由して決定する。
   * @param {string} id ステージ内で使用するユニットID
   * @param {string} characterId 人物管理に登録された人物ID
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} move 移動力
   * @param {string} facing 初期方向
   * @returns {object} ユニット定義
   */
  createPlayerCharacterUnit(id,characterId,x,y,move,facing){
    const character=CHARACTER_MANAGER.get(characterId);
    return this.u(
      id,character.name,character.short,"player",x,y,
      character.martial,character.command,character.intelligence,character.charisma,
      move,facing,character.portrait,character.alias,character.combatSkill,
      character.specialAbility,character.personality,
      character.historical,character.source,character.reading
    )
  }

  /**
   * 人物管理に登録された固有人物から、敵軍ユニット定義を生成する。
   * 最大兵力は既存の敵軍用計算 enemyMaxHp() を経由して決定する。
   * @param {string} id ステージ内で使用するユニットID
   * @param {string} characterId 人物管理に登録された人物ID
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} move 移動力
   * @param {string} facing 初期方向
   * @returns {object} ユニット定義
   */
  createEnemyCharacterUnit(id,characterId,x,y,move,facing){
    const character=CHARACTER_MANAGER.get(characterId);
    return this.u(
      id,character.name,character.short,"enemy",x,y,
      character.martial,character.command,character.intelligence,character.charisma,
      move,facing,character.portrait,character.alias,character.combatSkill,
      character.specialAbility,character.personality,
      character.historical,character.source,character.reading
    )
  }

  u(id,name,short,team,x,y,martial,command,intelligence,charisma,move,facing,portrait,alias,combatSkill,specialAbility,personality,historical,source,reading=""){
    const isMob=source==="ゲーム用仮設定";
    // 連環馬は重装・連結運用のため、通常の騎馬より機動力を抑えて移動力3で固定する。
    const effectiveMove=String(specialAbility).includes("連環馬")?3:move;
    const maxHp=team==="enemy"?this.enemyMaxHp(name,combatSkill,command):this.playerMaxHp(command);
    const attack=martial;
    const defense=command;
    const hasIllusion=specialAbility.includes("幻術");
    const hasElementalTactic=specialAbility.includes("火計")||specialAbility.includes("水計");
    const maxStrategyUses=hasIllusion?6:hasElementalTactic?2:this.strategyPointByIntelligence(intelligence);
    // 火計・水計の使用者は固有戦法へ置き換えるため、通常撹乱Lvは持たせない。
    const maxStrategyLevel=hasIllusion?1:hasElementalTactic?0:(intelligence>=97?3:intelligence>=90?2:intelligence>=50?1:0);

    return {id,name,reading,short,team,x,y,martial,command,intelligence,charisma,move:effectiveMove,facing,portrait,alias,combatSkill,specialAbility,personality,historical,source,isMob,maxHp,attack,defense,maxStrategyUses,maxStrategyLevel,hasIllusion,hasElementalTactic}
  }

  bind(){
    document.addEventListener("touchmove",event=>{
      if(!this.longPressTriggered){return}
      event.preventDefault();
      this.restoreLongPressScrollPosition()
    },{passive:false});

    document.addEventListener("pointerdown",event=>{
      const button=event.target.closest("button");
      if(button===null||button.disabled||button.id==="audioButton"||button.classList.contains("stage-btn")){return}
      this.audio.button()
    });
    this.bowBtn.onclick=()=>this.beginBow();this.chargeBtn.onclick=()=>this.beginCharge();this.strategyBtn.onclick=()=>this.beginStrategy();this.waitBtn.onclick=()=>this.beginFacing(true);this.cancelBtn.onclick=()=>this.cancel();
    this.strategyLevelButtons.forEach(button=>{button.onclick=()=>this.selectStrategyLevel(Number(button.dataset.strategyLevel))});
    this.endTurnBtn.addEventListener("click",event=>{
      if(this.endTurnBtn.disabled){return}
      event.preventDefault();
      event.stopPropagation();
      this.requestEndTurn()
    });
    this.e("audioButton").onclick=()=>{const on=this.audio.toggle();this.e("audioButton").textContent=on?"音声：ON":"音声：OFF";if(on){this.audio.button();if(this.e("stageOverlay").classList.contains("show")){this.audio.startStageSelectThemeLoop().catch(()=>{})}}};
    this.e("restartButton").onclick=()=>this.requestStageSelectFromBattle();this.e("selectStageButton").onclick=()=>this.openStageSelect();
    this.e("manualSaveButton").onclick=()=>this.openSaveSlotSelector("save",true);
    this.e("manualLoadButton").onclick=()=>this.openSaveSlotSelector("load",true);
    this.e("stageSelectLoadButton").onclick=()=>this.openSaveSlotSelector("load",false);
    this.e("saveSlotCloseButton").onclick=()=>this.closeSaveSlotSelector();
    this.saveSlotOverlay.addEventListener("click",event=>{
      if(event.target===this.saveSlotOverlay){this.closeSaveSlotSelector()}
    });
    this.e("nextStageButton").onclick=()=>{const next=(this.currentStage+1)%this.stages.length;this.loadStage(next)}
    this.e("recoveryLoadButton").onclick=()=>this.loadRecoveryFromPrompt();
    this.e("recoverySkipButton").onclick=()=>this.closeRecoveryPrompt();

    // v9.5.6：ステージ情報はタップで開き、ボタン以外の画面タップで閉じる。
    // 音声・ステージ選択・セーブ・ロードはオーバーレイ内の通常ボタンとして直接操作する。
    this.stageInfoBtn.addEventListener("click",event=>{
      // v9.5.7：敵ターン中は敵行動の視認を優先し、ステージ情報を開かない。
      if(this.units.length===0||!this.isPlayerInteractionReady()){return}
      event.preventDefault();
      event.stopPropagation();
      this.showStageInfo()
    });
    this.stageInfoOverlay.addEventListener("click",event=>{
      if(event.target.closest("#audioButton,#restartButton,#manualSaveButton,#manualLoadButton")!==null){return}
      this.hideStageInfo()
    });
    // v9.5.9：戦況は味方ターン中のみタップで開き、オーバーレイの画面タップで閉じる。
    this.battleStatusBtn.addEventListener("click",event=>{
      if(this.units.length===0||!this.isPlayerInteractionReady()){return}
      event.preventDefault();
      event.stopPropagation();
      this.showBattleStatus()
    });
    this.battleStatusOverlay.addEventListener("click",()=>this.hideBattleStatus());
    this.strategyGuideBtn.addEventListener("click",event=>{
      if(this.units.length===0||!this.isPlayerInteractionReady()){return}
      event.preventDefault();
      event.stopPropagation();
      this.showStrategyGuide()
    });
    this.strategyGuideOverlay.addEventListener("click",()=>this.hideStrategyGuide());
    // v9.5.19：盤面ユニットだけでなく、通常の部隊情報パネル長押しでも同じ能力詳細を開く。
    this.unitInfoPanel.addEventListener("contextmenu",event=>event.preventDefault());
    this.unitInfoPanel.addEventListener("selectstart",event=>event.preventDefault());
    this.unitInfoPanel.addEventListener("pointerdown",event=>{
      const unit=this.selectedCellX!==null&&this.selectedCellY!==null&&this.inside(this.selectedCellX,this.selectedCellY)
        ?this.unitAt(this.selectedCellX,this.selectedCellY)
        :this.selected();
      this.startLongPress(event,unit)
    });
    this.unitInfoPanel.addEventListener("pointermove",event=>this.moveLongPress(event));
    this.unitInfoPanel.addEventListener("pointerup",()=>this.endLongPress());
    this.unitInfoPanel.addEventListener("pointercancel",()=>this.endLongPress());
    this.abilityOverlay.addEventListener("contextmenu",event=>event.preventDefault());
    this.abilityOverlay.addEventListener("selectstart",event=>event.preventDefault());
    this.abilityOverlay.addEventListener("click",()=>{
      // 長押し成立直後に発生する同一ジェスチャー由来のclickでは閉じない。
      if(performance.now()<this.abilityOverlayClickReadyAt){return}
      this.hideAbilityOverlay()
    });
  }

  requestStageSelectFromBattle(){
    if(this.units.length===0||this.finished){this.openStageSelect();return}
    const confirmed=window.confirm("戦闘を終了してステージ選択へ戻りますか？\n現在の戦闘状況は破棄されます。");
    if(!confirmed){return}
    this.openStageSelect()
  }

  /**
   * 自軍ターン用UIを表示しておく状態かを返す。
   * 操作可能かどうかとは分離し、行動演出・会話・自動処理中でも自軍ターンなら表示を維持する。
   */
  isPlayerTurnUiVisible(){
    return this.phase==="player"&&!this.finished&&this.units.length>0
  }

  isPlayerInteractionReady(){
    return this.phase==="player"&&!this.locked&&!this.actionResolutionInProgress&&!this.playerTurnSetupInProgress&&!this.playerTurnSetupFailed&&!this.dialogueActive&&!this.missionActive&&!this.finished
  }

  showStageInfo(){
    if(this.stageInfoOverlay===null||!this.isPlayerInteractionReady()){return}
    this.hideBattleStatus();
    this.hideStrategyGuide();
    this.updateStageInfo();
    this.stageInfoOverlay.classList.add("show");
    this.stageInfoOverlay.setAttribute("aria-hidden","false");
    this.stageInfoBtn.setAttribute("aria-expanded","true")
  }

  hideStageInfo(){
    if(this.stageInfoOverlay===null){return}
    this.stageInfoOverlay.classList.remove("show");
    this.stageInfoOverlay.setAttribute("aria-hidden","true");
    this.stageInfoBtn.setAttribute("aria-expanded","false")
  }

  manualSlotNumber(slotId){
    const match=/^manual_(\d{2})$/.exec(slotId);
    return match===null?"--":match[1]
  }

  formatManualSaveDate(savedAt){
    const date=new Date(savedAt);
    if(Number.isNaN(date.getTime())){return "日時不明"}
    return date.toLocaleString("ja-JP",{
      year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false
    })
  }

  manualSlotDetail(summary){
    if(summary===null){return "章・ターン情報なし"}
    return `第${summary.chapterNumber}章　${summary.turn}ターン　味方${summary.playerUnitCount}隊　敵${summary.enemyUnitCount}隊`
  }

  manualSlotIsReadable(status){
    return status==="occupied"||status==="temporary"||status==="backup"
  }

  manualSlotSourceLabel(status){
    if(status==="temporary"){return "（中断保存データ）"}
    if(status==="backup"){return "（前回正常データ）"}
    return ""
  }

  currentManualSaveDetail(){
    const stage=this.stages[this.currentStage];
    if(stage===undefined){return "章・ターン情報なし"}
    return `第${stage.chapterNumber}章　${this.turn}ターン　味方${this.alive("player").length}隊　敵${this.alive("enemy").length}隊`
  }

  openSaveSlotSelector(mode,fromBattle){
    if(mode!=="save"&&mode!=="load"){return false}
    if(this.saveService===null){
      this.showSaveStatusMessage("ブラウザの保存機能を利用できません。");
      return false
    }
    if(mode==="save"&&!this.canSaveManualSnapshot()){
      this.showSaveStatusMessage("現在の進行状態では手動セーブできません。");
      return false
    }
    if(fromBattle&&!this.isPlayerInteractionReady()){
      return false
    }
    this.hideStageInfo();
    this.hideBattleStatus();
    this.hideStrategyGuide();
    this.saveSlotMode=mode;
    this.saveSlotOpenedFromBattle=fromBattle===true;
    this.saveSlotTitle.textContent=mode==="save"?"セーブ選択":"ロード選択";
    this.saveSlotInstruction.textContent=mode==="save"
      ?"保存先を選んでください。使用中の枠は確認後に上書きします。"
      :"読み込むデータを選んでください。未使用・破損・非対応の枠は選択できません。";
    this.renderSaveSlotList();
    this.saveSlotOverlay.classList.add("show");
    this.saveSlotOverlay.setAttribute("aria-hidden","false");
    return true
  }

  closeSaveSlotSelector(){
    if(this.saveSlotOverlay===null){return}
    this.saveSlotOverlay.classList.remove("show");
    this.saveSlotOverlay.setAttribute("aria-hidden","true");
    this.saveSlotMode=null;
    this.saveSlotOpenedFromBattle=false
  }

  refreshSaveSlotListIfOpen(){
    if(this.saveSlotOverlay!==null&&this.saveSlotOverlay.classList.contains("show")){
      this.renderSaveSlotList()
    }
  }

  renderSaveSlotList(){
    if(this.saveService===null||this.saveSlotList===null){return}
    let slots=[];
    try{
      slots=this.saveService.inspectManualSlots(this.manualSaveSlotCount)
    }catch(error){
      console.error("[戦旗水滸伝] 手動セーブ一覧の読込エラー",error);
      this.showSaveStatusMessage("手動セーブ一覧を読み込めませんでした。");
      return
    }
    this.saveSlotList.innerHTML="";
    for(const slot of slots){
      const button=document.createElement("button");
      button.type="button";
      button.className=`save-slot-entry is-${slot.status}`;
      button.dataset.slotId=slot.slotId;

      const number=document.createElement("span");
      number.className="save-slot-number";
      number.textContent=`枠${this.manualSlotNumber(slot.slotId)}`;
      const lines=document.createElement("span");
      lines.className="save-slot-lines";
      const dateLine=document.createElement("span");
      dateLine.className="save-slot-date";
      const detailLine=document.createElement("span");
      detailLine.className="save-slot-detail";

      if(this.manualSlotIsReadable(slot.status)){
        dateLine.textContent=`セーブ日時：${this.formatManualSaveDate(slot.summary.savedAt)}`;
        detailLine.textContent=this.manualSlotDetail(slot.summary)+this.manualSlotSourceLabel(slot.status)
      }else if(slot.status==="empty"){
        dateLine.textContent="セーブ日時：未使用";
        detailLine.textContent=this.saveSlotMode==="save"?"新しく保存できます":"保存データはありません"
      }else if(slot.status==="corrupt"){
        dateLine.textContent="保存データが壊れています";
        detailLine.textContent=this.saveSlotMode==="save"?"選択すると確認後に上書きできます":"読み込めません"
      }else{
        dateLine.textContent="現在の版では利用できません";
        detailLine.textContent="新しい版の保存データを保持しています"
      }

      const loadDisabled=this.saveSlotMode==="load"&&!this.manualSlotIsReadable(slot.status);
      const saveDisabled=this.saveSlotMode==="save"&&slot.status==="incompatible";
      button.disabled=loadDisabled||saveDisabled;
      if(!button.disabled){button.onclick=()=>this.selectManualSlot(slot.slotId)}
      lines.append(dateLine,detailLine);
      button.append(number,lines);
      this.saveSlotList.appendChild(button)
    }
  }

  selectManualSlot(slotId){
    if(this.saveService===null||this.saveSlotMode===null){return}
    let slot=null;
    try{
      slot=this.saveService.inspectSlot(slotId,"manual")
    }catch(error){
      console.error("[戦旗水滸伝] 手動セーブ枠の確認エラー",error);
      this.showSaveStatusMessage("選択した保存枠を確認できませんでした。");
      return
    }
    if(this.saveSlotMode==="save"){
      this.confirmManualSave(slot);
      return
    }
    this.confirmManualLoad(slot)
  }

  confirmManualSave(slot){
    if(slot.status==="incompatible"){
      this.showSaveStatusMessage("この枠は新しい版の保存データを保持しているため上書きできません。");
      return
    }
    if(!this.canSaveManualSnapshot()){
      this.showSaveStatusMessage("現在の進行状態では手動セーブできません。");
      return
    }
    const number=this.manualSlotNumber(slot.slotId);
    const action=slot.status==="empty"?"保存":"上書き保存";
    const existing=slot.summary===null?"":`\n現在：${this.formatManualSaveDate(slot.summary.savedAt)}\n${this.manualSlotDetail(slot.summary)}${this.manualSlotSourceLabel(slot.status)}`;
    const corrupt=slot.status==="corrupt"?"\n壊れているデータは置き換えられます。":"";
    const confirmed=window.confirm(`セーブ枠${number}へ${action}しますか？\n${this.currentManualSaveDetail()}${existing}${corrupt}`);
    if(!confirmed){return}
    const result=this.saveService.requestSave(slot.slotId,"manual",0);
    if(result.ok&&result.status==="saved"){
      this.closeSaveSlotSelector();
      this.showSaveStatusMessage(`セーブ枠${number}へ保存しました。`);
      return
    }
    this.renderSaveSlotList();
    if(result.code==="SAVE_CONFLICT"){
      this.showSaveStatusMessage("別のタブで保存枠が更新されました。内容を確認してもう一度選んでください。");
    }else{
      this.showSaveStatusMessage("手動セーブできませんでした。現在の状態と保存容量を確認してください。")
    }
  }

  confirmManualLoad(slot){
    if(!this.manualSlotIsReadable(slot.status)){
      this.showSaveStatusMessage("この保存枠は読み込めません。");
      this.renderSaveSlotList();
      return
    }
    const number=this.manualSlotNumber(slot.slotId);
    const battleWarning=this.saveSlotOpenedFromBattle?"\n現在の戦闘状況は破棄されます。":"";
    const sourceLabel=this.manualSlotSourceLabel(slot.status);
    const confirmed=window.confirm(`セーブ枠${number}${sourceLabel}を読み込みますか？\n${this.formatManualSaveDate(slot.summary.savedAt)}\n${this.manualSlotDetail(slot.summary)}${battleWarning}`);
    if(!confirmed){return}
    // ロードを確定した時点で、音声準備待ち中の古いステージ開始要求を失効させる。
    this.invalidateStageLaunchRequests();
    let result=null;
    try{
      result=this.saveService.readSlot(slot.slotId,"manual",slot.guard)
    }catch(error){
      console.error("[戦旗水滸伝] 手動セーブ読込エラー",error)
    }
    if(result===null||result.snapshot===null){
      this.showSaveStatusMessage(result?.status==="conflict"?"別のタブで保存内容が更新されました。内容を確認して、もう一度選んでください。":"手動セーブを読み込めませんでした。");
      this.renderSaveSlotList();
      return
    }
    this.closeSaveSlotSelector();
    this.beginSaveLoadTransition(result.snapshot,"manual")
  }

  showBattleStatus(){
    if(this.battleStatusOverlay===null||!this.isPlayerInteractionReady()){return}
    this.hideStageInfo();
    this.hideStrategyGuide();
    this.battleStatusOverlay.classList.add("show");
    this.battleStatusOverlay.setAttribute("aria-hidden","false");
    this.battleStatusBtn.setAttribute("aria-expanded","true");
    const log=this.e("log");
    if(log!==null){log.scrollTop=log.scrollHeight}
  }

  hideBattleStatus(){
    if(this.battleStatusOverlay===null){return}
    this.battleStatusOverlay.classList.remove("show");
    this.battleStatusOverlay.setAttribute("aria-hidden","true");
    this.battleStatusBtn.setAttribute("aria-expanded","false")
  }

  showStrategyGuide(){
    if(this.strategyGuideOverlay===null||!this.isPlayerInteractionReady()){return}
    this.hideStageInfo();
    this.hideBattleStatus();
    this.strategyGuideOverlay.classList.add("show");
    this.strategyGuideOverlay.setAttribute("aria-hidden","false");
    this.strategyGuideBtn.setAttribute("aria-expanded","true")
  }

  hideStrategyGuide(){
    if(this.strategyGuideOverlay===null){return}
    this.strategyGuideOverlay.classList.remove("show");
    this.strategyGuideOverlay.setAttribute("aria-hidden","true");
    this.strategyGuideBtn.setAttribute("aria-expanded","false")
  }

  stageTurnLimit(){
    const stage=this.stages[this.currentStage];
    return stage!==undefined&&Number.isInteger(stage.turnLimit)?stage.turnLimit:15
  }

  updateStageInfo(){
    const stage=this.stages[this.currentStage];
    if(stage===undefined){return}
    const limit=this.stageTurnLimit();
    const phaseName=this.phase==="enemy"?"敵ターン":"味方ターン";
    this.e("stageInfoTitle").textContent=stage.title;
    this.e("stageInfoDescription").textContent=stage.description;
    this.e("stageInfoTurn").textContent=`${phaseName} ${this.turn} / ${limit}`;
    this.e("stageInfoPhase").textContent=this.phaseLabel();
    this.e("stageInfoEnemy").textContent=`敵 ${this.alive("enemy").length}`;
    this.e("objectiveText").innerHTML=this.currentObjective
  }

  renderStageList(){
    const list=this.e("stageList");list.innerHTML="";
    this.stages.forEach((s,i)=>{const b=document.createElement("button");b.className="stage-btn";b.innerHTML=`<b>${s.title}</b><span>${s.description}</span>`;
      b.onclick=async()=>{
        const requestId=this.beginStageLaunchRequest();
        await this.audio.prepareSeOnly();
        if(!this.isStageLaunchRequestActive(requestId)){return}
        this.audio.button();
        this.loadStage(i)
      };
      list.appendChild(b)
    })
  }

  /**
   * 新しいステージ開始要求を発行し、以前の音声準備待ち要求を無効化する。
   * @returns {number} 新しいステージ開始要求番号
   */
  beginStageLaunchRequest(){
    this.stageLaunchRequestId++;
    return this.stageLaunchRequestId
  }

  /**
   * 待機中のステージ開始要求が現在も有効か確認する。
   * @param {number} requestId 確認対象の要求番号
   * @returns {boolean} 最新の要求であればtrue
   */
  isStageLaunchRequestActive(requestId){
    return requestId===this.stageLaunchRequestId
  }

  /**
   * 待機中のステージ開始要求をすべて失効させる。
   */
  invalidateStageLaunchRequests(){
    this.stageLaunchRequestId++
  }

  /**
   * 新しい戦闘セッションを開始し、それ以前の非同期処理を無効化する。
   * @returns {number} 新しい戦闘セッション番号
   */
  beginBattleSession(){
    this.battleSessionId++;
    return this.battleSessionId
  }

  /**
   * 非同期処理が現在の戦闘セッションに属しているか確認する。
   * @param {number} sessionId 確認対象の戦闘セッション番号
   * @returns {boolean} 現在の戦闘であればtrue
   */
  isBattleSessionActive(sessionId){
    return sessionId===this.battleSessionId
  }

  /**
   * 現在の戦闘を即時終了し、ステージ選択へ持ち越してはいけない状態を破棄する。
   */
  cancelCurrentBattle(){
    this.clearRecoverySnapshot();
    this.beginBattleSession();
    this.removeVictoryEffect();
    this.removeDefeatEffect();
    this.audio.stopVictoryTheme(.20);
    this.audio.stopDefeatTheme(.20);
    this.audio.stopBattleTransientAudio();
    // 復元開始後の描画待ち中などに戦闘を破棄しても、古い復元状態を残さない。
    this.saveLoadRestoring=false;
    this.pendingRecoverySnapshot=null;
    this.pendingRecoverySelectionGuard=null;
    this.cancelLongPressTimer();
    this.longPressTriggered=false;
    this.longPressUnitId=null;
    this.hideAbilityOverlay();
    this.dialogueActive=false;
    this.missionActive=false;
    this.phase="player";
    this.mode="select";
    this.turn=1;
    this.selectedUnitId=null;
    this.pendingFacingUnitId=null;
    this.selectedCellX=null;
    this.selectedCellY=null;
    this.selectionRingSuppressionDepth=0;
    this.reachable.clear();
    this.previous=null;
    this.locked=true;
    this.finished=true;
    this.finishing=false;
    this.actionResolutionInProgress=false;
    this.playerTurnSetupInProgress=false;
    this.playerTurnSetupSessionId=null;
    this.playerTurnSetupFailed=false;
    this.facingCanUndoMovement=false;
    this.selectedStrategyLevel=0;
    this.pendingStageEvent=null;
    this.units=[];
    this.logs=[];
    this.currentObjective="";
    this.board.classList.remove("stage-one-map","stage-two-map","stage-three-map","stage-four-map","stage-five-map","stage-six-map","stage-seven-map","stage-eight-map","stage-nine-map");
    this.board.replaceChildren()
  }

  /**
   * ステージ開始時に、前ステージから持ち越してはいけない進行状態を初期化する。
   * @param {object} stage 読み込むステージ定義
   */
  resetStageState(stage){
    this.removeVictoryEffect();
    this.removeDefeatEffect();
    this.turn=1;
    this.phase="player";
    this.mode="select";
    this.selectedUnitId=null;
    this.pendingFacingUnitId=null;
    this.selectedCellX=null;
    this.selectedCellY=null;
    this.selectionRingSuppressionDepth=0;
    this.reachable.clear();
    this.previous=null;
    this.locked=true;
    this.finished=false;
    this.finishing=false;
    this.actionResolutionInProgress=false;
    this.playerTurnSetupInProgress=false;
    this.playerTurnSetupSessionId=null;
    this.playerTurnSetupFailed=false;
    this.logs=[];
    this.facingCanUndoMovement=false;
    this.selectedStrategyLevel=0;
    this.activeEscape=stage.battleType==="escape"&&stage.escape!==undefined?{...stage.escape}:null;
    this.currentObjective=stage.objective;
    this.stageEventTriggered=false;
    this.pendingStageEvent=null;
    this.turnReinforcementTriggered=false;
    this.raidReinforcementSpawned=false;
    this.turnReinforcementResult={spawnedUnitIds:[],failedUnitIds:[]};
    this.raidReinforcementResult={spawnedUnitIds:[],failedUnitIds:[]};
    this.missionActive=false;
    this.zhujiaBetrayalTriggered=false;
    this.zengtouBetrayalTriggered=false;
    this.gaotangSpellTrapDialogueTriggered=false;
    this.hiddenTraps=[]
  }

  /**
   * 第七章の広域幻術確認用テスト配置を適用する。
   * 敵は高廉のみとし、味方主力を高廉近辺へ密集させる。
   * 公孫勝だけは広域幻術封じを起こさないよう遠ざける。
   */
  applyStageSevenWideIllusionEffectTestFormation(){
    const enemyLeader=this.units.find(unit=>unit.id==="gao_lian"&&unit.team==="enemy");
    if(enemyLeader===undefined){return}

    const playerUnits=this.units.filter(unit=>unit.team==="player");
    this.units=[...playerUnits,enemyLeader];

    const yOffset=10;
    enemyLeader.y=Math.min(enemyLeader.y+yOffset,this.map.length-1);
    const occupied=new Set([`${enemyLeader.x},${enemyLeader.y}`]);
    const fixedPositions=new Map([
      ["gongsun_sheng_gaotang",[0,6+yOffset]],
      ["song_jiang_gaotang",[4,4+yOffset]],
      ["wu_yong_gaotang",[3,4+yOffset]],
      ["lin_chong_gaotang",[4,5+yOffset]],
      ["hua_rong_gaotang",[5,4+yOffset]]
    ]);
    const candidateSlots=[
      [1,1+yOffset],[2,1+yOffset],[3,1+yOffset],[5,1+yOffset],[6,1+yOffset],
      [0,2+yOffset],[1,2+yOffset],[2,2+yOffset],[3,2+yOffset],[4,2+yOffset],[5,2+yOffset],[6,2+yOffset],[7,2+yOffset],
      [0,3+yOffset],[1,3+yOffset],[2,3+yOffset],[3,3+yOffset],[4,3+yOffset],[5,3+yOffset],[6,3+yOffset],[7,3+yOffset],
      [1,4+yOffset],[2,4+yOffset],[6,4+yOffset],[7,4+yOffset],
      [1,5+yOffset],[2,5+yOffset],[3,5+yOffset],[5,5+yOffset],[6,5+yOffset],[7,5+yOffset]
    ];
    let slotIndex=0;

    const reservePosition=(unit,x,y)=>{
      unit.x=x;
      unit.y=y;
      occupied.add(`${x},${y}`)
    };

    for(const unit of playerUnits){
      const fixed=fixedPositions.get(unit.id);
      if(fixed!==undefined){
        reservePosition(unit,fixed[0],fixed[1])
      }
    }

    for(const unit of playerUnits){
      if(occupied.has(`${unit.x},${unit.y}`)){continue}
      while(slotIndex<candidateSlots.length){
        const slot=candidateSlots[slotIndex++];
        const key=`${slot[0]},${slot[1]}`;
        if(occupied.has(key)){continue}
        reservePosition(unit,slot[0],slot[1]);
        break
      }
    }
  }

  loadStage(index){
    // 正式なステージ開始が確定した時点で、他の待機中ステージ開始要求を失効させる。
    this.invalidateStageLaunchRequests();
    this.clearRecoverySnapshot();
    const sessionId=this.beginBattleSession();
    this.battleRandom.reseed();
    this.currentStage=index;
    const s=this.stages[index];
    this.applyStageBoardClass(s);
    this.audio.startBattleThemeForStage(s.chapterNumber-1).catch(()=>{});
    const sourceMapHeight=s.map.length;
    this.width=s.map[0].length;
    this.height=sourceMapHeight===8?16:sourceMapHeight;
    this.board.style.gridTemplateColumns=`repeat(${this.width},var(--cell))`;
    this.board.style.gridTemplateRows=`repeat(${this.height},var(--cell))`;
    const mapIsExpanded=sourceMapHeight===this.height;
    this.map=this.expandMapRows(s.map);
    this.units=s.units.map(o=>new Unit({...o,y:mapIsExpanded?o.y:o.y*2}));

    if(s.positions!==undefined){
      for(const unit of this.units){
        const position=s.positions[unit.id];
        if(position!==undefined){
          unit.x=position[0];
          unit.y=position[1]
        }
      }
    }

    if(s.id==="gaotang-prefecture"&&this.stageSevenWideIllusionEffectTestEnabled){
      this.applyStageSevenWideIllusionEffectTestFormation()
    }

    const stationaryIds=new Set(s.stationaryUnits||[]);
    const stationaryLabels=s.stationaryLabels||{};
    for(const unit of this.units){
      unit.stationary=stationaryIds.has(unit.id);
      unit.stationaryLabel=unit.stationary?(stationaryLabels[unit.id]||""):"";
      if(unit.stationary){
        unit.hasMoved=true;
        this.markUnitActionCompleted(unit)
      }
    }

    this.resetStageState(s);
    this.initializeHiddenTraps(s);
    if(s.battleType==="raid_escape"&&s.raidTurnLimit!==undefined){
      this.currentObjective=`勝利：${s.raidTurnLimit}ターン以内に護送車を含む初期護送部隊を殲滅し、その後、晁蓋が北の旗へ到達。または追捕軍出現後、敵軍を全滅（護送部隊殲滅まで残り${s.raidTurnLimit}ターン）<br>敗北：晁蓋が敗走・${s.raidTurnLimit}ターン以内に護送部隊を殲滅できない`
    }
    this.e("stageOverlay").classList.remove("show");this.e("resultOverlay").classList.remove("show");this.hideDialogue();this.hideMissionConditions();
    this.e("stageTitle").textContent=s.title+" — "+s.description;
    this.addLog(`◆ ${s.title} 開始`);
    this.addLog(`―― 味方ターン 1 / ${this.stageTurnLimit()} ――`);
    this.showBlankInfo();
    this.render();

    (async()=>{
      try{
        await this.showDialogueSequence(s.intro||[]);
        if(!this.isBattleSessionActive(sessionId)||this.finished){return}
        await this.showMissionConditions(s)
      }catch(error){
        if(this.isBattleSessionActive(sessionId)&&!this.finished){
          console.error(`[戦旗水滸伝] ステージ開始演出エラー: ${s.title}`,error);
          this.addLog("ステージ開始演出でエラーが発生したため、演出を終了して戦闘を開始します。")
        }
      }finally{
        // イントロ会話・勝敗条件表示のどちらで失敗しても、古い戦闘へ触れず現在の戦闘だけを操作可能状態へ戻す。
        if(!this.isBattleSessionActive(sessionId)||this.finished){return}
        this.hideDialogue();
        this.hideMissionConditions();
        this.dialogueActive=false;
        this.missionActive=false;
        this.audio.gong();
        this.locked=false;
        this.endTurnBtn.disabled=false;
        this.showBlankInfo();
        this.render();
        this.queueRecoverySnapshot();
        this.scrollBoardToPlayer()
      }
    })()
  }

  expandMapRows(map){
    if(map.length===this.height){
      return map.map(row=>[...row])
    }
    const expanded=[];
    for(const row of map){
      expanded.push([...row]);
      expanded.push([...row])
    }
    return expanded
  }

  openStageSelect(){
    // ステージ選択へ入り直した時点で、それ以前の音声準備待ち要求を失効させる。
    this.invalidateStageLaunchRequests();
    this.closeSaveSlotSelector();
    this.hideStageInfo();
    this.hideBattleStatus();
    this.hideStrategyGuide();
    this.cancelCurrentBattle();
    this.hideDialogue();
    this.hideMissionConditions();
    this.e("resultOverlay").classList.remove("show");
    this.e("stageOverlay").classList.add("show");
    this.audio.startStageSelectThemeLoop().catch(()=>{})
  }

  setSelectedCell(x,y){
    if(!this.inside(x,y)){return}
    this.selectedCellX=x;
    this.selectedCellY=y;
    this.updateSelectionRing()
  }

  setSelectedCellToUnit(unit){
    if(unit===null||unit===undefined){return}
    this.selectedCellX=unit.x;
    this.selectedCellY=unit.y;
    this.updateSelectionRing()
  }

  showPostMoveGridLockMessage(unit=this.selected(),x=null,y=null){
    if(unit===null||unit===undefined||!unit.hasMoved||unit.hasActed||unit.actionCommitted===true){return false}
    if(Number.isInteger(x)&&Number.isInteger(y)&&unit.x===x&&unit.y===y){return false}
    this.setSelectedCellToUnit(unit);
    const message=this.previous!==null
      ?'他のグリッドを選択するには、現在の部隊の行動を完了するか、「戻る」で移動前に戻ってください。'
      :"他のグリッドを選択するには、現在の部隊の行動を完了してください。";
    this.showInfo(unit,message);
    return true
  }

  suppressSelectionRing(){
    this.selectionRingSuppressionDepth++;
    this.updateSelectionRing()
  }

  restoreSelectionRing(){
    this.selectionRingSuppressionDepth=Math.max(0,this.selectionRingSuppressionDepth-1);
    this.updateSelectionRing()
  }

  updateSelectionRing(){
    for(const ring of this.board.querySelectorAll(".selection-ring")){ring.remove()}
    if(this.selectionRingSuppressionDepth>0||this.selectedCellX===null||this.selectedCellY===null){return}

    const index=this.selectedCellY*this.width+this.selectedCellX;
    const cell=this.board.children[index];
    if(cell===undefined){return}

    const unit=this.unitAt(this.selectedCellX,this.selectedCellY);
    let state="neutral";
    if(unit!==null&&unit.team==="player"){
      state=unit.hasActed?"done":"ready"
    }

    const ring=document.createElement("div");
    ring.className=`selection-ring selection-ring-${state}`;
    ring.setAttribute("aria-hidden","true");
    cell.appendChild(ring)
  }

  async cellClick(x,y){
    const clicked=this.unitAt(x,y);

    if(this.finished){return}

    // v9.5.19：敵ターン・会話中・ターン開始自動処理中など、操作可能になるまでは盤面情報も開かない。
    if(!this.isPlayerInteractionReady()){return}

    if(this.mode==="facing"){
      const facingUnit=this.pendingFacing();
      if(facingUnit!==null&&Math.abs(facingUnit.x-x)+Math.abs(facingUnit.y-y)===1){
        this.setSelectedCell(x,y);
        this.chooseFacing(x,y);
      }else if(facingUnit!==null&&facingUnit.actionCommitted===true){
        // C10：行動確定後の最終方向指定で非隣接マスを押しても、無反応にせず操作方法を案内する。
        this.showInfo(facingUnit,"最後に向ける方向の隣接マスを選んでください。")
      }else if(facingUnit!==null){
        this.showPostMoveGridLockMessage(facingUnit,x,y)
      }
      return
    }

    if(this.mode==="strategy-level"){
      this.showPostMoveGridLockMessage(this.selected(),x,y);
      return
    }

    if(this.mode==="strategy"){
      const current=this.selected();
      if(current!==null&&current.hasMoved){
        if(clicked!==null&&clicked.team==="enemy"&&this.isValidStrategyCenter(current,clicked,this.selectedStrategyLevel,"enemy")){
          await this.playerStrategy(clicked)
        }else{
          this.showPostMoveGridLockMessage(current,x,y)
        }
      }else if(clicked!==null&&clicked.team==="enemy"){
        this.setSelectedCell(x,y);
        await this.playerStrategy(clicked)
      }
      return
    }

    if(this.mode==="bow"){
      const current=this.selected();
      if(current!==null&&current.hasMoved){
        if(clicked!==null&&clicked.team==="enemy"&&this.isValidProjectileTarget(current,clicked)){
          await this.playerBow(clicked)
        }else{
          this.showPostMoveGridLockMessage(current,x,y)
        }
      }else if(clicked!==null&&clicked.team==="enemy"){
        if(current!==null&&this.isValidProjectileTarget(current,clicked)){
          this.setSelectedCell(x,y);
          await this.playerBow(clicked)
        }else if(current!==null){
          const actionName=this.projectileActionName(current);
          const maxRange=this.projectileMaxRange(current);
          this.showInfo(current,`${actionName}の有効な対象を選んでください。射程は2～${maxRange}マス、隣接・壁越しには攻撃できません。`)
        }
      }
      return
    }

    if(this.mode==="charge"){
      const current=this.selected();
      if(current!==null&&current.hasMoved){
        if(clicked!==null&&clicked.team==="enemy"&&this.distance(current,clicked)===1){
          await this.playerCharge(clicked)
        }else{
          this.showPostMoveGridLockMessage(current,x,y)
        }
      }else if(clicked!==null&&clicked.team==="enemy"){
        if(current!==null&&this.distance(current,clicked)===1){
          this.setSelectedCell(x,y);
          await this.playerCharge(clicked)
        }else if(current!==null){
          this.showInfo(current,"突撃の有効な対象を選んでください。対象は隣接する敵部隊です。")
        }
      }
      return
    }

    if(this.mode==="move"){
      if(this.reachable.has(this.key(x,y))){
        this.setSelectedCell(x,y);
        await this.moveSelected(x,y);
        return
      }

      if(clicked===null){
        this.setSelectedCell(x,y);
        this.clearSelection();
        return
      }

      if(clicked!==null&&clicked.team==="enemy"){
        const current=this.selected();
        if(current!==null&&this.distance(current,clicked)===1){
          this.setSelectedCell(x,y);
          await this.playerAttack(clicked);
          return
        }
        this.selectedUnitId=null;
        this.pendingFacingUnitId=null;
        this.facingCanUndoMovement=false;
        this.reachable.clear();
        this.previous=null;
        this.mode="select";
        this.setSelectedCell(x,y);
        this.showInfo(clicked,"敵部隊です。能力詳細はこの部隊を長押しすると表示されます。");
        this.render();
        return
      }

      if(clicked!==null&&clicked.team==="player"){
        const current=this.selected();
        if(current!==null&&current.id!==clicked.id){
          this.select(clicked);
        }
      }
      return
    }

    if(this.mode==="command"){
      const current=this.selected();
      if(current===null){return}

      const adjacent=Math.abs(current.x-x)+Math.abs(current.y-y)===1;
      if(adjacent&&clicked!==null&&clicked.team==="enemy"){
        await this.playerAttack(clicked);
        return
      }

      if(adjacent&&(clicked===null||clicked.team==="player")){
        this.setSelectedCell(x,y);
        current.facing=this.direction(current.x,current.y,x,y);
        this.completeUnitAction(current);
        this.audio.confirm();
        this.showBlankInfo();
        this.render();
        this.queueRecoverySnapshot();
        return
      }

      this.showPostMoveGridLockMessage(current,x,y);
      return
    }

    if(clicked!==null&&clicked.team==="enemy"){
      this.setSelectedCell(x,y);
      this.showInfo(clicked,"敵部隊の情報です。");
      return
    }

    if(clicked!==null&&clicked.team==="player"){
      this.select(clicked);
      return
    }

    if(clicked===null){
      this.setSelectedCell(x,y);
      this.clearSelection()
    }
  }

  clearSelection(){
    const current=this.selected();
    if(current!==null&&current.actionCommitted===true&&!current.hasActed){
      this.showInfo(current,"行動は確定済みです。最後の方向を指定して行動を完了してください。");
      return
    }
    if(current!==null&&current.hasMoved){
      this.showInfo(current,"移動後の行動を完了してください。");
      return
    }
    this.selectedUnitId=null;
    this.pendingFacingUnitId=null;
    this.reachable.clear();
    this.previous=null;
    this.mode="select";
    this.showBlankInfo();
    this.render()
  }

  /**
   * 攻撃・計略など不可逆な行動を実行した時点で確定する。
   * 最終方向が未確定でも、ここから移動前・行動選択へは戻さない。
   */
  commitUnitAction(unit){
    if(unit===null||unit===undefined){return false}
    unit.actionCommitted=true;
    this.previous=null;
    this.facingCanUndoMovement=false;
    return true
  }

  /**
   * 部隊を最終方向選択へ遷移させる。
   * actionCommitted 済みなら戻る経路を破棄し、未確定移動だけ取消可能状態を保持する。
   */
  enterFacingSelection(unit,canUndoMovement=false,playConfirm=false,message=null){
    if(unit===null||unit===undefined||unit.hasActed){return false}
    this.selectedUnitId=unit.id;
    this.setSelectedCellToUnit(unit);
    this.reachable.clear();
    this.pendingFacingUnitId=unit.id;
    if(unit.actionCommitted===true){this.previous=null}
    this.facingCanUndoMovement=unit.actionCommitted!==true&&canUndoMovement===true&&this.previous!==null&&unit.hasMoved&&!unit.hasActed;
    this.mode="facing";
    if(playConfirm){this.audio.confirm()}
    const infoMessage=message!==null
      ?message
      :unit.actionCommitted===true
        ?"行動は確定済みです。最後に向ける方向の隣接マスを選んでください。"
        :this.facingCanUndoMovement
          ?"最後に向ける方向の隣接マスを選んでください。「戻る」で移動前へ戻せます。"
          :"最後に向ける方向の隣接マスを選んでください。";
    this.showInfo(unit,infoMessage);
    this.render();
    this.queueRecoverySnapshot();
    return true
  }

  /**
   * 部隊を行動完了状態にする。プレイヤー操作UIには触れない。
   * 自動行動・罠・固定部隊なども同じ定義を使用する。
   */
  markUnitActionCompleted(unit){
    if(unit===null||unit===undefined){return false}
    unit.actionCommitted=true;
    unit.hasActed=true;
    return true
  }

  /**
   * 新しい行動機会を与える際の基本状態へ戻す。
   */
  resetUnitActionForTurn(unit){
    if(unit===null||unit===undefined){return false}
    unit.hasMoved=false;
    unit.actionCommitted=false;
    unit.hasActed=false;
    return true
  }

  /**
   * 最終方向まで確定した部隊の行動を完了し、プレイヤー操作状態を選択待ちへ戻す。
   */
  completeUnitAction(unit){
    if(!this.markUnitActionCompleted(unit)){return false}
    this.setSelectedCellToUnit(unit);
    this.selectedUnitId=null;
    this.pendingFacingUnitId=null;
    this.facingCanUndoMovement=false;
    this.previous=null;
    this.mode="select";
    return true
  }

  /**
   * 行動確定前の移動を移動前位置へ戻し、移動選択状態へ復帰させる。
   */
  cancelUncommittedMovement(unit,message){
    if(unit===null||unit===undefined||unit.actionCommitted===true||this.previous===null){return false}
    unit.x=this.previous.x;
    unit.y=this.previous.y;
    unit.facing=this.previous.facing||unit.facing;
    unit.hasMoved=false;
    this.setSelectedCellToUnit(unit);
    this.pendingFacingUnitId=null;
    this.facingCanUndoMovement=false;
    this.mode="move";
    this.reachable=this.calcReachable(unit);
    this.showInfo(unit,message);
    this.render();
    this.queueRecoverySnapshot();
    this.keepCellVisible(unit.x,unit.y);
    return true
  }

  /**
   * 行動確定済み・最終方向未確定の部隊を、方向指定だけに復帰させる。
   */
  resumeCommittedUnitFacing(unit){
    if(unit===null||unit===undefined||unit.hasActed||unit.actionCommitted!==true){return false}
    return this.enterFacingSelection(unit,false,false,"行動は確定済みです。最後に向ける方向の隣接マスを選んでください。")
  }

  /**
   * 味方の非同期行動が例外で途中終了した場合、現在の行動状態に応じた安全な操作状態へ復帰させる。
   * 行動確定済みなら最終方向選択へ、未確定の移動済みなら移動後の行動選択へ戻す。
   * 通常の成功経路には介入せず、runActionResolution が失敗した場合だけ使用する。
   */
  recoverPlayerInteractionAfterResolutionFailure(){
    if(this.finished||this.phase!=="player"||this.playerTurnSetupInProgress){return false}
    const selected=this.selected();
    const committed=selected!==null&&selected.team==="player"&&selected.actionCommitted===true&&!selected.hasActed&&!selected.stationary
      ?selected
      :this.alive("player").find(unit=>unit.actionCommitted===true&&!unit.hasActed&&!unit.stationary);
    if(committed!==undefined&&committed!==null){
      return this.resumeCommittedUnitFacing(committed)
    }

    const moved=selected!==null&&selected.team==="player"&&selected.hasMoved&&!selected.hasActed&&!selected.stationary
      ?selected
      :this.alive("player").find(unit=>unit.hasMoved&&!unit.hasActed&&!unit.stationary);
    if(moved===undefined||moved===null){return false}
    return this.resumeMovedUnitAction(moved)
  }

  /**
   * 移動済み・未行動部隊を、二重移動させず移動後の行動選択へ戻す。
   * 復元直後や再選択時にも同じ不変条件を適用する。
   */
  resumeMovedUnitAction(unit){
    if(unit===null||unit===undefined||unit.hasActed){return false}
    if(unit.actionCommitted===true){return this.resumeCommittedUnitFacing(unit)}
    this.selectedUnitId=unit.id;
    this.setSelectedCellToUnit(unit);
    this.reachable.clear();
    this.pendingFacingUnitId=null;

    const canAttack=this.hasAdjacentEnemy(unit);
    const canStrategy=this.canUseStrategy(unit)&&this.hasStrategyTarget(unit);
    const canBow=this.canUseBow(unit)&&this.hasBowTarget(unit);
    const canCharge=this.canUseCharge(unit)&&this.hasChargeTarget(unit);

    if(canAttack||canStrategy||canBow||canCharge){
      this.mode="command";
      this.facingCanUndoMovement=false;
      const skills=this.availableActionNames(unit);
      this.showInfo(unit,`赤丸の敵を直接攻撃できます。${skills.length>0?" 使用可能："+skills.join("・")+"。":""} 黄色い方向枠を選ぶと、その方向を向いて行動を終了します。敵の方向へ攻撃せず向きたい場合は「待機」を選んでください。`);
      this.render();
      this.queueRecoverySnapshot();
      return true
    }

    return this.enterFacingSelection(unit,this.previous!==null,false)
  }

  select(unit){
    const current=this.selected();
    if(!this.canSelectAnotherUnit(current,unit)){
      if(current!==null&&current.actionCommitted===true&&!current.hasActed){
        this.showInfo(current,"現在の部隊の行動は確定済みです。最後に向ける方向を指定してください。");
      }else if(this.previous!==null){
        this.showInfo(current,"現在の部隊の行動を完了するか、「戻る」で移動前へ戻してください。");
      }else{
        this.showInfo(current,"現在の部隊の行動を完了してください。");
      }
      return
    }

    let unavailableMessage=null;
    if(unit.stationary){
      unavailableMessage=`この部隊は${unit.stationaryLabel||"待機"}中です。常に行動済みで、操作できません。`
    }else if(unit.illusionTurns>0){
      unavailableMessage="この部隊は幻術状態のため操作できません。次の自軍ターン開始時に幻術行動が自動処理されます。"
    }else if(unit.confusedTurns>0){
      unavailableMessage="この部隊は撹乱状態のため操作できません。次の自軍ターン開始時に行動不能が自動処理されます。"
    }else if(unit.hasActed){
      unavailableMessage="この部隊は行動済みです。"
    }

    if(unavailableMessage!==null){
      // B23：未移動部隊の操作中なら、その操作状態を完全に解除してから情報閲覧対象へ切り替える。
      // 移動仮確定後など切替禁止状態は canSelectAnotherUnit() で先に拒否される。
      this.selectedUnitId=null;
      this.pendingFacingUnitId=null;
      this.facingCanUndoMovement=false;
      this.reachable.clear();
      this.previous=null;
      this.mode="select";
      this.commandInstructionMessage="";
      this.setSelectedCellToUnit(unit);
      this.showInfo(unit,unavailableMessage);
      this.render();
      return
    }

    this.setSelectedCellToUnit(unit);
    if(unit.actionCommitted===true){this.audio.select();this.resumeCommittedUnitFacing(unit);return}
    if(unit.hasMoved){
      this.audio.select();
      this.resumeMovedUnitAction(unit);
      return
    }
    this.selectedUnitId=unit.id;this.mode="move";this.facingCanUndoMovement=false;this.previous={x:unit.x,y:unit.y,facing:unit.facing};this.reachable=this.calcReachable(unit);this.audio.select();
    const available=this.availableActionNames(unit);
    this.showInfo(unit,this.hasAdjacentEnemy(unit)?`赤丸の敵を直接攻撃できます。${available.length>0?" 使用可能："+available.join("・")+"。":""} 移動、または「待機」でその場の方向転換も選べます。`:`移動先を選べます。${available.length>0?" 使用可能："+available.join("・")+"。":""} 移動せず向きだけ変える場合は「待機」を選べます。`);this.render()
  }


  async animateUnitPath(unit,path,stepDuration=BATTLE_EFFECT_TIMING.MOVE_STEP_MS,sessionId=null){
    let movedSteps=0;

    for(const step of path){
      if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){break}
      if(!unit.isAlive){break}

      const occupant=this.unitAt(step.x,step.y);
      if(occupant!==null&&occupant.id!==unit.id){break}

      unit.facing=this.direction(unit.x,unit.y,step.x,step.y);
      unit.x=step.x;
      unit.y=step.y;
      this.selectedCellX=unit.x;
      this.selectedCellY=unit.y;
      movedSteps++;

      this.render();
      this.keepCellVisible(unit.x,unit.y);
      this.audio.move();
      await this.wait(stepDuration);
      if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){break}
    }

    return movedSteps
  }

  async moveSelected(x,y){
    const u=this.selected();
    if(u===null){return}
    if(u.illusionTurns>0||u.confusedTurns>0){
      this.showInfo(u,"状態異常中の部隊は手動操作できません。");
      this.selectedUnitId=null;
      this.pendingFacingUnitId=null;
      this.reachable.clear();
      this.previous=null;
      this.mode="select";
      this.render();
      return
    }

    const path=this.findReachablePath(u,x,y);
    if(path.length===0){return}

    const triggeredTrap=this.firstActiveTrapOnPath(u,path);
    let movementPath=path;

    if(triggeredTrap!==null){
      const trapIndex=path.findIndex(
        step=>step.x===triggeredTrap.x&&step.y===triggeredTrap.y
      );
      movementPath=trapIndex>=0?path.slice(0,trapIndex+1):path
    }

    const sessionId=this.battleSessionId;
    u.hasMoved=true;
    this.reachable.clear();
    await this.runActionResolution(async()=>{
      this.render();
      await this.animateUnitPath(u,movementPath,80,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      if(triggeredTrap!==null){
        await this.resolveHiddenTrap(u,triggeredTrap,sessionId)
      }
    },{sessionId});
    if(!this.isBattleSessionActive(sessionId)){return}
    if(triggeredTrap!==null){
      if(!this.finished){this.queueRecoverySnapshot()}
      return
    }

    this.checkResult();
    if(this.finished){
      this.render();
      return
    }

    const canAttack=this.hasAdjacentEnemy(u);
    const canStrategy=this.canUseStrategy(u)&&this.hasStrategyTarget(u);
    const canBow=this.canUseBow(u)&&this.hasBowTarget(u);
    const canCharge=this.canUseCharge(u)&&this.hasChargeTarget(u);

    if(canAttack||canStrategy||canBow||canCharge){
      this.mode="command";
      const skills=this.availableActionNames(u);
      this.showInfo(u,`赤丸の敵を直接攻撃できます。${skills.length>0?" 使用可能："+skills.join("・")+"。":""} 黄色い方向枠を選ぶと、その方向を向いて行動を終了します。敵の方向へ攻撃せず向きたい場合は「待機」を選んでください。`);
      this.render();
      this.queueRecoverySnapshot();
      this.keepCellVisible(u.x,u.y);
      return
    }

    this.beginFacing(true)
  }


  hasBowSkill(u){return u.combatSkill.includes("弓弩")}

  hasThrowSkill(u){return u.combatSkill.includes("投擲術")}

  hasProjectileSkill(u){return this.hasBowSkill(u)||this.hasThrowSkill(u)}

  projectileActionName(u){return this.hasThrowSkill(u)&&!this.hasBowSkill(u)?"投擲":"弓撃"}

  projectileMaxRange(u){return this.hasThrowSkill(u)&&!this.hasBowSkill(u)?2:3}

  hasShieldSkill(u){return u.combatSkill.includes("盾牌戦闘")}

  hasChargeSkill(u){return u.combatSkill.includes("騎乗戦闘")||u.combatSkill.includes("騎馬戦闘")}

  hasChainCavalry(u){return String(u.specialAbility).includes("連環馬")}

  hasWaterTerrainAffinity(u){return [u.combatSkill,u.specialAbility].some(value=>{const text=String(value);return text.includes("水泳")||text.includes("水中戦")||text.includes("水軍適正")})}

  hasWildTerrainAffinity(u){return String(u.specialAbility).includes("山野適正")}

  chargeConfusionRate(target){return Math.max(0,Math.min(.25,(100-target.command)*.0025))}

  canUseBow(u){return this.hasProjectileSkill(u)&&u.bowUses>0}

  canUseCharge(u){return this.hasChargeSkill(u)&&u.chargeUses>0}

  isValidProjectileTarget(u,target){
    const d=this.distance(u,target);
    return d>=2&&d<=this.projectileMaxRange(u)&&this.hasClearLineOfSight(u,target)
  }

  hasBowTarget(u){
    const team=u.team==="player"?"enemy":"player";
    return this.alive(team).some(target=>this.isValidProjectileTarget(u,target))
  }

  hasChargeTarget(u){return this.alive("enemy").some(target=>this.distance(u,target)===1)}

  availableActionNames(u){
    const names=[];
    if(this.canUseBow(u)&&this.hasBowTarget(u)){names.push(`${this.projectileActionName(u)}${u.bowUses}/${u.maxBowUses}`)}
    if(this.canUseCharge(u)&&this.hasChargeTarget(u)){names.push(`突撃${u.chargeUses}/${u.maxChargeUses}`)}
    if(this.canUseStrategy(u)&&this.hasStrategyTarget(u)){
      const specialTactic=this.specialTacticName(u);
      if(specialTactic!==null){
        names.push(`${specialTactic} ${u.strategyUses}/${u.maxStrategyUses}`)
      }else if(this.isIllusionUser(u)){
        names.push(`幻術 ${u.strategyUses}/${u.maxStrategyUses}`)
      }else{
        const levels=this.availableStrategyLevels(u,"enemy");
        names.push(`撹乱Lv${levels.join("・")} ${u.strategyUses}/${u.maxStrategyUses}`)
      }
    }
    return names
  }

  beginBow(){
    const u=this.selected();
    if(u===null||(this.mode!=="move"&&this.mode!=="command")){return}
    const actionName=this.projectileActionName(u);
    const maxRange=this.projectileMaxRange(u);
    if(!this.canUseBow(u)){this.showInfo(u,`${actionName}の使用回数がありません。`);return}
    if(!this.hasBowTarget(u)){this.showInfo(u,`${actionName}可能な敵がいません。射程は2～${maxRange}マス、隣接・壁越しには攻撃できません。`);return}
    this.skillReturnMode=this.mode;
    this.mode="bow";
    this.audio.select();
    this.showInfo(u,`${actionName}の対象を選んでください。正面80％・側面100％・背面100％、射程2～${maxRange}・隣接不可・壁越し不可、残り${u.bowUses}/${u.maxBowUses}回。`);
    this.render()
  }

  beginCharge(){
    const u=this.selected();
    if(u===null||(this.mode!=="move"&&this.mode!=="command")){return}
    if(!this.canUseCharge(u)){this.showInfo(u,"突撃の使用回数がありません。");return}
    if(!this.hasChargeTarget(u)){this.showInfo(u,"突撃できる隣接敵がいません。");return}
    this.skillReturnMode=this.mode;
    this.mode="charge";
    this.audio.select();
    this.showInfo(u,`突撃の対象を選んでください。大ダメージ、対象の統率により最大25%で攪乱。残り${u.chargeUses}/${u.maxChargeUses}回。`);
    this.render()
  }

  launchBowProjectile(attacker,target,laneOffset=0){
    if(attacker===null||target===null){return}

    const attackerIndex=attacker.y*this.width+attacker.x;
    const targetIndex=target.y*this.width+target.x;
    const attackerCell=this.board.children[attackerIndex];
    const targetCell=this.board.children[targetIndex];

    if(attackerCell===undefined||targetCell===undefined){return}

    const boardRect=this.board.getBoundingClientRect();
    const attackerRect=attackerCell.getBoundingClientRect();
    const targetRect=targetCell.getBoundingClientRect();

    let startX=attackerRect.left-boardRect.left+attackerRect.width/2;
    let startY=attackerRect.top-boardRect.top+attackerRect.height/2;
    const targetX=targetRect.left-boardRect.left+targetRect.width/2;
    const targetY=targetRect.top-boardRect.top+targetRect.height/2;

    const dx=targetX-startX;
    const dy=targetY-startY;
    const distance=Math.hypot(dx,dy);
    if(distance<1){return}

    const perpendicularX=-dy/distance;
    const perpendicularY=dx/distance;
    startX+=perpendicularX*laneOffset;
    startY+=perpendicularY*laneOffset;

    const angle=Math.atan2(dy,dx);
    const lineLength=Math.max(22,Math.min(38,distance*.34));
    const travelDistance=Math.max(0,distance-lineLength*.35);

    const line=document.createElement("div");
    line.className="bow-shot-line";
    line.style.left=`${startX}px`;
    line.style.top=`${startY}px`;
    line.style.width=`${lineLength}px`;
    this.board.appendChild(line);

    const baseTransform=`translateY(-50%) rotate(${angle}rad)`;
    const animation=line.animate(
      [
        {transform:`${baseTransform} translateX(0px)`,opacity:0},
        {transform:`${baseTransform} translateX(${travelDistance*.08}px)`,opacity:1,offset:.12},
        {transform:`${baseTransform} translateX(${travelDistance}px)`,opacity:.92}
      ],
      {duration:BATTLE_EFFECT_TIMING.BOW_PROJECTILE_MS,easing:"linear",fill:"forwards"}
    );

    animation.finished
      .catch(()=>{})
      .finally(()=>line.remove())
  }

  async playBowProjectileSequence(attacker,target,isEnemy=false,sessionId=null){
    const timings=isEnemy
      ?[0,.06,.22,.277]
      :[0,.153,.25,.32];
    const laneOffsets=[-4,2,-1,4];

    for(let index=0;index<timings.length;index++){
      window.setTimeout(
        ()=>{if(sessionId===null||this.isBattleSessionActive(sessionId)){this.launchBowProjectile(attacker,target,laneOffsets[index])}},
        Math.round(timings[index]*1000)
      )
    }

    await this.wait(Math.round(timings[timings.length-1]*1000)+BATTLE_EFFECT_TIMING.BOW_SEQUENCE_END_PADDING_MS)
  }

  async playerBow(target){
    const user=this.selected();
    if(user===null||!this.canUseBow(user)||!this.isValidProjectileTarget(user,target)){return}
    const actionName=this.projectileActionName(user);
    const sessionId=this.battleSessionId;
    this.commitUnitAction(user);
    user.facing=this.direction(user.x,user.y,target.x,target.y);
    user.bowUses--;
    await this.runActionResolution(async()=>{
      this.render();
      // 投擲術は仮実装として弓撃と同じカットイン・飛翔線・SEを使用する。
      await this.showActionCutIn(user,"bow",sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      await this.wait(80);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.audio.bow(false);
      await this.playBowProjectileSequence(user,target,false,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      const damage=this.calculateBowDamage(user,target);
      this.applyDamage(target,damage);
      this.addLog(`${user.name}の${actionName}！ ${target.name}に${damage}ダメージ（${this.bowDirectionLabel(user,target)}）。残り${user.bowUses}/${user.maxBowUses}回。`);
      await this.showDamageFeedback(target,damage,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.render();
      this.checkResult();
      await this.processPendingStageEvent(sessionId)
    },{sessionId});
    if(!this.isBattleSessionActive(sessionId)){return}
    if(!this.finished){this.completeActionAfterAttack(user)}else{this.render()}
  }

  async playerCharge(target){
    const user=this.selected();
    if(user===null||!this.canUseCharge(user)||this.distance(user,target)!==1){return}
    const sessionId=this.battleSessionId;
    this.commitUnitAction(user);
    user.facing=this.direction(user.x,user.y,target.x,target.y);
    user.chargeUses--;
    await this.runActionResolution(async()=>{
      this.render();
      await this.showActionCutIn(user,"charge",sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      await this.wait(80);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.audio.charge(!user.isMob);
      const chargeDustPromise=this.showChargeDustEffect(target,BATTLE_EFFECT_TIMING.CHARGE_DUST_MS,sessionId);
      await this.wait(user.isMob?160:200);
      if(!this.isBattleSessionActive(sessionId)){return}
      const damage=this.calculateChargeDamage(user,target);
      this.applyDamage(target,damage);
      let confused=false;
      let confusionCleared=false;
      const confusionRate=this.chargeConfusionRate(target);
      const previousConfusedTurns=target.confusedTurns;
      if(target.isAlive&&this.randomFloat()<confusionRate){
        target.confusedTurns=Math.max(target.confusedTurns,1);
        confusionCleared=this.clearConfusionCoveredByIllusion(target);
        if(!confusionCleared){
          target.facing=["north","east","south","west"][Math.floor(this.randomFloat()*4)];
          confused=target.confusedTurns>previousConfusedTurns
        }
      }
      this.addLog(`${user.name}の突撃！ ${target.name}に${damage}ダメージ。${confused?"さらに攪乱状態にした！ ":confusionCleared?"撹乱効果は残る幻術に内包された。 ":""}残り${user.chargeUses}/${user.maxChargeUses}回。`);
      await this.showDamageFeedback(target,damage,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      await chargeDustPromise;
      if(!this.isBattleSessionActive(sessionId)){return}
      this.render();
      if(confused){
        this.audio.confusionSuccess();
        try{
          await Promise.all([
            this.flashUnit(target,"confusion",sessionId),
            this.showConfusionSymbolEffect([target],[],sessionId)
          ])
        }finally{
          if(sessionId===null||this.isBattleSessionActive(sessionId)){this.audio.stopConfusionSuccess()}
        }
        if(!this.isBattleSessionActive(sessionId)){return}
      }
      this.checkResult();
      await this.processPendingStageEvent(sessionId)
    },{sessionId});
    if(!this.isBattleSessionActive(sessionId)){return}
    if(!this.finished){this.completeActionAfterAttack(user)}else{this.render()}
  }


  beginStrategy(){
    const u=this.selected();

    if(u===null||(this.mode!=="move"&&this.mode!=="command")){return}

    this.strategyReturnMode=this.mode;
    this.selectedStrategyLevel=0;

    const specialTactic=this.specialTacticName(u);
    if(!this.canUseStrategy(u)){
      this.showInfo(u,specialTactic!==null?`${specialTactic}の使用回数がありません。`:"この部隊は撹乱・幻術を使用できません。");
      return
    }

    if(!this.hasStrategyTarget(u)){
      this.showInfo(u,specialTactic!==null
        ?`射程3マス以内に${specialTactic}の中心として指定できる敵部隊がいません。城壁越しには使用できません。`
        :this.isIllusionUser(u)
          ?"射程内に幻術をかけられる敵部隊がいません。幻術士は幻術の対象外で、幻術が残り2ターンの部隊も対象にできません。"
          :"射程内に撹乱を延長できる敵部隊がいません。撹乱2ターンまたは幻術2ターンの部隊だけなら使用できません。");
      return
    }

    this.audio.select();

    if(specialTactic!==null){
      this.selectedStrategyLevel=1;
      this.mode="strategy";
      this.showInfo(u,`${specialTactic}の中心にする敵を選んでください。射程3、中心＋上下左右へ範囲ダメージ、周辺65％、味方巻き添えあり。撹乱判定は中心だけ・成功時1ターン。残り${u.strategyUses}/${u.maxStrategyUses}回。`);
      this.render();
      return
    }

    if(this.isIllusionUser(u)){
      this.selectedStrategyLevel=1;
      this.mode="strategy";
      this.showInfo(u,"幻術をかける敵を選んでください。射程は3マス、壁越し不可、消費は1回です。幻術士と、幻術が残り2ターンの敵は対象にできません。成功すると次の行動で、届く味方がいれば同士討ちします。");
      this.render();
      return
    }

    this.mode="strategy-level";
    this.showInfo(u,"撹乱のレベルを選んでください。上位レベルほど広範囲ですが、レベル分の使用回数を消費します。");
    this.render()
  }

  selectStrategyLevel(level){
    const u=this.selected();
    if(u===null||this.isIllusionUser(u)||this.isSpecialTacticUser(u)||this.mode!=="strategy-level"||!this.canUseStrategyLevel(u,level)){return}
    if(!this.hasStrategyTargetForLevel(u,level,"enemy")){
      this.showInfo(u,level===1
        ?"撹乱Lv1で延長できる敵がいません。撹乱2ターンまたは幻術2ターンの敵は対象にできません。"
        :`撹乱Lv${level}の範囲で延長できる敵がいません。`);
      this.render();
      return
    }
    this.selectedStrategyLevel=level;
    this.mode="strategy";
    this.audio.select();
    const area=level===1?"選択した敵1部隊":level===2?"選択した敵と隣接1マス以内の敵":"選択した敵から2マス以内の敵";
    this.showInfo(u,`撹乱Lv${level}の中心にする敵を選んでください。対象：${area}。射程は3マス、壁越し不可、消費は${level}回です。${level===1?"撹乱2ターンまたは幻術2ターンの敵は選択不可です。":"中心部隊が上限状態でも、範囲内に延長可能な敵がいれば選択できます。"}`);
    this.render()
  }

  async playerStrategy(target){
    const user=this.selected();
    if(user===null||this.mode!=="strategy"){return}
    const sessionId=this.battleSessionId;

    if(this.isSpecialTacticUser(user)){
      await this.playerSpecialTactic(user,target,sessionId);
      return
    }

    const level=this.selectedStrategyLevel;
    if(!this.canUseStrategyLevel(user,level)||this.distance(user,target)>3){return}

    const isIllusion=this.isIllusionUser(user);
    if(!this.isValidStrategyCenter(user,target,level,"enemy")){
      this.showInfo(target,this.strategyTargetInvalidMessage(user,target,level,"enemy"));
      this.render();
      return
    }

    const cost=isIllusion?1:level;
    this.commitUnitAction(user);
    user.facing=this.direction(user.x,user.y,target.x,target.y);
    user.strategyUses-=cost;
    const targets=this.strategyEligibleTargets(user,target,level,"enemy");
    this.mode="strategy-resolving";
    await this.runActionResolution(async()=>{
      this.render();
      await this.showActionCutIn(user,isIllusion?"illusion":"strategy",sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      await this.wait(80);
      if(!this.isBattleSessionActive(sessionId)){return}
      if(isIllusion){this.audio.illusionCast()}else{this.audio.strategyCast()}
      await this.flashStrategyCells(user,target,isIllusion?1:level,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}

      let successCount=0;
      const successfulTargets=[];
      const twoTurnIllusionTargets=[];
      const confusionEffectTargets=[];
      const twoTurnConfusionTargets=[];

      for(const affected of targets){
        const effectiveIntelligence=isIllusion?100:user.intelligence;
        const chance=this.strategySuccessChance(effectiveIntelligence,affected.intelligence);
        const success=this.randomFloat()*100<chance;

        if(success){
          successCount++;
          successfulTargets.push(affected);
          const turns=this.strategyEffectTurns(chance);

          if(isIllusion){
            affected.illusionTurns=Math.max(affected.illusionTurns,turns);
            if(turns>=2){twoTurnIllusionTargets.push(affected)}
            this.clearConfusionCoveredByIllusion(affected)
          }else{
            const previousConfusedTurns=affected.confusedTurns;
            affected.confusedTurns=Math.max(affected.confusedTurns,turns);
            const confusionCleared=this.clearConfusionCoveredByIllusion(affected);
            if(!confusionCleared){
              affected.facing=this.randomFacing();
              if(affected.confusedTurns>previousConfusedTurns){
                confusionEffectTargets.push(affected);
                if(turns>=2){twoTurnConfusionTargets.push(affected)}
              }
            }
          }
        }
      }

      const strategyName=isIllusion?"幻術":`撹乱Lv${level}`;
      this.addLog(`${user.name}の${strategyName}！ ${targets.length}部隊中${successCount}部隊に成功。残り${user.strategyUses}/${user.maxStrategyUses}回。`);
      if(successfulTargets.length>0){
        const statusName=isIllusion?"幻術":"撹乱";
        const statusText=successfulTargets.map(unit=>`${unit.name}［${statusName}${isIllusion?unit.illusionTurns:unit.confusedTurns}T］`).join("、");
        this.addLog(`　影響：${statusText}`)
      }

      if(successCount===0){this.audio.defeat()}

      this.render();
      if(successCount>0){
        if(isIllusion){
          this.audio.illusionSuccess();
          await Promise.all([
            this.flashIllusionSuccessByTurns(successfulTargets,twoTurnIllusionTargets,sessionId),
            this.showNormalIllusionSkullEffect(successfulTargets,sessionId)
          ])
        }else if(confusionEffectTargets.length>0){
          this.audio.confusionSuccess();
          await this.flashConfusionSuccessByTurns(confusionEffectTargets,twoTurnConfusionTargets,sessionId)
        }
        if(!this.isBattleSessionActive(sessionId)){return}
        const representative=successfulTargets.includes(target)?target:successfulTargets[0];
        await this.showStrategySuccessDialogue(user,representative,isIllusion,successCount);
        if(!this.isBattleSessionActive(sessionId)){return}
      }
      await this.wait(180);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.checkResult()
    },{sessionId});

    if(!this.isBattleSessionActive(sessionId)){return}
    if(!this.finished){this.beginFacing()}else{this.render()}
  }

  async playerSpecialTactic(user,target,sessionId=this.battleSessionId){
    const team="enemy";
    if(!this.isBattleSessionActive(sessionId)){return}
    if(!this.isValidSpecialTacticCenter(user,target,team)){
      this.showInfo(target,this.strategyTargetInvalidMessage(user,target,1,team));
      this.render();
      return
    }

    this.commitUnitAction(user);
    this.mode="strategy-resolving";
    await this.runActionResolution(async()=>{
      await this.resolveSpecialTactic(user,target,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.checkResult();
      await this.processPendingStageEvent(sessionId)
    },{sessionId});
    if(!this.isBattleSessionActive(sessionId)){return}
    if(!this.finished){this.beginFacing()}else{this.render()}
  }

  async resolveSpecialTactic(user,target,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    const tactic=this.specialTacticName(user);
    const targetTeam=user.team==="player"?"enemy":"player";
    if(tactic===null||!this.isValidSpecialTacticCenter(user,target,targetTeam)){return}

    user.facing=this.direction(user.x,user.y,target.x,target.y);
    user.strategyUses--;
    this.render();
    await this.showActionCutIn(user,tactic==="火計"?"fire":"water",sessionId);
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    await this.wait(80);
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(tactic==="火計"){
      await this.showFireTacticBurstEffect(target,sessionId)
    }else{
      await this.showWaterTacticBurstEffect(target,sessionId)
    }
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    await this.flashStrategyCells(user,target,2,sessionId);
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}

    const affected=this.specialTacticAffectedUnits(user,target);
    const results=[];
    let totalDamage=0;
    for(const unit of affected){
      const result=this.specialTacticDamage(user,unit,unit.id===target.id);
      this.applyDamage(unit,result.damage);
      totalDamage+=result.damage;
      results.push({unit,...result,isCenter:unit.id===target.id})
    }

    let confused=false;
    let confusionCleared=false;
    const confusionChance=this.specialTacticConfusionChance(user,target);
    // v9.7.27：火計・水計の撹乱演出確認用。falseへ戻せば従来確率判定へ即復帰する。
    const confusionSucceeded=this.elementalTacticConfusionAlwaysSuccessTestEnabled===true
      ?true
      :this.randomFloat()*100<confusionChance;
    const previousConfusedTurns=target.confusedTurns;
    if(target.isAlive&&confusionSucceeded){
      target.confusedTurns=Math.max(target.confusedTurns,1);
      confusionCleared=this.clearConfusionCoveredByIllusion(target);
      if(!confusionCleared){
        target.facing=this.randomFacing();
        confused=target.confusedTurns>previousConfusedTurns
      }
    }

    this.addLog(`${user.name}の${tactic}！ ${target.name}を中心に${affected.length}部隊へ合計${totalDamage}ダメージ。残り${user.strategyUses}/${user.maxStrategyUses}回。`);
    if(confused){
      this.addLog(`　${target.name}を撹乱［1T］。`)
    }else if(confusionCleared){
      this.addLog(`　${target.name}への撹乱は残る幻術に内包された。`)
    }

    const tacticEffectType=tactic==="火計"?"fire":"water";
    if(tactic==="火計"){
      this.audio.fireTacticDamage()
    }else{
      this.audio.waterTacticDamage()
    }
    await Promise.all([
      this.flashUnits(results.map(result=>result.unit),tacticEffectType,sessionId),
      ...results.map(result=>this.showDamagePopup(result.unit,result.damage,sessionId))
    ]);
    // 被害演出が終わった時点で被害SEも止め、続く撹乱成功SEと重ならないようにする。
    // 旧戦闘になっていれば cancelCurrentBattle() 側で停止済みなので、新戦闘のSEへ触れず終了する。
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(tactic==="火計"){
      this.audio.stopFireTacticDamage()
    }else{
      this.audio.stopWaterTacticDamage()
    }
    this.render();
    if(confused){
      this.audio.confusionSuccess();
      try{
        await Promise.all([
          this.flashUnit(target,"confusion",sessionId),
          this.showConfusionSymbolEffect([target],[],sessionId)
        ])
      }finally{
        if(sessionId===null||this.isBattleSessionActive(sessionId)){this.audio.stopConfusionSuccess()}
      }
    }
    await this.wait(120);
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
  }

  strategySuccessChance(userIntelligence,targetIntelligence){
    const rawDiff=Math.round(userIntelligence-targetIntelligence);
    const diff=Math.max(-100,Math.min(100,rawDiff));
    const adjustment=STRATEGY_INTELLIGENCE_DIFF_ADJUSTMENT_LUT[Math.abs(diff)];
    const signedAdjustment=diff<0?-adjustment:adjustment;
    return Math.max(3,Math.min(98,20+signedAdjustment))
  }

  strategyEffectTurns(chance){
    return this.randomFloat()*100<chance/2?2:1
  }

  specialTacticName(u){
    if(u===null||u===undefined){return null}
    const ability=String(u.specialAbility||"");
    if(ability.includes("火計")){return "火計"}
    if(ability.includes("水計")){return "水計"}
    return null
  }

  isSpecialTacticUser(u){return this.specialTacticName(u)!==null}

  canUseStrategy(u){
    if(u===null||u===undefined){return false}
    if(this.isSpecialTacticUser(u)){return u.strategyUses>=1}
    return u.maxStrategyLevel>=1&&u.strategyUses>=1
  }

  canUseStrategyLevel(u,level){
    if(!Number.isInteger(level)||level<1||this.isSpecialTacticUser(u)){return false}
    if(this.isIllusionUser(u)){return level===1&&u.strategyUses>=1}
    return level<=u.maxStrategyLevel&&u.strategyUses>=level
  }

  specialTacticDamageResistance(target){
    return (target.command*2+target.intelligence)/3
  }

  specialTacticConfusionResistance(target){
    return (target.command+target.intelligence*2)/3
  }

  specialTacticCenterDamage(user,target){
    const tactic=this.specialTacticName(user);
    const resistance=this.specialTacticDamageResistance(target);
    if(tactic==="火計"){return Math.max(1,Math.round(133-resistance*.55))}
    if(tactic==="水計"){return Math.max(1,Math.round(117-resistance*.45))}
    return 0
  }

  specialTacticConfusionChance(user,target){
    const tactic=this.specialTacticName(user);
    const resistance=this.specialTacticConfusionResistance(target);
    if(tactic==="火計"){return Math.max(1,Math.min(18,Math.round((100-resistance)*.20)))}
    if(tactic==="水計"){return Math.max(2,Math.min(24,Math.round((100-resistance)*.28)))}
    return 0
  }

  isAdjacentToWater(x,y){
    return this.neighbors(x,y).some(position=>this.inside(position.x,position.y)&&this.map[position.y][position.x]==="water")
  }

  specialTacticTerrainModifier(user,target){
    const tactic=this.specialTacticName(user);
    const terrainType=this.map[target.y][target.x];
    let rate=1;
    const labels=[];

    if(terrainType==="road"){rate-=.10;labels.push("道-10％")}
    if(tactic==="火計"&&terrainType==="forest"){rate+=.20;labels.push("森+20％")}
    if(tactic==="水計"&&(terrainType==="swamp"||terrainType==="water"||this.isAdjacentToWater(target.x,target.y))){
      rate+=.20;labels.push("水利+20％")
    }

    return {rate:Math.max(.1,rate),label:labels.length>0?labels.join("・"):"地形補正なし"}
  }

  specialTacticDamage(user,target,isCenter){
    const centerDamage=this.specialTacticCenterDamage(user,target);
    const rangedDamage=isCenter?centerDamage:Math.round(centerDamage*.65);
    const terrain=this.specialTacticTerrainModifier(user,target);
    // 第6章の祝家荘モブ隊長など、ユニット個別の威力補正がある場合だけ最終ダメージへ乗算する。
    const unitDamageRate=Number.isFinite(user.specialTacticDamageRate)?Math.max(.1,user.specialTacticDamageRate):1;
    return {
      damage:Math.max(1,Math.round(rangedDamage*terrain.rate*unitDamageRate)),
      baseDamage:rangedDamage,
      terrainRate:terrain.rate,
      terrainLabel:terrain.label,
      unitDamageRate
    }
  }

  specialTacticAffectedUnits(user,center){
    return this.units.filter(target=>
      target.isAlive&&
      this.distance(center,target)<=1&&
      this.hasClearLineOfSight(user,target)
    )
  }

  isValidSpecialTacticCenter(user,center,team){
    return user!==null&&user!==undefined&&center!==null&&center!==undefined&&
      this.isSpecialTacticUser(user)&&user.strategyUses>=1&&center.isAlive&&center.team===team&&
      this.distance(user,center)<=3&&this.hasClearLineOfSight(user,center)
  }

  canImproveConfusion(target){
    return target!==null&&target!==undefined&&target.isAlive&&target.confusedTurns<2&&target.illusionTurns<2
  }

  canImproveIllusion(target){
    return target!==null&&target!==undefined&&target.isAlive&&!this.isIllusionUser(target)&&target.illusionTurns<2
  }

  targetTeamForStrategyUser(u){return u.team==="player"?"enemy":"player"}

  hasStrategyTarget(u){
    if(u===null||u===undefined||!this.canUseStrategy(u)){return false}
    const team=this.targetTeamForStrategyUser(u);
    if(this.isSpecialTacticUser(u)){
      return this.alive(team).some(center=>this.isValidSpecialTacticCenter(u,center,team))
    }
    return this.availableStrategyLevels(u,team).length>0
  }

  availableStrategyLevels(u,team){
    const levels=[];
    if(this.isSpecialTacticUser(u)){
      if(this.alive(team).some(center=>this.isValidSpecialTacticCenter(u,center,team))){levels.push(1)}
      return levels
    }
    if(this.isIllusionUser(u)){
      if(this.hasStrategyTargetForLevel(u,1,team)){levels.push(1)}
      return levels
    }
    const maxLevel=Math.min(u.maxStrategyLevel,u.strategyUses);
    for(let level=1;level<=maxLevel;level++){
      if(this.hasStrategyTargetForLevel(u,level,team)){levels.push(level)}
    }
    return levels
  }

  hasStrategyTargetForLevel(u,level,team){
    if(!this.canUseStrategyLevel(u,level)){return false}
    return this.alive(team).some(center=>this.isValidStrategyCenter(u,center,level,team))
  }

  isValidStrategyCenter(user,center,level,team){
    if(user===null||user===undefined||center===null||center===undefined){return false}
    if(this.isSpecialTacticUser(user)){return this.isValidSpecialTacticCenter(user,center,team)}
    if(!center.isAlive||center.team!==team||this.distance(user,center)>3||!this.hasClearLineOfSight(user,center)){return false}
    if(this.isIllusionUser(user)){return this.canImproveIllusion(center)}
    if(level===1){return this.canImproveConfusion(center)}
    return this.strategyAreaTargetsForTeam(center,level,team).some(target=>
      this.canImproveConfusion(target)&&this.hasClearLineOfSight(user,target)
    )
  }

  strategyEligibleTargets(user,center,level,team){
    if(this.isIllusionUser(user)){
      return this.canImproveIllusion(center)&&this.hasClearLineOfSight(user,center)?[center]:[]
    }
    return this.strategyAreaTargetsForTeam(center,level,team).filter(target=>
      this.canImproveConfusion(target)&&this.hasClearLineOfSight(user,target)
    )
  }

  strategyTargetInvalidMessage(user,center,level,team){
    if(!this.hasClearLineOfSight(user,center)){
      return "城壁に射線を遮られているため、この部隊を対象にできません。"
    }
    if(this.isSpecialTacticUser(user)){
      return `${this.specialTacticName(user)}の中心には、射程3マス以内の敵部隊を指定してください。`
    }
    if(this.isIllusionUser(user)){
      if(this.isIllusionUser(center)){return "幻術士は幻術の対象外です。"}
      return center.illusionTurns>=2
        ?"この部隊は幻術が残り2ターンのため、これ以上延長できません。"
        :"この部隊は幻術の対象にできません。"
    }
    if(level===1){
      if(center.illusionTurns>=2){return "この部隊は幻術が残り2ターンのため、撹乱Lv1の対象にできません。"}
      if(center.confusedTurns>=2){return "この部隊は撹乱が残り2ターンのため、撹乱Lv1ではこれ以上延長できません。"}
      return "この部隊は撹乱Lv1の対象にできません。"
    }
    return `この部隊を中心にしても、撹乱Lv${level}の範囲内に延長可能な${team==="enemy"?"敵":"味方"}がいません。`
  }

  strategyAreaTargetsForTeam(center,level,team){
    const radius=Math.max(0,level-1);
    return this.alive(team).filter(target=>this.distance(center,target)<=radius)
  }

  clearConfusionCoveredByIllusion(unit){
    if(unit===null||unit===undefined){return false}
    if(unit.illusionTurns>0&&unit.confusedTurns>0&&unit.illusionTurns>=unit.confusedTurns){
      unit.confusedTurns=0;
      return true
    }
    return false
  }

  isIllusionUser(u){return u!==null&&u!==undefined&&(u.hasIllusion===true||u.specialAbility.includes("幻術"))}

  isGaoLianWideIllusionMode(u){
    if(this.stages[this.currentStage]?.id!=="gaotang-prefecture"||u===null||u===undefined||u.id!=="gao_lian"||!this.isIllusionUser(u)){return false}
    const gongsun=this.units.find(unit=>unit.id==="gongsun_sheng_gaotang");
    return gongsun===undefined||!gongsun.isAlive||this.distance(u,gongsun)>3
  }

  gaoLianWideIllusionTargets(user){
    if(!this.isGaoLianWideIllusionMode(user)){return []}
    return this.alive("player").filter(target=>
      this.distance(user,target)<=3&&
      this.canImproveIllusion(target)&&
      this.hasClearLineOfSight(user,target)
    )
  }

  randomFacing(){return ["north","east","south","west"][Math.floor(this.randomFloat()*4)]}

  async playerAttack(target){
    const a=this.selected();if(a===null||this.distance(a,target)!==1){return}
    const sessionId=this.battleSessionId;
    this.commitUnitAction(a);
    await this.runActionResolution(async()=>{
      a.facing=this.direction(a.x,a.y,target.x,target.y);
      this.render();
      await this.wait(150);
      if(!this.isBattleSessionActive(sessionId)){return}
      const damage=this.attack(a,target);
      await this.showDamageFeedback(target,damage,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.render();
      this.checkResult();
      await this.processPendingStageEvent(sessionId)
    },{sessionId});
    if(!this.isBattleSessionActive(sessionId)){return}
    if(!this.finished){this.completeActionAfterAttack(a)}else{this.render()}
  }

  completeActionAfterAttack(u){
    if(u===null){return}
    this.completeUnitAction(u);
    this.showBlankInfo();
    this.render();
    this.queueRecoverySnapshot()
  }

  beginFacing(canUndoMovement=false){
    const u=this.selected();
    if(u===null){return}
    this.enterFacingSelection(u,canUndoMovement,true)
  }

  chooseFacing(x,y){
    const u=this.pendingFacing();
    if(u===null||Math.abs(u.x-x)+Math.abs(u.y-y)!==1){return}
    u.facing=this.direction(u.x,u.y,x,y);
    this.completeUnitAction(u);
    this.audio.confirm();
    this.showBlankInfo();
    this.render();
    this.queueRecoverySnapshot()
  }

  cancel(){
    const u=this.selected();if(u===null||!this.canUndoCurrentAction(u)){return}
    // v9.7.62：移動仮確定後は、対象選択などのサブモードにいても「戻る」1回で移動前へ戻して操作ロックを解除する。
    if(u.hasMoved&&u.actionCommitted!==true&&this.previous!==null){
      this.selectedStrategyLevel=0;
      this.cancelUncommittedMovement(u,"移動前へ戻しました。移動先、戦闘技能、計略、または待機を選べます。");
      return
    }
    if(this.mode==="bow"||this.mode==="charge"){
      this.mode=this.skillReturnMode||"move";
      if(this.mode==="command"){
        this.showInfo(u,"赤丸の敵を攻撃するか、戦闘技能・計略を使用するか、黄色い方向枠で向きを確定してください。敵の方向へ攻撃せず向きたい場合は「待機」を選んでください。");
      }else{
        this.showInfo(u,"移動先、戦闘技能、計略を選べます。");
      }
      this.render();
      return
    }
    if(this.mode==="strategy"){
      if(this.isIllusionUser(u)||this.isSpecialTacticUser(u)){
        this.mode=this.strategyReturnMode||"move";
        this.selectedStrategyLevel=0;
        this.showInfo(u,this.mode==="command"?"赤丸の敵を攻撃するか、戦闘技能・計略を使用するか、黄色い方向枠で向きを確定してください。敵の方向へ攻撃せず向きたい場合は「待機」を選んでください。":"移動先、戦闘技能、計略を選べます。");
      }else{
        this.mode="strategy-level";
        this.selectedStrategyLevel=0;
        this.showInfo(u,"撹乱のレベルを選んでください。");
      }
      this.render();
      return
    }
    if(this.mode==="strategy-level"){
      this.mode=this.strategyReturnMode||"move";
      this.selectedStrategyLevel=0;
      if(this.mode==="command"){
        this.showInfo(u,"赤丸の敵をタップして攻撃、計略を使用、または黄色い方向枠で向きを確定してください。敵の方向へ攻撃せず向きたい場合は「待機」を選んでください。");
      }else{
        this.showInfo(u,this.hasAdjacentEnemy(u)?"赤丸の敵を直接タップして攻撃できます。移動や計略も選べます。":"移動先を選ぶか、計略を使用してください。");
      }
      this.render();
      return
    }
    if(this.isWaitingForFacing()&&u.actionCommitted!==true&&this.previous!==null&&!u.hasMoved&&!u.hasActed){this.pendingFacingUnitId=null;this.facingCanUndoMovement=false;this.mode="move";this.reachable=this.calcReachable(u);this.showInfo(u,"待機を取り消しました。移動先、戦闘技能、計略、または待機を選べます。");this.render();this.keepCellVisible(u.x,u.y);return}
    if(this.isWaitingForFacing()&&u.actionCommitted!==true&&this.facingCanUndoMovement&&this.previous!==null){this.cancelUncommittedMovement(u,"移動前へ戻しました。移動先、戦闘技能、計略、または待機を選べます。");return}
    if(this.mode==="command"&&this.previous!==null){this.cancelUncommittedMovement(u,"移動前へ戻しました。移動先、戦闘技能、計略を選べます。");return}
    if(this.mode==="move"){this.selectedUnitId=null;this.facingCanUndoMovement=false;this.previous=null;this.reachable.clear();this.mode="select";this.showBlankInfo();this.render()}
  }

  requestEndTurn(){
    if(!this.isPlayerInteractionReady()){return}

    const pendingCommitted=this.alive("player").find(unit=>unit.actionCommitted===true&&!unit.hasActed&&!unit.stationary);
    if(pendingCommitted!==undefined){
      this.resumeCommittedUnitFacing(pendingCommitted);
      this.showInfo(pendingCommitted,"行動は確定済みです。ターン終了前に最後の方向を指定してください。");
      return
    }

    // v9.6.25：移動後に何も行動せず最終方向選択へ入った場合も、方向未確定のままターン終了させない。
    // actionCommitted=false のため「戻る」による移動取消は従来どおり可能。
    if(this.isWaitingForFacing()||this.pendingFacingUnitId!==null){
      const pending=this.pendingFacing();
      const unit=pending!==null?pending:this.selected();
      if(unit!==null){
        this.showInfo(unit,this.canUndoCurrentAction(unit)
          ?"最後の方向を指定するか、「戻る」で移動前へ戻してからターンを終了してください。"
          :"ターン終了前に最後の方向を指定してください。");
        this.render()
      }
      return
    }

    // B22：移動仮確定中の部隊を残したままターン終了することは禁止する。
    // mode名ではなく部隊状態で検出し、command / strategy / bow / charge 等の派生状態も一括して保護する。
    const pendingMoved=this.alive("player").find(
      unit=>unit.hasMoved&&!unit.hasActed&&unit.actionCommitted!==true&&!unit.stationary
    );
    if(pendingMoved!==undefined){
      this.resumeMovedUnitAction(pendingMoved);
      this.showInfo(
        pendingMoved,
        this.previous!==null
          ?'現在の部隊の行動を完了するか、「戻る」で移動前へ戻してからターンを終了してください。'
          :"現在の部隊の行動を完了してからターンを終了してください。"
      );
      return
    }

    const unacted=this.alive("player").filter(unit=>!unit.hasActed&&!unit.stationary);

    if(unacted.length>0){
      const names=unacted.map(unit=>unit.name).join("、");
      const message=`未行動の味方部隊が${unacted.length}部隊います。\n${names}\n\nこのままターンを終了しますか？`;

      if(!window.confirm(message)){
        return
      }
    }

    const turnLimit=this.stageTurnLimit();
    if(this.turn>=turnLimit){
      // v9.5.5：最終自軍ターンの「ターン終了」が時間切れ。敵ターンは発生させない。
      this.checkResult();
      if(this.finished||this.finishing){return}
      this.addLog(`最終ターン終了。${turnLimit}ターン以内に勝利条件を達成できなかった。`);
      this.currentObjective=`敗北：${turnLimit}ターン以内に勝利条件を達成できませんでした。`;
      this.render();
      this.finish(false);
      return
    }

    this.enemyTurn()
  }

  async enemyTurn(resume=false){
    if(resume){
      if(this.phase!=="enemy"||this.finished){return}
    }else if(this.phase!=="player"||this.locked||this.finished){
      return
    }
    const sessionId=this.battleSessionId;

    this.phase="enemy";this.mode="select";this.selectedUnitId=null;this.pendingFacingUnitId=null;this.facingCanUndoMovement=false;this.reachable.clear();this.locked=true;

    // v9.5.7：敵ターン開始時は情報オーバーレイをすべて閉じ、敵行動の視認を優先する。
    this.cancelLongPressTimer();
    this.longPressTriggered=false;
    this.longPressUnitId=null;
    this.suppressLongPressClick=false;
    this.hideAbilityOverlay();
    this.hideStageInfo();
    this.hideBattleStatus();
    this.hideStrategyGuide();

    if(!resume){
      for(const e of this.alive("enemy")){
        if(e.stationary){
          e.hasMoved=true;
          this.markUnitActionCompleted(e)
        }else{
          this.resetUnitActionForTurn(e)
        }
        this.clearConfusionCoveredByIllusion(e);

        // 移動しない護送車なども、自軍ターンを迎えた時点で撹乱の残りターンを消費する。
        // これにより、行動対象外の固定部隊に「？」が残り続けることを防ぐ。
        if(e.stationary&&e.confusedTurns>0){
          e.confusedTurns=Math.max(0,e.confusedTurns-1);
          this.addLog(`${e.name}は撹乱の影響を受けた。`)
        }

        if(e.stationary&&e.illusionTurns>0){
          e.illusionTurns=Math.max(0,e.illusionTurns-1);
          e.facing=this.randomFacing();
          this.addLog(`${e.name}は幻術に惑わされた。`)
        }
      }
      this.addLog(`―― 敵ターン ${this.turn} / ${this.stageTurnLimit()} ――`);
      this.render();
      this.audio.gong();
      this.saveRecoverySnapshot()
    }else{
      this.addLog("敵ターンの途中から処理を再開します。");
      this.render()
    }

    const stage=this.stages[this.currentStage];
    const damingPursuitIds=new Set(stage.damingPursuitUnits||[]);
    const enemyActionOrder=this.alive("enemy");
    enemyActionOrder.sort((a,b)=>{
      const aRush=damingPursuitIds.has(a.id);
      const bRush=damingPursuitIds.has(b.id);
      if(aRush!==bRush){return aRush?-1:1}
      if(aRush&&bRush){
        if(a.y!==b.y){return b.y-a.y}
        const aGateDistance=Math.min(Math.abs(a.x-3),Math.abs(a.x-4));
        const bGateDistance=Math.min(Math.abs(b.x-3),Math.abs(b.x-4));
        if(aGateDistance!==bGateDistance){return aGateDistance-bGateDistance}
      }
      return 0
    });

    for(const e of enemyActionOrder){
      if(!this.isBattleSessionActive(sessionId)){return}
      if(this.finished){break}
      if(!e.isAlive||e.stationary||e.hasActed){continue}
      await this.wait(300);
      if(!this.isBattleSessionActive(sessionId)){return}

      // 敵1体の行動解決中は盤面が中間状態になるため、復元用スナップショットを保存しない。
      // 敵ターン全体の入力ロックは維持したまま、共通のtry/finallyで行動解決状態だけを管理する。
      // 例外が起きても当該敵を再実行せず行動済みにして、敵ターン全体の停止を防ぐ。
      try{
        await this.runActionResolution(
          ()=>this.enemyAction(e,sessionId),
          {lockInput:false,unlockInput:false,sessionId}
        )
      }catch(error){
        if(!this.isBattleSessionActive(sessionId)){return}
        console.error(`[戦旗水滸伝] 敵行動処理エラー: ${e.id}`,error);
        this.addLog(`${e.name}の行動処理でエラーが発生したため、この部隊の行動を終了した。`)
      }
      if(!this.isBattleSessionActive(sessionId)){return}
      this.markUnitActionCompleted(e);
      this.checkResult();
      this.render();
      this.saveRecoverySnapshot()
    }
    if(!this.isBattleSessionActive(sessionId)){return}

    // 敵のhasActedはここでは戻さない。
    // この状態を敵ターン完了済みの安定状態として保存できるようにし、次回の敵ターン開始時に初期化する。
    if(!this.finished){
      await this.wait(350);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.locked=false;
      try{
        await this.startPlayerTurn(sessionId)
      }catch(error){
        this.handlePlayerTurnSetupFailure(sessionId,error);
        return
      }
    }else{
      this.locked=false;
      this.render()
    }
  }

  findIllusionFriendlyTarget(unit){
    const allies=this.alive(unit.team).filter(candidate=>candidate.id!==unit.id);
    let best=null;

    for(const target of allies){
      let path=[];
      let cost=0;

      if(this.distance(unit,target)>1){
        path=this.pathToAdjacent(unit,target);
        if(path.length===0){continue}
        for(const step of path){
          cost+=this.terrainMoveCost(unit,this.map[step.y][step.x])
        }
      }

      const end=path.length>0?path[path.length-1]:{x:unit.x,y:unit.y};
      if(Math.abs(end.x-target.x)+Math.abs(end.y-target.y)!==1||cost>unit.move){continue}

      if(best===null||cost<best.cost||(cost===best.cost&&target.hp<best.target.hp)){
        best={target,path,cost}
      }
    }

    return best
  }

  async resolveIllusionAction(unit,sessionId=this.battleSessionId){
    if(!this.isBattleSessionActive(sessionId)){return}
    const hadConfusion=unit.confusedTurns>0;
    unit.illusionTurns=Math.max(0,unit.illusionTurns-1);
    if(hadConfusion){
      unit.confusedTurns=Math.max(0,unit.confusedTurns-1);
      this.addLog(`${unit.name}は撹乱も受けているが、幻術の効果が優先された。`)
    }
    const action=this.findIllusionFriendlyTarget(unit);

    if(action===null){
      unit.facing=this.randomFacing();
      this.addLog(`${unit.name}は幻術に惑わされたが、移動して攻撃できる味方がいないため行動不能。向きも乱れた。`);
      this.audio.defeat();
      this.render();
      await this.wait(340);
      if(!this.isBattleSessionActive(sessionId)){return}
      return
    }

    const target=action.target;

    const illusionPath=[];
    for(const step of action.path){
      if(!unit.isAlive||!target.isAlive){break}
      illusionPath.push(step);
      if(Math.abs(step.x-target.x)+Math.abs(step.y-target.y)===1){break}
    }
    await this.animateUnitPath(unit,illusionPath,80,sessionId);
    if(!this.isBattleSessionActive(sessionId)){return}

    if(unit.isAlive&&target.isAlive&&this.distance(unit,target)===1){
      unit.facing=this.direction(unit.x,unit.y,target.x,target.y);
      this.render();
      await this.wait(120);
      if(!this.isBattleSessionActive(sessionId)){return}
      const damage=this.attack(unit,target,"同士討ち");
      await this.showDamageFeedback(target,damage,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.render()
    }
  }

  enemyCanAttackThisTurn(user,targets){
    const candidates=targets||this.alive(user.team==="enemy"?"player":"enemy");

    if(candidates.some(target=>this.distance(user,target)===1)){
      return true
    }

    if(this.canUseBow(user)&&candidates.some(target=>this.isValidProjectileTarget(user,target))){
      return true
    }

    for(const target of candidates){
      const path=this.pathToAdjacent(user,target);
      if(path.length===0){continue}

      let cost=0;
      for(const step of path){
        cost+=this.terrainMoveCost(user,this.map[step.y][step.x])
      }

      const end=path[path.length-1];
      if(cost<=user.move&&Math.abs(end.x-target.x)+Math.abs(end.y-target.y)===1){
        return true
      }
    }

    return false
  }

  /**
   * 第6章の火計・水計モブ隊長専用AIかを判定する。
   */
  isZhujiaMobTacticCaptain(u){
    return u!==null&&u!==undefined&&u.zhujiaMobTacticAi===true&&this.isSpecialTacticUser(u)
  }

  /**
   * 第6章モブ隊長の火計・水計候補を評価する。
   * プレイヤーを多く巻き込む候補を優先し、CPU側の巻き添えは大きく減点する。
   * CPU側を撃破する、CPU側1隊へ現在兵力の40%以上を与える、またはCPU側合計被害が
   * プレイヤー側合計被害の50%以上になる候補は危険とみなし、使用候補から除外する。
   */
  evaluateZhujiaMobSpecialTacticCenter(user,center,canAttackThisTurn){
    if(!this.isValidSpecialTacticCenter(user,center,"player")){return null}

    const affected=this.specialTacticAffectedUnits(user,center);
    const playerTargets=[];
    const cpuTargets=[];
    let playerDamage=0;
    let cpuDamage=0;
    let playerDefeats=0;
    let cpuUnsafe=false;

    for(const target of affected){
      const result=this.specialTacticDamage(user,target,target.id===center.id);
      if(target.team==="player"){
        playerTargets.push(target);
        playerDamage+=result.damage;
        if(result.damage>=target.hp){playerDefeats++}
      }else if(target.team===user.team){
        cpuTargets.push(target);
        cpuDamage+=result.damage;
        if(result.damage>=target.hp||result.damage>=target.hp*.40){cpuUnsafe=true}
      }
    }

    if(playerTargets.length===0){return null}
    // 1隊だけなら、同じターンに直接攻撃できる場合は貴重な1回を温存する。
    if(playerTargets.length===1&&canAttackThisTurn){return null}
    // CPU側の損害が大きい候補は、他の攻撃手段の有無に関係なく使用しない。
    if(cpuUnsafe){return null}
    if(cpuDamage>0&&cpuDamage>=playerDamage*.50){return null}

    const confusionChance=this.specialTacticConfusionChance(user,center);
    // 巻込み数を最優先しつつ、与ダメージ・撃破・中心撹乱を加点、CPU巻き添えを強く減点する。
    const score=playerTargets.length*1000+playerDamage+playerDefeats*450+confusionChance*2-cpuTargets.length*350-cpuDamage*3;
    if(score<=0){return null}

    return {
      target:center,
      level:1,
      specialTactic:true,
      score,
      playerTargetCount:playerTargets.length,
      playerDamage,
      cpuTargetCount:cpuTargets.length,
      cpuDamage
    }
  }

  /**
   * 第6章モブ隊長の全火計・水計候補を比較し、十分に有利な1地点だけを返す。
   * 有効候補がなければnullを返し、通常攻撃等へ移る。
   */
  chooseZhujiaMobSpecialTacticAction(user,centers){
    const canAttackThisTurn=this.enemyCanAttackThisTurn(user,this.alive("player"));
    let best=null;
    for(const center of centers){
      const candidate=this.evaluateZhujiaMobSpecialTacticCenter(user,center,canAttackThisTurn);
      if(candidate===null){continue}
      if(best===null||candidate.score>best.score){best=candidate}
    }
    return best
  }

  enemyStrategyUseRate(u,canAttackThisTurn){
    if(this.isZhujiaMobTacticCaptain(u)){return 1}

    if(u.name.includes("参謀")){
      return .98
    }

    if(this.isIllusionUser(u)){
      return canAttackThisTurn?.85:1
    }

    if(this.isSpecialTacticUser(u)){
      return canAttackThisTurn?.70:1
    }

    // 攻撃できない場合は、武力型でも何もせず終えるより撹乱を次善策として使う。
    if(!canAttackThisTurn){
      return 1
    }

    // 攻撃できる場合は、武力が知略を上回るほど通常攻撃を優先する。
    const martialLead=u.martial-u.intelligence;
    if(martialLead>=30){return .03}
    if(martialLead>=20){return .08}
    if(martialLead>=10){return .15}
    if(martialLead>0){return .25}
    if(martialLead===0){return .45}
    if(martialLead>=-10){return .60}
    if(martialLead>=-20){return .75}
    return .85
  }

  chooseEnemyStrategyAction(user){
    if(this.isGaoLianWideIllusionMode(user)){
      const wideTargets=this.gaoLianWideIllusionTargets(user);
      if(wideTargets.length>0){return {target:null,level:1,wideIllusion:true}}
    }
    if(!this.canUseStrategy(user)){return null}
    const centers=this.alive("player").filter(target=>
      this.distance(user,target)<=3&&this.hasClearLineOfSight(user,target)
    );
    if(centers.length===0){return null}

    if(this.isSpecialTacticUser(user)){
      if(this.isZhujiaMobTacticCaptain(user)){
        return this.chooseZhujiaMobSpecialTacticAction(user,centers)
      }

      let best=null;
      for(const center of centers){
        if(!this.isValidSpecialTacticCenter(user,center,"player")){continue}
        let score=0;
        for(const affected of this.specialTacticAffectedUnits(user,center)){
          const result=this.specialTacticDamage(user,affected,affected.id===center.id);
          score+=affected.team==="player"?result.damage:-result.damage*1.25
        }
        score+=this.specialTacticConfusionChance(user,center)*.8;
        if(best===null||score>best.score){best={target:center,level:1,specialTactic:true,score}}
      }
      return best
    }

    if(this.isIllusionUser(user)){
      const ranked=centers.filter(target=>this.canImproveIllusion(target)).sort((a,b)=>{
        const scoreA=a.martial*.55+a.command*.25+(100-a.intelligence)*.35;
        const scoreB=b.martial*.55+b.command*.25+(100-b.intelligence)*.35;
        return scoreB-scoreA
      });
      return ranked.length>0?{target:ranked[0],level:1}:null
    }

    const maxLevel=Math.min(user.maxStrategyLevel,user.strategyUses);
    let best=null;
    for(const center of centers){
      for(let level=1;level<=maxLevel;level++){
        if(!this.isValidStrategyCenter(user,center,level,"player")){continue}
        const affected=this.strategyEligibleTargets(user,center,level,"player");
        let score=0;
        for(const target of affected){
          const chance=this.strategySuccessChance(user.intelligence,target.intelligence)/100;
          score+=chance*(1+target.martial/180+target.command/260)
        }
        score-=level*.16;
        if(best===null||score>best.score){best={target:center,level,score}}
      }
    }
    return best
  }

  async enemyGaoLianWideIllusion(user,sessionId=this.battleSessionId){
    if(!this.isBattleSessionActive(sessionId)||!this.isGaoLianWideIllusionMode(user)){return}
    const targets=this.gaoLianWideIllusionTargets(user);
    if(targets.length===0){return}

    this.render();
    await this.showActionCutIn(user,"illusion",sessionId);
    if(!this.isBattleSessionActive(sessionId)){return}
    await this.wait(80);
    if(!this.isBattleSessionActive(sessionId)){return}
    await this.showWideIllusionOverlay(user,sessionId);
    if(!this.isBattleSessionActive(sessionId)){return}
    this.audio.illusionCast();
    await this.flashStrategyCells(user,user,4,sessionId);
    if(!this.isBattleSessionActive(sessionId)){return}
    let successCount=0;
    const successfulTargets=[];
    const twoTurnIllusionTargets=[];
    for(const affected of targets){
      const chance=this.strategySuccessChance(100,affected.intelligence);
      if(this.randomFloat()*100<chance){
        successCount++;
        successfulTargets.push(affected);
        const turns=this.strategyEffectTurns(chance);
        affected.illusionTurns=Math.max(affected.illusionTurns,turns);
        if(turns>=2){twoTurnIllusionTargets.push(affected)}
        this.clearConfusionCoveredByIllusion(affected)
      }
    }

    this.addLog(`${user.name}の広域幻術！ ${targets.length}部隊中${successCount}部隊に成功。`);
    if(successfulTargets.length>0){
      this.addLog(`　影響：${successfulTargets.map(unit=>`${unit.name}［幻術${unit.illusionTurns}T］`).join("、")}`)
    }

    if(successCount===0){this.audio.defeat()}

    this.render();
    if(successCount>0){
      this.audio.illusionSuccess();
      // 広域幻術は全体の骸骨＋紫霧が発動演出を担うため、個別ドクロは表示しない。
      await this.flashIllusionSuccessByTurns(successfulTargets,twoTurnIllusionTargets,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      await this.showStrategySuccessDialogue(user,successfulTargets[0],true,successCount);
      if(!this.isBattleSessionActive(sessionId)){return}
    }
    await this.wait(180);
  }

  async enemyStrategy(user,target,level,sessionId=this.battleSessionId){
    if(!this.isBattleSessionActive(sessionId)){return}
    if(this.isSpecialTacticUser(user)){
      await this.resolveSpecialTactic(user,target,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.checkResult();
      return
    }
    const isIllusion=this.isIllusionUser(user);
    const cost=isIllusion?1:level;
    if(!this.canUseStrategyLevel(user,level)||!this.isValidStrategyCenter(user,target,level,"player")){return}

    user.facing=this.direction(user.x,user.y,target.x,target.y);
    user.strategyUses-=cost;
    const targets=this.strategyEligibleTargets(user,target,level,"player");
    this.render();
    await this.showActionCutIn(user,isIllusion?"illusion":"strategy",sessionId);
    if(!this.isBattleSessionActive(sessionId)){return}
    await this.wait(80);
    if(!this.isBattleSessionActive(sessionId)){return}
    if(isIllusion){this.audio.illusionCast()}else{this.audio.strategyCast()}
    await this.flashStrategyCells(user,target,isIllusion?1:level,sessionId);
    if(!this.isBattleSessionActive(sessionId)){return}

    let successCount=0;
    const successfulTargets=[];
    const twoTurnIllusionTargets=[];
    const confusionEffectTargets=[];
    const twoTurnConfusionTargets=[];

    for(const affected of targets){
      const effectiveIntelligence=isIllusion?100:user.intelligence;
      const chance=this.strategySuccessChance(effectiveIntelligence,affected.intelligence);
      if(this.randomFloat()*100<chance){
        successCount++;
        successfulTargets.push(affected);
        const turns=this.strategyEffectTurns(chance);
        if(isIllusion){
          affected.illusionTurns=Math.max(affected.illusionTurns,turns);
          if(turns>=2){twoTurnIllusionTargets.push(affected)}
          this.clearConfusionCoveredByIllusion(affected)
        }else{
          const previousConfusedTurns=affected.confusedTurns;
          affected.confusedTurns=Math.max(affected.confusedTurns,turns);
          const confusionCleared=this.clearConfusionCoveredByIllusion(affected);
          if(!confusionCleared){
            affected.facing=this.randomFacing();
            if(affected.confusedTurns>previousConfusedTurns){
              confusionEffectTargets.push(affected);
              if(turns>=2){twoTurnConfusionTargets.push(affected)}
            }
          }
        }
      }
    }

    const strategyName=isIllusion?"幻術":`撹乱Lv${level}`;
    this.addLog(`${user.name}の${strategyName}！ ${targets.length}部隊中${successCount}部隊に成功。残り${user.strategyUses}/${user.maxStrategyUses}回。`);
    if(successfulTargets.length>0){
      const statusName=isIllusion?"幻術":"撹乱";
      this.addLog(`　影響：${successfulTargets.map(unit=>`${unit.name}［${statusName}${isIllusion?unit.illusionTurns:unit.confusedTurns}T］`).join("、")}`)
    }

    if(successCount===0){this.audio.defeat()}

    this.render();
    if(successCount>0){
      if(isIllusion){
        this.audio.illusionSuccess();
        await Promise.all([
          this.flashIllusionSuccessByTurns(successfulTargets,twoTurnIllusionTargets,sessionId),
          this.showNormalIllusionSkullEffect(successfulTargets,sessionId)
        ])
      }else if(confusionEffectTargets.length>0){
        this.audio.confusionSuccess();
        await this.flashConfusionSuccessByTurns(confusionEffectTargets,twoTurnConfusionTargets,sessionId)
      }
      if(!this.isBattleSessionActive(sessionId)){return}
      const representative=successfulTargets.includes(target)?target:successfulTargets[0];
      await this.showStrategySuccessDialogue(user,representative,isIllusion,successCount);
      if(!this.isBattleSessionActive(sessionId)){return}
    }
    await this.wait(180);
    if(!this.isBattleSessionActive(sessionId)){return}
  }

  isDamingAggressiveSideInfantry(u){
    return u!==null&&u!==undefined&&(u.id==="daming_reinforcement_infantry_left"||u.id==="daming_reinforcement_infantry_right")
  }

  pathCostForUnit(u,path){
    let cost=0;
    for(const step of path){
      cost+=this.terrainMoveCost(u,this.map[step.y][step.x])
    }
    return cost
  }

  damingPursuitDistanceIgnoringUnits(u,startX,startY,target){
    const startKey=this.key(startX,startY);
    const open=[{x:startX,y:startY,c:0}];
    const costs=new Map([[startKey,0]]);

    while(open.length){
      open.sort((a,b)=>a.c-b.c);
      const cur=open.shift();
      const curKey=this.key(cur.x,cur.y);
      if(cur.c!==costs.get(curKey)){continue}

      for(const n of this.neighbors(cur.x,cur.y)){
        if(!this.inside(n.x,n.y)){continue}
        const terrainType=this.map[n.y][n.x];
        if(!this.canEnterTerrain(u,terrainType)){continue}
        const nextCost=cur.c+this.terrainMoveCost(u,terrainType);
        const key=this.key(n.x,n.y);
        const old=costs.has(key)?costs.get(key):Infinity;
        if(nextCost<old){
          costs.set(key,nextCost);
          open.push({x:n.x,y:n.y,c:nextCost})
        }
      }
    }

    let best=Infinity;
    for(const adjacent of this.neighbors(target.x,target.y)){
      if(!this.inside(adjacent.x,adjacent.y)){continue}
      const terrainType=this.map[adjacent.y][adjacent.x];
      if(!this.canEnterTerrain(u,terrainType)){continue}
      const value=costs.get(this.key(adjacent.x,adjacent.y));
      if(value!==undefined&&value<best){best=value}
    }
    return best
  }

  damingPursuitMovePath(u,targets){
    // 城門内では従来の二列門路前詰めを優先し、後続も詰まらせない。
    if(u.y<=3){
      const gatePath=this.pathToRushOutside(u);
      if(gatePath.length>0){return gatePath}
    }

    const reachable=this.calcReachable(u);
    if(reachable.size===0){return[]}

    const pursuitDistance=(x,y)=>{
      let best=Infinity;
      for(const target of targets){
        if(!target.isAlive){continue}
        const distance=this.damingPursuitDistanceIgnoringUnits(u,x,y,target);
        if(distance<best){best=distance}
      }
      return best
    };

    const currentDistance=pursuitDistance(u.x,u.y);
    let best=null;

    for(const [key,moveCost] of reachable){
      const [x,y]=key.split(",").map(Number);
      const navDistance=pursuitDistance(x,y);
      if(!Number.isFinite(navDistance)){continue}
      const directDistance=targets.reduce(
        (value,target)=>target.isAlive?Math.min(value,Math.abs(x-target.x)+Math.abs(y-target.y)):value,
        Infinity
      );
      const candidate={x,y,moveCost,navDistance,directDistance};

      if(
        best===null||
        candidate.navDistance<best.navDistance||
        (candidate.navDistance===best.navDistance&&candidate.directDistance<best.directDistance)||
        (candidate.navDistance===best.navDistance&&candidate.directDistance===best.directDistance&&candidate.moveCost>best.moveCost)
      ){
        best=candidate
      }
    }

    // 現在位置より地形上の追跡距離を縮められないなら「前進不能」とみなす。
    if(best===null||!(best.navDistance<currentDistance)){return[]}
    return this.pathToCell(u,best.x,best.y)
  }

  async enemyDamingPursuitFallbackAction(e,targets,sessionId=this.battleSessionId){
    const strategyAction=this.chooseEnemyStrategyAction(e);
    if(strategyAction!==null){
      if(strategyAction.wideIllusion===true){
        await this.enemyGaoLianWideIllusion(e,sessionId)
      }else{
        await this.enemyStrategy(e,strategyAction.target,strategyAction.level,sessionId)
      }
      return true
    }

    const bowTarget=targets.find(target=>this.isValidProjectileTarget(e,target));
    if(this.canUseBow(e)&&bowTarget!==undefined){
      e.facing=this.direction(e.x,e.y,bowTarget.x,bowTarget.y);
      e.bowUses--;
      this.render();
      await this.showActionCutIn(e,"bow",sessionId);
      if(!this.isBattleSessionActive(sessionId)){return true}
      await this.wait(70);
      if(!this.isBattleSessionActive(sessionId)){return true}
      this.audio.bow(true);
      await this.playBowProjectileSequence(e,bowTarget,true,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return true}
      const damage=this.calculateBowDamage(e,bowTarget);
      this.applyDamage(bowTarget,damage);
      this.addLog(`${e.name}の${this.projectileActionName(e)}！ ${bowTarget.name}に${damage}ダメージ（${this.bowDirectionLabel(e,bowTarget)}）。`);
      await this.showDamageFeedback(bowTarget,damage,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return true}
      this.render();
      return true
    }

    const nearest=targets.find(target=>target.isAlive);
    if(nearest!==undefined){
      e.facing=this.direction(e.x,e.y,nearest.x,nearest.y);
      this.render()
    }
    return true
  }

  async enemyAction(e,sessionId=this.battleSessionId){
    if(!this.isBattleSessionActive(sessionId)){return}

    // v9.7.27：移動の有無に関係なく、行動開始時点で白い選択リングを現在の敵へ移す。
    // その場攻撃・計略・撹乱による行動休みでも「今どの敵の手番か」を明示する。
    this.setSelectedCellToUnit(e);
    this.keepCellVisible(e.x,e.y);

    if(e.illusionTurns>0){
      await this.resolveIllusionAction(e,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      return
    }

    if(e.confusedTurns>0){
      e.confusedTurns--;
      this.addLog(`${e.name}は撹乱されており、この行動は休み。`);
      this.audio.defeat();
      await this.wait(320);
      if(!this.isBattleSessionActive(sessionId)){return}
      return
    }

    const targets=this.alive("player");
    if(targets.length===0){return}
    targets.sort((a,b)=>this.distance(e,a)-this.distance(e,b));

    const stage=this.stages[this.currentStage];
    const damingPursuit=(stage.damingPursuitUnits||[]).includes(e.id);
    let damingAdjacentAtStart=null;

    if(damingPursuit){
      damingAdjacentAtStart=targets.find(target=>target.isAlive&&this.distance(e,target)===1)??null;

      if(damingAdjacentAtStart===null){
        const pursuitPath=this.damingPursuitMovePath(e,targets);
        const movementPath=[];
        let spent=0;

        for(const step of pursuitPath){
          const terrainType=this.map[step.y][step.x];
          const moveCost=this.terrainMoveCost(e,terrainType);
          if(spent+moveCost>e.move||this.unitAt(step.x,step.y)!==null){break}
          movementPath.push(step);
          spent+=moveCost
        }

        if(movementPath.length>0){
          await this.animateUnitPath(e,movementPath,80,sessionId);
          if(!this.isBattleSessionActive(sessionId)){return}

          // 追捕隊は移動後に使える攻撃を通常攻撃だけに限定する。
          const adjacentAfterMove=targets.find(target=>target.isAlive&&this.distance(e,target)===1);
          if(adjacentAfterMove!==undefined){
            e.facing=this.direction(e.x,e.y,adjacentAfterMove.x,adjacentAfterMove.y);
            this.render();
            await this.wait(120);
            if(!this.isBattleSessionActive(sessionId)){return}
            const damage=this.attack(e,adjacentAfterMove);
            await this.showDamageFeedback(adjacentAfterMove,damage,sessionId);
            if(!this.isBattleSessionActive(sessionId)){return}
            this.render()
          }
          return
        }

        // 一歩もプレイヤー側へ前進できない時だけ、計略→遠距離攻撃の順で切り替える。
        await this.enemyDamingPursuitFallbackAction(e,targets,sessionId);
        return
      }
    }

    const aggressiveSideInfantry=this.isDamingAggressiveSideInfantry(e);
    let t=damingAdjacentAtStart??targets[0];
    if(aggressiveSideInfantry){
      const escapeTargets=targets.filter(target=>target.id==="lu_junyi_daming"||target.id==="shi_xiu_daming");
      if(escapeTargets.length>0){
        escapeTargets.sort((a,b)=>this.distance(e,a)-this.distance(e,b));
        t=escapeTargets[0]
      }
    }

    const canAttackThisTurn=this.enemyCanAttackThisTurn(e,targets);
    const strategyAction=(damingPursuit||aggressiveSideInfantry)?null:this.chooseEnemyStrategyAction(e);
    if(strategyAction!==null&&this.randomFloat()<this.enemyStrategyUseRate(e,canAttackThisTurn)){
      if(strategyAction.wideIllusion===true){
        await this.enemyGaoLianWideIllusion(e,sessionId)
      }else{
        await this.enemyStrategy(e,strategyAction.target,strategyAction.level,sessionId)
      }
      if(!this.isBattleSessionActive(sessionId)){return}
      return
    }

    const bowTarget=targets.find(target=>this.isValidProjectileTarget(e,target));
    if(!damingPursuit&&this.canUseBow(e)&&bowTarget!==undefined){
      e.facing=this.direction(e.x,e.y,bowTarget.x,bowTarget.y);
      e.bowUses--;
      this.render();
      await this.showActionCutIn(e,"bow",sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      await this.wait(70);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.audio.bow(true);
      await this.playBowProjectileSequence(e,bowTarget,true,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      const damage=this.calculateBowDamage(e,bowTarget);
      this.applyDamage(bowTarget,damage);
      this.addLog(`${e.name}の${this.projectileActionName(e)}！ ${bowTarget.name}に${damage}ダメージ（${this.bowDirectionLabel(e,bowTarget)}）。`);
      await this.showDamageFeedback(bowTarget,damage,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      this.render();
      return
    }

    if(this.distance(e,t)>1){
      const path=this.pathToAdjacent(e,t);
      const movementPath=[];
      let spent=0;

      for(const step of path){
        const terrainType=this.map[step.y][step.x];
        const moveCost=this.terrainMoveCost(e,terrainType);
        if(spent+moveCost>e.move||this.unitAt(step.x,step.y)!==null){break}

        movementPath.push(step);
        spent+=moveCost;
        if(Math.abs(step.x-t.x)+Math.abs(step.y-t.y)===1){break}
      }

      await this.animateUnitPath(e,movementPath,80,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
    }
    if(t.isAlive&&this.distance(e,t)===1){
      e.facing=this.direction(e.x,e.y,t.x,t.y);this.render();await this.wait(120);
      if(!this.isBattleSessionActive(sessionId)){return}
      let chargeConfused=false;
      let chargeDustPromise=null;
      let damage=0;
      if(this.canUseCharge(e)){
        e.chargeUses--;
        await this.showActionCutIn(e,"charge",sessionId);
        if(!this.isBattleSessionActive(sessionId)){return}
        this.audio.charge(!e.isMob);
        chargeDustPromise=this.showChargeDustEffect(t,BATTLE_EFFECT_TIMING.CHARGE_DUST_MS,sessionId);
        await this.wait(e.isMob?160:200);
        if(!this.isBattleSessionActive(sessionId)){return}
        damage=this.calculateChargeDamage(e,t);
        this.applyDamage(t,damage);
        let confused=false;
        let confusionCleared=false;
        const confusionRate=this.chargeConfusionRate(t);
        const previousConfusedTurns=t.confusedTurns;
        if(t.isAlive&&this.randomFloat()<confusionRate){
          t.confusedTurns=Math.max(t.confusedTurns,1);
          confusionCleared=this.clearConfusionCoveredByIllusion(t);
          if(!confusionCleared){
            t.facing=["north","east","south","west"][Math.floor(this.randomFloat()*4)];
            confused=t.confusedTurns>previousConfusedTurns
          }
        }
        chargeConfused=confused;
        this.addLog(`${e.name}の突撃！ ${t.name}に${damage}ダメージ。${confused?"さらに攪乱状態！":confusionCleared?"撹乱効果は残る幻術に内包された。":""}`)
      }else{
        damage=this.attack(e,t)
      }
      await this.showDamageFeedback(t,damage,sessionId);
      if(!this.isBattleSessionActive(sessionId)){return}
      if(chargeDustPromise!==null){await chargeDustPromise}
      if(!this.isBattleSessionActive(sessionId)){return}
      this.render();
      if(chargeConfused){
        this.audio.confusionSuccess();
        try{
          await Promise.all([
            this.flashUnit(t,"confusion",sessionId),
            this.showConfusionSymbolEffect([t],[],sessionId)
          ])
        }finally{
          if(sessionId===null||this.isBattleSessionActive(sessionId)){this.audio.stopConfusionSuccess()}
        }
      }
      return
    }
    const n=this.nearest(e,"player");if(n!==null){e.facing=this.direction(e.x,e.y,n.x,n.y)}
  }

  /**
   * 味方ターン開始処理が失敗した場合、半端な戦闘状態を残さずステージ選択へ退避する。
   * 通常経路では呼ばれず、startPlayerTurnの例外時だけ使用する。
   */
  handlePlayerTurnSetupFailure(sessionId,error){
    if(!this.isBattleSessionActive(sessionId)){return false}
    console.error("[戦旗水滸伝] 味方ターン開始処理エラー",error);
    this.openStageSelect();
    this.showSaveStatusMessage("味方ターン開始処理でエラーが発生したため、ステージ選択へ戻りました。");
    return false
  }

  async startPlayerTurn(sessionId=this.battleSessionId){
    if(!this.isBattleSessionActive(sessionId)){return}
    this.playerTurnSetupInProgress=true;
    this.playerTurnSetupSessionId=sessionId;
    this.playerTurnSetupFailed=false;
    let setupCompleted=false;
    try{
      this.turn++;
      this.phase="player";
      this.mode="select";
      this.selectedUnitId=null;
      this.pendingFacingUnitId=null;
      this.selectedCellX=null;
      this.selectedCellY=null;
      this.commandInstructionMessage="";
      this.reachable.clear();
      this.locked=true;
  
      for(const u of this.alive("player")){
        if(u.stationary){
          u.hasMoved=true;
          this.markUnitActionCompleted(u)
        }else{
          this.resetUnitActionForTurn(u)
        }
      }
  
      const stage=this.stages[this.currentStage];
      const turnLimit=this.stageTurnLimit();
      if(this.turn>turnLimit){
        this.addLog(`制限ターン超過。${turnLimit}ターン以内に勝利条件を達成できなかった。`);
        this.currentObjective=`敗北：${turnLimit}ターン以内に勝利条件を達成できませんでした。`;
        this.render();
        this.finish(false);
        return
      }
  
      this.addLog(`―― 味方ターン ${this.turn} / ${turnLimit} ――`);
      this.showBlankInfo();
      this.render();
      this.audio.gong();
  
      if(
        stage.battleType==="raid_escape"&&
        this.stageEventTriggered&&
        !this.raidReinforcementSpawned&&
        stage.raidReinforcementTurn!==undefined&&
        this.turn>=stage.raidReinforcementTurn
      ){
        await this.activateRaidReinforcements(stage,"第5自軍ターン開始",sessionId);
        if(!this.isBattleSessionActive(sessionId)){return}
      }
  
      if(stage.zhujiaBetrayal!==undefined&&!this.zhujiaBetrayalTriggered&&this.turn>=stage.zhujiaBetrayal.turn){
        await this.activateZhujiaBetrayal(stage);
        if(!this.isBattleSessionActive(sessionId)){return}
      }
      if(stage.zengtouBetrayal!==undefined&&!this.zengtouBetrayalTriggered&&this.turn>=stage.zengtouBetrayal.turn){
        await this.activateZengtouBetrayal(stage);
        if(!this.isBattleSessionActive(sessionId)){return}
      }
      if(stage.battleType==="raid_escape"&&!this.stageEventTriggered&&stage.raidTurnLimit!==undefined){
        if(this.turn>stage.raidTurnLimit){
          this.addLog(`制限時間超過。${stage.raidTurnLimit}ターン以内に護送車隊を壊滅できなかった。`);
          this.currentObjective="第一段階失敗：護送車隊を制限時間内に壊滅できませんでした。";
          this.render();
          this.finish(false);
          return
        }
        const remaining=stage.raidTurnLimit-this.turn+1;
        this.currentObjective=`勝利：${stage.raidTurnLimit}ターン以内に護送車を含む初期護送部隊を殲滅し、その後、晁蓋が北の旗へ到達。または追捕軍出現後、敵軍を全滅（護送部隊殲滅まで残り${remaining}ターン）<br>敗北：晁蓋が敗走・${stage.raidTurnLimit}ターン以内に護送部隊を殲滅できない`
      }
  
      if(stage.qinMingReinforcement!==undefined&&!this.turnReinforcementTriggered){
        const triggerUnit=this.units.find(unit=>unit.id===stage.qinMingReinforcement.triggerUnitId);
        if(triggerUnit!==undefined&&!triggerUnit.isAlive){
          await this.activateTurnReinforcement(stage,stage.qinMingReinforcement);
          if(!this.isBattleSessionActive(sessionId)){return}
        }
      }
  
      if(stage.turnReinforcement!==undefined&&!this.turnReinforcementTriggered&&this.turn>=stage.turnReinforcement.turn){
        await this.activateTurnReinforcement(stage);
        if(!this.isBattleSessionActive(sessionId)){return}
      }
  
      const turnUnits=[...this.alive("player")];
      for(const u of turnUnits){
        if(this.finished){break}
        if(!u.isAlive){continue}
        this.clearConfusionCoveredByIllusion(u);
  
        if(u.illusionTurns>0){
          u.hasMoved=true;
          this.markUnitActionCompleted(u);
          await this.resolveIllusionAction(u,sessionId);
          if(!this.isBattleSessionActive(sessionId)){return}
          this.checkResult();
          this.render();
          continue
        }
  
        if(u.confusedTurns>0){
          u.confusedTurns--;
          this.markUnitActionCompleted(u);
          this.addLog(`${u.name}は撹乱されており、このターンは行動休み。`)
        }
      }
  
      this.locked=false;
      if(!this.finished){
        this.showBlankInfo();
        this.render()
      }
      setupCompleted=true
    }catch(error){
      if(this.playerTurnSetupSessionId===sessionId){
        this.playerTurnSetupFailed=true
      }
      throw error
    }finally{
      // 古い戦闘セッションの非同期処理が、新しい戦闘のセットアップ状態を解除しないようにする。
      if(this.playerTurnSetupSessionId===sessionId){
        this.playerTurnSetupInProgress=false;
        this.playerTurnSetupSessionId=null
      }
      // v9.7.1：セットアップフラグ解除後に上部パネルだけ即時同期する。
      // 最後の render() は解除前に走るため、ここで同期しないと次のユニット選択まで非表示が残る。
      const activeSession=this.isBattleSessionActive(sessionId);
      // 途中return・セッション切替・例外時には中間状態を保存せず、正常完了時だけ安定状態を退避する。
      if(setupCompleted&&activeSession&&!this.finished){
        this.playerTurnSetupFailed=false;
        this.syncBattleActionButtonsVisibility();
        this.saveRecoverySnapshot()
      }else if(activeSession){
        this.syncBattleActionButtonsVisibility()
      }
    }
  }
  initializeHiddenTraps(stage){
    this.hiddenTraps=[];
    for(const zone of stage.hiddenTrapZones||[]){
      const available=(zone.candidates||[])
        .map(position=>({x:position[0],y:position[1]}))
        .filter(position=>
          this.inside(position.x,position.y)&&
          this.map[position.y][position.x]==="plain"&&
          this.unitAt(position.x,position.y)===null&&
          !this.hiddenTraps.some(trap=>trap.x===position.x&&trap.y===position.y)
        );
      const count=Math.min(zone.count||0,available.length);
      for(let i=0;i<count;i++){
        const index=Math.floor(this.randomFloat()*available.length);
        const position=available.splice(index,1)[0];
        this.hiddenTraps.push({
          x:position.x,
          y:position.y,
          type:zone.type||"normal",
          label:zone.label||"中央戦域",
          damage:zone.damage,
          confusionTurns:zone.confusionTurns,
          illusionTurns:zone.illusionTurns,
          active:true
        })
      }
    }
  }

  findReachablePath(unit,targetX,targetY){
    const targetKey=this.key(targetX,targetY);
    const startKey=this.key(unit.x,unit.y);
    const costs=new Map([[startKey,0]]);
    const parents=new Map();
    const open=[{x:unit.x,y:unit.y,c:0}];

    while(open.length>0){
      open.sort((a,b)=>a.c-b.c);
      const current=open.shift();
      const currentKey=this.key(current.x,current.y);
      if(current.c!==costs.get(currentKey)){continue}
      if(currentKey===targetKey){break}

      for(const next of this.neighbors(current.x,current.y)){
        if(!this.inside(next.x,next.y)){continue}
        const terrainType=this.map[next.y][next.x];
        if(!this.canEnterTerrain(unit,terrainType)){continue}
        const block=this.unitAt(next.x,next.y);
        if(block!==null&&!(next.x===unit.x&&next.y===unit.y)){continue}
        const nextCost=current.c+this.terrainMoveCost(unit,terrainType);
        if(nextCost>unit.move){continue}
        const nextKey=this.key(next.x,next.y);
        const oldCost=costs.has(nextKey)?costs.get(nextKey):Number.POSITIVE_INFINITY;
        if(nextCost<oldCost){
          costs.set(nextKey,nextCost);
          parents.set(nextKey,{x:current.x,y:current.y});
          open.push({x:next.x,y:next.y,c:nextCost})
        }
      }
    }

    if(!costs.has(targetKey)){return[]}
    const path=[];
    let current={x:targetX,y:targetY};
    while(this.key(current.x,current.y)!==startKey){
      path.push(current);
      const parent=parents.get(this.key(current.x,current.y));
      if(parent===undefined){return[]}
      current=parent
    }
    return path.reverse()
  }

  firstActiveTrapOnPath(unit,path){
    if(unit.team!=="player"||unit.knowsZhujiaTraps){return null}
    for(const step of path){
      const trap=this.hiddenTraps.find(candidate=>candidate.active&&candidate.x===step.x&&candidate.y===step.y);
      if(trap!==undefined){return trap}
    }
    return null
  }

  async resolveHiddenTrap(unit,trap,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    trap.active=false;
    const stage=this.stages[this.currentStage];
    const isSpellTrap=trap.type==="spell";
    const spellTrapNeutralized=isSpellTrap&&this.isIllusionUser(unit);

    unit.hasMoved=true;
    this.markUnitActionCompleted(unit);

    if(spellTrapNeutralized){
      this.addLog(`妖術罠が発動したが、${unit.name}は術理を見破って無効化した。罠はこの地点で消滅した。`);
      this.audio.confirm();
      this.selectedUnitId=null;
      this.pendingFacingUnitId=null;
      this.facingCanUndoMovement=false;
      this.previous=null;
      this.reachable.clear();
      this.mode="select";
      this.render();
      this.keepCellVisible(unit.x,unit.y);
      await this.showSpellTrapNeutralizedDialogue(unit);
      if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
      if(!this.finished){
        this.showInfo(unit,"妖術罠を無効化しました。ダメージ・幻術効果は受けず、この地点で行動終了。罠は消滅しました。")
      }
      this.render();
      return
    }

    const damage=trap.damage??(isSpellTrap?(stage.spellTrapDamage||10):(stage.trapDamage||20));
    const confusionTurns=trap.confusionTurns??(stage.trapConfusionTurns||1);
    const illusionTurns=trap.illusionTurns??(stage.spellTrapIllusionTurns||1);

    // 罠発動後、まず罠ダメージだけを独立して見せる。
    // この時点では状態異常をまだ付与せず、白発光・専用SE・数値が完了してから次の演出へ進む。
    this.selectedUnitId=null;
    this.pendingFacingUnitId=null;
    this.facingCanUndoMovement=false;
    this.previous=null;
    this.reachable.clear();
    this.mode="select";
    this.render();
    this.keepCellVisible(unit.x,unit.y);
    await this.showTrapDamageFeedback(unit,damage,sessionId);
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}

    // ダメージ数値が消えてから実ダメージを確定し、生存時だけ状態異常を付与する。
    this.applyDamage(unit,damage);

    if(unit.isAlive&&isSpellTrap){
      unit.illusionTurns=Math.max(unit.illusionTurns,illusionTurns);
      this.clearConfusionCoveredByIllusion(unit);
      this.addLog(`妖気が地より噴き上がった！ ${unit.name}は妖術罠に囚われ、${damage}ダメージと幻術${illusionTurns}ターンを受けて${trap.label}で移動を止めた。`)
    }else if(unit.isAlive){
      unit.confusedTurns=Math.max(unit.confusedTurns,confusionTurns);
      const trapName=stage.title.includes("第六章")?"祝家荘の罠":"高唐州軍の罠";
      this.addLog(`${trapName}が発動！ ${unit.name}は${damage}ダメージを受け、撹乱状態となって${trap.label}で移動を止めた。`)
    }else{
      const trapName=isSpellTrap?"妖術罠":(stage.title.includes("第六章")?"祝家荘の罠":"高唐州軍の罠");
      this.addLog(`${trapName}が発動！ ${unit.name}は${damage}ダメージを受けた。`)
    }

    this.render();
    this.keepCellVisible(unit.x,unit.y);

    // 現仕様の罠状態異常は1ターンのみ。ダメージ演出完了後に1回だけ状態異常演出を行う。
    if(unit.isAlive){
      if(isSpellTrap){
        // 妖術罠の幻術成立時も、通常幻術と同じ成功SEを鳴らしてから紫発光＋ドクロを表示する。
        this.audio.illusionSuccess();
        await Promise.all([
          this.flashUnit(unit,"illusion",sessionId),
          this.showNormalIllusionSkullEffect([unit],sessionId)
        ])
      }else{
        // 通常罠は現仕様どおり1ターン撹乱。
        // 計略と同じ成功SEを鳴らしてから共通処理へ入り、黄色発光と「？」の見た目も統一する。
        this.audio.confusionSuccess();
        await this.flashConfusionSuccessByTurns([unit],[],sessionId)
      }
    }

    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    this.checkResult();
    await this.showTrapReactionDialogue(unit,isSpellTrap,unit.isAlive);
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}

    if(!this.finished&&isSpellTrap&&!this.gaotangSpellTrapDialogueTriggered){
      this.gaotangSpellTrapDialogueTriggered=true;
      await this.showDialogueSequence([
        {unit:"gao_lian",text:"ククク……そこも我が妖陣の内よ。足を踏み入れた時点で、すでに我が術中に落ちておるわ！"},
        {unit:"gongsun_sheng_gaotang",text:"地脈に妖符が仕込まれています！　皆、平地とて油断せず、足元に注意してください！"}
      ]);
      if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    }

    if(!this.finished&&unit.isAlive){
      const statusText=isSpellTrap
        ?`妖術罠が発動しました。${damage}ダメージを受け、この地点で移動終了。幻術は次の自軍ターンに影響します。`
        :`隠し罠が発動しました。${damage}ダメージを受け、この地点で移動終了。撹乱は次の自軍ターンに影響します。`;
      this.showInfo(unit,statusText)
    }else if(!this.finished){
      this.showBlankInfo()
    }
    this.render()
  }

  async activateZhujiaBetrayal(stage){
    const event=stage.zhujiaBetrayal;
    if(event===undefined||this.zhujiaBetrayalTriggered){return}
    this.zhujiaBetrayalTriggered=true;

    const joined=[];
    for(const id of event.units||[]){
      const unit=this.units.find(candidate=>candidate.id===id);
      if(unit===undefined||!unit.isAlive){continue}
      unit.team="player";
      unit.stationary=false;
      unit.stationaryLabel="";
      unit.knowsZhujiaTraps=true;
      unit.facing="north";
      this.resetUnitActionForTurn(unit);
      joined.push(unit)
    }

    let namedCount=0;
    let mobCount=0;
    for(const enemy of this.alive("enemy")){
      enemy.confusedTurns=Math.max(enemy.confusedTurns,1);
      if(enemy.isMob){mobCount++}else{namedCount++}
    }

    this.addLog(`呉用の合図で孫立ら${joined.length}人が寝返った！`);
    this.addLog(`祝家荘軍は内応に動揺。固有人物${namedCount}隊・モブ${mobCount}隊は全員1ターン撹乱。`);
    this.render();
    await this.showDialogueSequence(event.dialogue||[]);
    this.showBlankInfo();
    this.render()
  }

  async activateZengtouBetrayal(stage){
    const event=stage.zengtouBetrayal;
    if(event===undefined||this.zengtouBetrayalTriggered){return}
    this.zengtouBetrayalTriggered=true;

    const unit=this.units.find(candidate=>candidate.id===event.unitId);
    if(unit===undefined||!unit.isAlive){
      this.addLog("郁保四はすでに戦線を離れており、寝返りは起こらなかった。");
      this.render();
      return
    }

    unit.team="player";
    unit.stationary=false;
    unit.stationaryLabel="";
    this.resetUnitActionForTurn(unit);

    this.addLog("第6自軍ターン、郁保四が曾頭市軍を離れ梁山泊へ寝返った！");
    this.render();
    await this.showDialogueSequence(event.dialogue||[]);
    this.showBlankInfo();
    this.render()
  }

  troopAttackBonus(a){
    return Math.floor(a.hp*(a.martial+100)*(a.command+100)/100000)
  }

  /**
   * 防御側統率による基礎ダメージ減算値を算出する。
   * @param {number} command 防御側統率
   * @returns {number} 減算値
   */
  commandDefenseReduction(command){
    return Math.round(command*2/3)
  }

  terrainDamageReduction(rawDamage,terrain){
    const rateReduction=Math.round(rawDamage*terrain.damageRate);
    return Math.max(rateReduction,terrain.damageFixed)
  }

  terrainAttackPenalty(rawDamage,unit,type){
    if(type!=="swamp"||this.hasWaterTerrainAffinity(unit)){return 0}
    const terrain=this.terrainData[type];
    return Math.max(Math.round(rawDamage*(terrain.attackPenaltyRate||0)),terrain.attackPenaltyFixed||0)
  }

  terrainDefenseAdjustment(rawDamage,unit,type){
    const terrain=this.terrainData[type];
    if(type==="swamp"&&!this.hasWaterTerrainAffinity(unit)){
      const penalty=Math.max(Math.round(rawDamage*(terrain.defensePenaltyRate||0)),terrain.defensePenaltyFixed||0);
      return -penalty
    }
    return this.terrainDamageReduction(rawDamage,terrain)
  }

  /**
   * 連環馬固有の地形依存ダメージ補正を適用する。
   * 平地・道では重装騎兵として被ダメージ20%軽減。
   * 湿地では既存の湿地補正に加え、攻撃側なら与ダメージ30%低下、防御側なら被ダメージ20%増加。
   * 森・丘・山岳では連環馬固有補正を行わない。
   * @param {Unit} attacker 攻撃側
   * @param {Unit} defender 防御側
   * @param {number} damage 補正前ダメージ
   * @returns {number} 連環馬補正後ダメージ
   */
  applyChainCavalryDamageModifiers(attacker,defender,damage){
    let adjustedDamage=Math.max(1,damage);
    const attackerType=this.map[attacker.y][attacker.x];
    const defenderType=this.map[defender.y][defender.x];

    if(this.hasChainCavalry(attacker)&&attackerType==="swamp"){
      adjustedDamage=Math.max(1,Math.round(adjustedDamage*.70))
    }

    if(this.hasChainCavalry(defender)){
      if(defenderType==="plain"||defenderType==="road"){
        adjustedDamage=Math.max(1,Math.round(adjustedDamage*.80))
      }else if(defenderType==="swamp"){
        adjustedDamage=Math.max(1,Math.round(adjustedDamage*1.20))
      }
    }

    return adjustedDamage
  }

  /**
   * 攻撃種別に依存しない共通ダメージを計算する。
   * @param {Unit} attacker 攻撃側
   * @param {Unit} defender 防御側
   * @param {number} directionRate 方向補正
   * @param {boolean} applyChainCavalry 連環馬固有補正もここで適用する場合true
   * @returns {number} 最終ダメージ
   */
  calculateDamage(attacker,defender,directionRate,applyChainCavalry=true){
    const attackerType=this.map[attacker.y][attacker.x];
    const defenderType=this.map[defender.y][defender.x];
    const attackerTerrain=this.terrainData[attackerType];
    const abilityDifference=attacker.martial-this.commandDefenseReduction(defender.command);
    const troopBonus=this.troopAttackBonus(attacker);
    const randomBonus=Math.floor(this.randomFloat()*4);
    const baseDamage=Math.max(1,25+abilityDifference+troopBonus+attackerTerrain.attackBonus+randomBonus);
    const attackPenalty=this.terrainAttackPenalty(baseDamage,attacker,attackerType);
    const rawDamage=Math.max(1,baseDamage-attackPenalty);
    const terrainAdjustment=this.terrainDefenseAdjustment(rawDamage,defender,defenderType);
    const terrainAdjustedDamage=Math.max(1,rawDamage-terrainAdjustment);
    const directionAdjustedDamage=Math.max(1,Math.round(terrainAdjustedDamage*directionRate));
    return applyChainCavalry?this.applyChainCavalryDamageModifiers(attacker,defender,directionAdjustedDamage):directionAdjustedDamage
  }

  calculateNormalDamage(attacker,defender){
    return this.calculateDamage(attacker,defender,this.directionRate(attacker,defender))
  }

  calculateBowDamage(attacker,defender){
    return this.calculateDamage(attacker,defender,this.bowDirectionRate(attacker,defender))
  }

  calculateChargeDamage(attacker,defender){
    // 突撃倍率を出した後に連環馬補正を1回だけ適用し、固定+8部分も含めて20%軽減/増減を正確に反映する。
    const normalWithoutChain=this.calculateDamage(attacker,defender,this.directionRate(attacker,defender),false);
    const chargeDamage=Math.max(normalWithoutChain+8,Math.round(normalWithoutChain*1.65));
    return this.applyChainCavalryDamageModifiers(attacker,defender,chargeDamage)
  }

  strategyAreaCells(center,level){
    if(center===null||center===undefined){return []}

    const radius=Math.max(0,level-1);
    const cells=[];

    for(let y=0;y<this.height;y++){
      for(let x=0;x<this.width;x++){
        if(Math.abs(x-center.x)+Math.abs(y-center.y)<=radius){
          cells.push({x,y})
        }
      }
    }

    return cells
  }

  /**
   * 盤面座標に対応するセルを返す。
   * @returns {Element|null}
   */
  boardCellAt(x,y){
    if(!this.inside(x,y)){return null}
    return this.board.children[y*this.width+x]||null
  }

  /**
   * 部隊が表示されている盤面セルを返す。
   * 再描画直後などdatasetを利用できる場合も、座標を基準に一貫して取得する。
   * @returns {Element|null}
   */
  boardCellForUnit(unit){
    if(unit===null||unit===undefined){return null}
    const coordinateCell=this.boardCellAt(unit.x,unit.y);
    if(coordinateCell!==null){return coordinateCell}
    for(const candidate of this.board.children){
      if(candidate.dataset.unitId===unit.id){return candidate}
    }
    return null
  }

  async showChargeDustEffect(target,duration=BATTLE_EFFECT_TIMING.CHARGE_DUST_MS,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    const cell=this.boardCellForUnit(target);
    if(cell===null){return}

    const effect=document.createElement("img");
    effect.className="charge-dust-effect";
    effect.src=this.chargeDustEffectDataUrl;
    effect.alt="";
    effect.draggable=false;
    effect.setAttribute("aria-hidden","true");
    cell.appendChild(effect);
    this.suppressSelectionRing();

    try{
      await this.wait(duration)
    }finally{
      effect.remove();
      if(sessionId===null||this.isBattleSessionActive(sessionId)){this.restoreSelectionRing()}
    }
  }

  /**
   * 火計発動時、中心対象上へ大きな爆炎を1つだけ表示する。
   * 爆炎素材1周と専用SEを完了してから従来の計略範囲発光へ進む。
   * @param {Unit} centerUnit 火計の中心対象
   * @param {number|null} sessionId 戦闘セッションID
   */
  async showFireTacticBurstEffect(centerUnit,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(centerUnit===null||centerUnit===undefined){return}
    const centerCell=this.boardCellForUnit(centerUnit);
    if(centerCell===null){return}

    const effect=document.createElement("img");
    effect.className="fire-tactic-burst-effect";
    effect.src=FIRE_TACTIC_BURST_DATA_URL;
    effect.alt="";
    effect.draggable=false;
    effect.setAttribute("aria-hidden","true");

    const size=Math.max(centerCell.offsetWidth,centerCell.offsetHeight)*1.8*1.25;
    effect.style.left=`${centerCell.offsetLeft+centerCell.offsetWidth/2}px`;
    effect.style.top=`${centerCell.offsetTop+centerCell.offsetHeight/2}px`;
    effect.style.width=`${size}px`;
    effect.style.height=`${size}px`;

    this.board.appendChild(effect);
    this.suppressSelectionRing();
    this.audio.fireTactic();

    try{
      await this.wait(BATTLE_EFFECT_TIMING.FIRE_TACTIC_BURST_MS)
    }finally{
      effect.remove();
      if(sessionId===null||this.isBattleSessionActive(sessionId)){
        this.audio.stopFireTactic();
        this.restoreSelectionRing()
      }
    }
  }


  /**
   * 水計発動時、中心対象上へ大きな水しぶきを1つだけ表示する。
   * 水計専用SEと同期して表示し、表示後に従来の計略範囲発光へ進む。
   * @param {Unit} centerUnit 水計の中心対象
   * @param {number|null} sessionId 戦闘セッションID
   */
  async showWaterTacticBurstEffect(centerUnit,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(centerUnit===null||centerUnit===undefined){return}
    const centerCell=this.boardCellForUnit(centerUnit);
    if(centerCell===null){return}

    const effect=document.createElement("img");
    effect.className="water-tactic-burst-effect";
    effect.src=WATER_TACTIC_BURST_DATA_URL;
    effect.alt="";
    effect.draggable=false;
    effect.setAttribute("aria-hidden","true");

    const baseSize=Math.max(centerCell.offsetWidth,centerCell.offsetHeight);
    effect.style.left=`${centerCell.offsetLeft+centerCell.offsetWidth/2}px`;
    effect.style.top=`${centerCell.offsetTop+centerCell.offsetHeight/2}px`;
    effect.style.width=`${baseSize*2.35*1.25}px`;
    effect.style.height=`${baseSize*1.72*1.25}px`;

    this.board.appendChild(effect);
    this.suppressSelectionRing();
    this.audio.waterTactic();

    try{
      await this.wait(BATTLE_EFFECT_TIMING.WATER_TACTIC_BURST_MS)
    }finally{
      effect.remove();
      if(sessionId===null||this.isBattleSessionActive(sessionId)){
        this.audio.stopWaterTactic();
        this.restoreSelectionRing()
      }
    }
  }

  async flashStrategyCells(user,center,level,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    const cells=this.strategyAreaCells(center,level).filter(position=>
      this.map[position.y][position.x]!=="wall"&&this.hasClearLineOfSight(user,position)
    );
    const effects=[];

    for(const position of cells){
      const index=position.y*this.width+position.x;
      const cell=this.board.children[index];
      if(cell===undefined){continue}

      const effect=document.createElement("div");
      effect.className="strategy-cast-cell-flash";
      effect.setAttribute("aria-hidden","true");
      cell.appendChild(effect);
      effects.push(effect)
    }

    if(effects.length===0){return}
    this.suppressSelectionRing();
    try{
      await this.wait(BATTLE_EFFECT_TIMING.STRATEGY_CAST_FLASH_MS)
    }finally{
      for(const effect of effects){effect.remove()}
      if(sessionId===null||this.isBattleSessionActive(sessionId)){this.restoreSelectionRing()}
    }
  }

  async showWideIllusionOverlay(centerUnit,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(centerUnit===null||centerUnit===undefined){return}
    const centerCell=this.boardCellForUnit(centerUnit);
    if(centerCell===null){return}

    const overlay=document.createElement("div");
    overlay.className="wide-illusion-overlay";
    overlay.setAttribute("aria-hidden","true");
    overlay.style.left=`${centerCell.offsetLeft-centerCell.offsetWidth*3}px`;
    overlay.style.top=`${centerCell.offsetTop-centerCell.offsetHeight*3}px`;
    overlay.style.width=`${centerCell.offsetWidth*7}px`;
    overlay.style.height=`${centerCell.offsetHeight*7}px`;

    const mist=document.createElement("img");
    mist.className="wide-illusion-mist";
    mist.src=this.wideIllusionMistDataUrl;
    mist.alt="";
    mist.draggable=false;

    const skeleton=document.createElement("img");
    skeleton.className="wide-illusion-skeleton";
    skeleton.src=this.wideIllusionSkeletonDataUrl;
    skeleton.alt="";
    skeleton.draggable=false;

    overlay.appendChild(mist);
    overlay.appendChild(skeleton);
    this.board.appendChild(overlay);
    this.suppressSelectionRing();

    const startSoundPromise=this.wait(300).then(()=>{
      if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
      this.audio.wideIllusionStart()
    });

    try{
      await this.wait(BATTLE_EFFECT_TIMING.WIDE_ILLUSION_OVERLAY_MS);
      await startSoundPromise
    }finally{
      overlay.remove();
      if(sessionId===null||this.isBattleSessionActive(sessionId)){this.restoreSelectionRing()}
    }
  }

  /**
   * 幻術成功時の紫発光を再生する。
   * 1ターン成功は1回、今回2ターン成功した対象だけ2回目を追加する。
   * 通常幻術・広域幻術の両方で使用する。
   * @param {Array} units 幻術成功対象部隊
   * @param {Array} twoTurnUnits 今回2ターン成功した対象部隊
   * @param {number|null} sessionId 戦闘セッションID
   */
  async flashIllusionSuccessByTurns(units,twoTurnUnits,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    await this.flashUnits(units,"illusion",sessionId);
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if((twoTurnUnits||[]).length>0){
      await this.flashUnits(twoTurnUnits,"illusion",sessionId)
    }
  }

  /**
   * 撹乱成功時の黄色発光を再生する。
   * 1ターン成功は1回、今回2ターン成功した対象だけ2回目を追加する。
   * @param {Array} units 撹乱成功対象部隊
   * @param {Array} twoTurnUnits 今回2ターン成功した対象部隊
   * @param {number|null} sessionId 戦闘セッションID
   */
  async flashConfusionSuccessByTurns(units,twoTurnUnits,sessionId=null){
    try{
      if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
      const flashPromise=(async()=>{
        await this.flashUnits(units,"confusion",sessionId);
        if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
        if((twoTurnUnits||[]).length>0){
          await this.flashUnits(twoTurnUnits,"confusion",sessionId)
        }
      })();
      await Promise.all([
        flashPromise,
        this.showConfusionSymbolEffect(units,twoTurnUnits,sessionId)
      ])
    }finally{
      // 旧戦闘の完了処理から、新戦闘で再生中の撹乱成功SEを停止しない。
      if(sessionId===null||this.isBattleSessionActive(sessionId)){this.audio.stopConfusionSuccess()}
    }
  }

  /**
   * 撹乱成功時の個別記号を表示する。
   * 1ターン成功は1.5倍の「？」、2ターン成功は「！」とし、どちらも対象セル中央から半マス上へ移動する。
   * セル境界で切れないよう、記号はセル内ではなく盤面オーバーレイとして配置する。
   * @param {Array} units 撹乱成功対象部隊
   * @param {Array} twoTurnUnits 今回2ターン成功した対象部隊
   * @param {number|null} sessionId 戦闘セッションID
   */
  async showConfusionSymbolEffect(units,twoTurnUnits=[],sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    const twoTurnIds=new Set((twoTurnUnits||[]).map(unit=>unit.id));
    const unique=[];
    for(const unit of units||[]){
      if(unit===null||unit===undefined||unique.some(item=>item.id===unit.id)){continue}
      unique.push(unit)
    }

    const effects=[];
    for(const unit of unique){
      const cell=this.boardCellForUnit(unit);
      if(cell===null){continue}

      const isTwoTurn=twoTurnIds.has(unit.id);
      const effect=document.createElement("img");
      effect.className="confusion-symbol-effect";
      effect.src=isTwoTurn?CONFUSION_ALERT_DATA_URL:CONFUSION_QUESTION_DATA_URL;
      effect.alt="";
      effect.draggable=false;
      effect.setAttribute("aria-hidden","true");

      // 「？」素材は透明余白が大きいため1.5倍表示。「！」は従来サイズを維持する。
      const symbolScale=isTwoTurn?1:1.5;
      effect.style.left=`${cell.offsetLeft+(cell.offsetWidth/2)}px`;
      effect.style.top=`${cell.offsetTop+(cell.offsetHeight/2)}px`;
      effect.style.width=`${cell.offsetWidth*symbolScale}px`;
      effect.style.height=`${cell.offsetHeight*symbolScale}px`;

      // 画像サイズに依存させず、どちらの記号も正確に半マス分だけ上へ移動する。
      effect.style.setProperty("--confusion-rise-distance",`${-(cell.offsetHeight/2)}px`);
      this.board.appendChild(effect);
      effects.push(effect)
    }

    if(effects.length===0){return}
    this.suppressSelectionRing();
    try{
      await this.wait(BATTLE_EFFECT_TIMING.CONFUSION_SYMBOL_MS)
    }finally{
      for(const effect of effects){effect.remove()}
      if(sessionId===null||this.isBattleSessionActive(sessionId)){this.restoreSelectionRing()}
    }
  }

  /**
   * 単体幻術または妖術罠で幻術が成立した対象部隊へドクロを表示する。
   * 広域幻術では呼び出さない。
   * @param {Array} units 対象部隊
   * @param {number|null} sessionId 戦闘セッションID
   */
  async showNormalIllusionSkullEffect(units,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    const unique=[];
    for(const unit of units||[]){
      if(unit===null||unit===undefined||unique.some(item=>item.id===unit.id)){continue}
      unique.push(unit)
    }

    const effects=[];
    for(const unit of unique){
      const cell=this.boardCellForUnit(unit);
      if(cell===null){continue}

      const effect=document.createElement("img");
      effect.className="normal-illusion-skull-effect";
      effect.src=NORMAL_ILLUSION_SKULL_DATA_URL;
      effect.alt="";
      effect.draggable=false;
      effect.setAttribute("aria-hidden","true");
      cell.appendChild(effect);
      effects.push(effect)
    }

    if(effects.length===0){return}
    this.suppressSelectionRing();
    try{
      await this.wait(BATTLE_EFFECT_TIMING.NORMAL_ILLUSION_SKULL_MS)
    }finally{
      for(const effect of effects){effect.remove()}
      if(sessionId===null||this.isBattleSessionActive(sessionId)){this.restoreSelectionRing()}
    }
  }

  async flashUnits(units,type,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    const unique=[];
    for(const unit of units||[]){
      if(unit===null||unit===undefined||unique.some(item=>item.id===unit.id)){continue}
      unique.push(unit)
    }

    const effects=[];
    for(const unit of unique){
      const cell=this.boardCellForUnit(unit);
      if(cell===null){continue}

      const marker=cell.querySelector(".troop-marker");
      if(marker===null){continue}

      const effect=marker.cloneNode(true);
      effect.classList.add("unit-effect-clone",`unit-effect-${type}`);
      effect.setAttribute("aria-hidden","true");
      cell.appendChild(effect);
      effects.push(effect)
    }

    if(effects.length===0){return}
    this.suppressSelectionRing();
    try{
      await this.wait(BATTLE_EFFECT_TIMING.UNIT_FLASH_MS)
    }finally{
      for(const effect of effects){effect.remove()}
      if(sessionId===null||this.isBattleSessionActive(sessionId)){this.restoreSelectionRing()}
    }
  }

  async flashUnit(unit,type,sessionId=null){
    await this.flashUnits([unit],type,sessionId)
  }

  async showDamagePopup(unit,damage,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(unit===null||unit===undefined||!Number.isFinite(damage)||damage<=0){return}
    const cell=this.boardCellForUnit(unit);
    if(cell===null){return}

    const popup=document.createElement("div");
    popup.className="damage-popup";
    popup.textContent=String(Math.max(0,Math.round(damage)));
    popup.setAttribute("aria-hidden","true");
    cell.appendChild(popup);

    try{
      await this.wait(BATTLE_EFFECT_TIMING.DAMAGE_POPUP_MS)
    }finally{
      popup.remove()
    }
  }

  /**
   * 罠ダメージ専用の被弾演出を再生する。
   * 白発光・専用SE・ダメージ数値を同時に開始し、数値が消えるまで待機する。
   * @param {object} unit 対象部隊
   * @param {number} damage ダメージ値
   * @param {number|null} sessionId 戦闘セッションID
   */
  async showTrapDamageFeedback(unit,damage,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(unit===null||unit===undefined||!Number.isFinite(damage)||damage<=0){return}
    this.audio.trapDamage();
    await Promise.all([
      this.flashUnit(unit,"hit",sessionId),
      this.showDamagePopup(unit,damage,sessionId)
    ])
  }

  async showDamageFeedback(unit,damage,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    await Promise.all([
      this.flashUnit(unit,"hit",sessionId),
      this.showDamagePopup(unit,damage,sessionId)
    ])
  }

  applyDamage(target,damage){
    target.hp=Math.max(0,target.hp-damage);
    if(target.hp===0){
      target.isAlive=false;
      if(target.id==="convoy_cart"){
        this.addLog("生辰綱の護送車部隊を撃破し、護送車を制圧した。")
      }else if(target.id==="shi_wengong"){
        this.addLog("史文恭を撃破。盧俊義が退路を断ち、生け捕りにした。")
      }else if(this.stages[this.currentStage]?.id==="gaotang-prefecture"&&target.id==="gongsun_sheng_gaotang"){
        this.addLog("公孫勝は敗走した。高廉の広域幻術を封じる手段を失い、以後は高廉が広域幻術を使用しても回数を消費しない。")
      }else{
        this.addLog(`${target.name}は敗走した。`)
      }
    }
  }

  attack(a,d,actionLabel="攻撃"){
    const attackerType=this.map[a.y][a.x];
    const defenderType=this.map[d.y][d.x];
    const attackerTerrain=this.terrainData[attackerType];
    const defenderTerrain=this.terrainData[defenderType];
    const directionRate=this.directionRate(a,d);
    const damage=this.calculateNormalDamage(a,d);
    this.applyDamage(d,damage);
    this.audio.attack(!a.isMob);

    const notes=[];
    if(this.hasShieldSkill(d)){
      notes.push(directionRate===.65?"盾牌・正面":directionRate===1.15?"盾牌・背面":"盾牌・側面")
    }else{
      notes.push(directionRate===1.2?"背面":directionRate===.8?"正面":"側面")
    }
    if(attackerType==="swamp"&&!this.hasWaterTerrainAffinity(a)){
      notes.push(this.hasChainCavalry(a)?"湿地・連環馬不利":"湿地不利")
    }
    if(defenderType==="swamp"&&!this.hasWaterTerrainAffinity(d)){
      notes.push(this.hasChainCavalry(d)?"湿地・連環馬不利":"湿地不利")
    }else if(this.hasChainCavalry(d)&&(defenderType==="plain"||defenderType==="road")){
      notes.push("連環馬防御")
    }else if(defenderTerrain.damageRate>0){
      notes.push(`${defenderTerrain.name}防御`)
    }
    if(attackerTerrain.attackBonus>0){notes.push("高所攻撃")}

    this.addLog(`${a.name}の${actionLabel}！ ${d.name}に${damage}ダメージ［${notes.join("／")}］。`)
    return damage
  }

  directionRate(a,d){
    const from=this.direction(d.x,d.y,a.x,a.y);
    if(this.hasShieldSkill(d)){
      if(from===d.facing){return .65}
      if(from===this.opposite(d.facing)){return 1.15}
      return .90
    }
    if(from===d.facing){return .8}
    if(from===this.opposite(d.facing)){return 1.2}
    return 1
  }
  directionLabel(rate){
    if(rate===1.15){return "盾牌背面115%"}
    if(rate===.90){return "盾牌側面90%"}
    if(rate===.65){return "盾牌正面65%"}
    return rate===1.2?"背面120%":rate===.8?"正面80%":"側面100%"
  }
  bowDirectionRate(a,d){
    if(this.hasShieldSkill(d)){return .60}
    const from=this.direction(d.x,d.y,a.x,a.y);
    return from===d.facing?.8:1
  }
  bowDirectionLabel(a,d){
    if(this.hasShieldSkill(d)){return "盾牌防御"}
    const from=this.direction(d.x,d.y,a.x,a.y);
    if(from===d.facing){return "正面"}
    if(from===this.opposite(d.facing)){return "背面"}
    return "側面"
  }

  checkResult(){
    if(this.finishing||this.finished){return}
    const s=this.stages[this.currentStage];
    const leader=this.units.find(u=>u.id===s.leader);

    if(leader===undefined||!leader.isAlive){
      this.finish(false);
      return
    }

    const requiredSurvivors=(s.requiredSurvivors||[]).map(id=>this.units.find(unit=>unit.id===id));
    if(requiredSurvivors.some(unit=>unit===undefined||!unit.isAlive)){
      this.finish(false);
      return
    }

    if(s.battleType==="raid_escape"){
      if(!this.stageEventTriggered&&this.raidInitialEnemiesDefeated(s)){
        this.activateRaidEscape(s);

        if(
          this.phase==="player"&&
          !this.raidReinforcementSpawned&&
          s.raidReinforcementTurn!==undefined&&
          this.turn>=s.raidReinforcementTurn
        ){
          this.pendingStageEvent="raid_reinforcement"
        }
      }
      if(!this.stageEventTriggered){return}
      const required=(this.activeEscape.required||[]).map(id=>this.units.find(unit=>unit.id===id));
      if(required.some(unit=>unit===undefined||!unit.isAlive)){
        this.finish(false);
        return
      }
      // v9.5.9：第三章は追捕軍出現後、敵軍を殲滅しても勝利。
      // 初期護送隊の全滅直後（追捕軍出現前）には殲滅勝利とせず、従来どおり脱出段階へ移行する。
      if(this.raidReinforcementSpawned&&this.alive("enemy").length===0){
        this.finish(true);
        return
      }
      if(required.every(unit=>this.isInEscapeZone(unit,this.activeEscape))){
        this.finish(true)
      }
      return
    }

    if(s.battleType==="escape"){
      const requiredIds=this.activeEscape.required||[];
      const pendingReinforcementIds=new Set(
        s.turnReinforcement!==undefined&&!this.turnReinforcementTriggered
          ?(s.turnReinforcement.units||[]).map(unit=>unit.id)
          :[]
      );
      const required=requiredIds.map(id=>this.units.find(unit=>unit.id===id));
      const hasDefeatedRequired=required.some((unit,index)=>{
        if(unit!==undefined){return !unit.isAlive}
        return !pendingReinforcementIds.has(requiredIds[index])
      });
      if(hasDefeatedRequired){
        this.finish(false);
        return
      }
      // v9.5.10：指定された脱出ステージは、必要生存者を守ったうえで敵軍全滅でも勝利。
      if(s.allowAnnihilationVictory&&this.alive("enemy").length===0){
        this.finish(true);
        return
      }
      if(required.every(unit=>unit!==undefined&&this.isInEscapeZone(unit,this.activeEscape))){
        this.finish(true)
      }
      return
    }

    if(Array.isArray(s.victoryTargets)){
      const targets=s.victoryTargets.map(id=>this.units.find(unit=>unit.id===id));
      if(targets.length>0&&targets.every(unit=>unit!==undefined&&!unit.isAlive)){
        this.finish(true)
      }
      return
    }

    if(this.alive("enemy").length===0){this.finish(true)}
  }

  async activateTurnReinforcement(stage,event=stage.turnReinforcement){
    if(event===undefined||this.turnReinforcementTriggered){return}

    this.turnReinforcementTriggered=true;
    this.turnReinforcementResult={spawnedUnitIds:[],failedUnitIds:[]};
    let spawned=0;
    for(const data of event.units||[]){
      const unit=new Unit({...data});
      const position=this.findOpenCellNear(unit.x,unit.y,unit);
      if(position===null){
        this.turnReinforcementResult.failedUnitIds.push(unit.id);
        continue
      }
      unit.x=position.x;
      unit.y=position.y;
      this.units.push(unit);
      this.turnReinforcementResult.spawnedUnitIds.push(unit.id);
      spawned++
    }

    this.addLog(`${event.name||"味方救援隊"}が到着。味方${spawned}部隊が戦場へ加わった。`);
    this.audio.confirm();
    this.render();
    await this.showDialogueSequence(event.dialogue||[]);
    if(!this.finished){
      this.showBlankInfo();
      this.render()
    }
  }

  raidInitialEnemiesDefeated(stage){
    const initialEnemyIds=(stage.raidInitialEnemyIds||stage.units.filter(unit=>unit.team==="enemy").map(unit=>unit.id));
    return initialEnemyIds.every(id=>{
      const unit=this.units.find(candidate=>candidate.id===id);
      return unit!==undefined&&!unit.isAlive
    })
  }

  activateRaidEscape(stage){
    if(this.stageEventTriggered){return}
    this.stageEventTriggered=true;
    this.pendingStageEvent=null;
    this.activeEscape={...stage.escapeAfterRaid};
    this.currentObjective=stage.escapeObjective;
    this.addLog("護送車を含む初期護送部隊を全滅！　生辰綱を奪取した。");
    this.addLog("任務更新：晁蓋を北端の湿地に出現した旗まで脱出させてください。");
    this.audio.confirm();
    this.render()
  }

  async processPendingStageEvent(sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(this.pendingStageEvent!=="raid_reinforcement"){return}

    this.pendingStageEvent=null;
    const stage=this.stages[this.currentStage];

    if(
      stage.battleType==="raid_escape"&&
      this.stageEventTriggered&&
      !this.raidReinforcementSpawned
    ){
      await this.activateRaidReinforcements(stage,"護送隊壊滅直後",sessionId)
    }
  }

  async activateRaidReinforcements(stage,timingLabel="",sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(this.raidReinforcementSpawned){return}
    this.raidReinforcementSpawned=true;
    this.spawnRaidReinforcements(stage);
    const timing=timingLabel||`第${this.turn}自軍ターン`;
    this.addLog(`${timing}。官軍の追捕隊が戦場へ到着した。`);
    this.audio.confirm();
    this.render();
    await this.showDialogueSequence(stage.raidArrivalDialogue||[]);
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return}
    if(!this.finished){
      this.showBlankInfo();
      this.render()
    }
  }

  spawnRaidReinforcements(stage){
    this.raidReinforcementResult={spawnedUnitIds:[],failedUnitIds:[]};
    for(const data of stage.raidReinforcements||[]){
      const unit=new Unit({...data});
      const position=this.findOpenCellNear(unit.x,unit.y,unit);
      if(position===null){
        this.raidReinforcementResult.failedUnitIds.push(unit.id);
        continue
      }
      unit.x=position.x;
      unit.y=position.y;
      this.units.push(unit);
      this.raidReinforcementResult.spawnedUnitIds.push(unit.id)
    }
  }

  findOpenCellNear(originX,originY,unit){
    for(let radius=0;radius<=4;radius++){
      for(let dy=-radius;dy<=radius;dy++){
        for(let dx=-radius;dx<=radius;dx++){
          if(Math.abs(dx)+Math.abs(dy)!==radius){continue}
          const x=originX+dx;
          const y=originY+dy;
          if(!this.inside(x,y)||this.unitAt(x,y)!==null){continue}
          const type=this.map[y][x];
          if(!this.canEnterTerrain(unit,type)){continue}
          return {x,y}
        }
      }
    }
    return null
  }

  isInEscapeZone(unit,escape){
    const radius=escape.radius||0;
    return Math.abs(unit.x-escape.x)+Math.abs(unit.y-escape.y)<=radius
  }

  removeVictoryEffect(){
    if(this.victoryEffectTapResolver!==null){
      const cancelTapWait=this.victoryEffectTapResolver;
      this.victoryEffectTapResolver=null;
      cancelTapWait()
    }
    if(this.victoryEffectElement!==null){
      this.victoryEffectElement.remove();
      this.victoryEffectElement=null
    }
    const staleEffect=document.getElementById("victoryEffect");
    if(staleEffect!==null){staleEffect.remove()}
  }

  /**
   * 全レイヤーの表示完了後にだけ、明示的なタップまたはキーボード操作を受け付ける。
   * @param {HTMLElement} effect 勝利演出のルート要素
   * @returns {Promise<boolean>} ユーザー操作ならtrue、戦闘切替による中止ならfalse
   */
  waitForVictoryEffectTap(effect){
    return new Promise(resolve=>{
      let settled=false;

      const cleanup=()=>{
        effect.removeEventListener("click",handleTap);
        effect.removeEventListener("keydown",handleKeydown);
        if(this.victoryEffectTapResolver===cancel){this.victoryEffectTapResolver=null}
      };
      const finish=accepted=>{
        if(settled){return}
        settled=true;
        cleanup();
        resolve(accepted)
      };
      const handleTap=event=>{
        if(!effect.classList.contains("is-ready")){return}
        event.preventDefault();
        finish(true)
      };
      const handleKeydown=event=>{
        if(event.key!=="Enter"&&event.key!==" "){return}
        event.preventDefault();
        if(!effect.classList.contains("is-ready")||event.repeat){return}
        finish(true)
      };
      const cancel=()=>{finish(false)};

      this.victoryEffectTapResolver=cancel;
      effect.addEventListener("click",handleTap);
      effect.addEventListener("keydown",handleKeydown)
    })
  }

  /**
   * 正式採用済み静止素材を4つの独立レイヤーとして順番に表示する。
   * 暗幕は初期表示し、全画像のフェード完了後はユーザーがタップするまで固定する。
   */
  async showVictoryEffect(sessionId){
    if(!this.isBattleSessionActive(sessionId)||!this.finished){return}
    this.removeVictoryEffect();

    const effect=document.createElement("div");
    effect.id="victoryEffect";
    effect.className="victory-effect";
    effect.setAttribute("role","button");
    effect.setAttribute("aria-live","assertive");
    effect.setAttribute("aria-label","勝利演出中。表示完了後に画面をタップして進みます");
    effect.setAttribute("aria-disabled","true");
    effect.tabIndex=0;

    const shade=document.createElement("div");
    shade.className="victory-effect-layer victory-effect-shade";
    shade.setAttribute("aria-hidden","true");

    const army=document.createElement("img");
    army.className="victory-effect-layer victory-effect-army";
    army.src=VICTORY_ARMY_DATA_URL;
    army.alt="";
    army.draggable=false;
    army.setAttribute("aria-hidden","true");

    const title=document.createElement("img");
    title.className="victory-effect-layer victory-effect-title";
    title.src=VICTORY_TITLE_STATIC_DATA_URL;
    title.alt="勝利";
    title.draggable=false;

    const rays=document.createElement("img");
    rays.className="victory-effect-layer victory-effect-rays";
    rays.src=VICTORY_RAYS_DATA_URL;
    rays.alt="";
    rays.draggable=false;
    rays.setAttribute("aria-hidden","true");

    const prompt=document.createElement("div");
    prompt.className="victory-effect-prompt";
    prompt.textContent="画面をタップして進む";
    prompt.setAttribute("aria-hidden","true");

    effect.append(shade,army,title,rays,prompt);
    this.victoryEffectElement=effect;
    document.body.appendChild(effect);
    effect.focus({preventScroll:true});
    this.audio.startVictoryThemeOnce().catch(error=>{
      console.error("[戦旗水滸伝] 勝利BGM再生エラー",error)
    });

    // フェード中のEnter/Spaceはブラウザ既定動作だけを抑止し、演出進行には使わない。
    const handlePreReadyKeydown=event=>{
      if(event.key!=="Enter"&&event.key!==" "){return}
      event.preventDefault()
    };
    effect.addEventListener("keydown",handlePreReadyKeydown);

    try{
      // 初期状態を一度描画してから将兵の5秒フェードを開始する。
      void effect.offsetWidth;
      effect.classList.add("is-army-visible");
      await this.wait(VICTORY_EFFECT_TIMING.ARMY_FADE_MS);
      if(!this.isBattleSessionActive(sessionId)||!this.finished){return}
      effect.classList.add("is-title-visible");
      await this.wait(VICTORY_EFFECT_TIMING.TITLE_FADE_MS);
      if(!this.isBattleSessionActive(sessionId)||!this.finished){return}
      effect.classList.add("is-rays-visible");
      await this.wait(VICTORY_EFFECT_TIMING.RAYS_FADE_MS);
      if(!this.isBattleSessionActive(sessionId)||!this.finished){return}

      effect.classList.add("is-ready");
      effect.removeEventListener("keydown",handlePreReadyKeydown);
      effect.setAttribute("aria-disabled","false");
      effect.setAttribute("aria-label","勝利。画面をタップして進む");
      prompt.setAttribute("aria-hidden","false");
      const accepted=await this.waitForVictoryEffectTap(effect);
      if(!accepted||!this.isBattleSessionActive(sessionId)||!this.finished){return}

      effect.classList.add("is-leaving");
      await this.wait(VICTORY_EFFECT_TIMING.EXIT_MS)
    }finally{
      effect.removeEventListener("keydown",handlePreReadyKeydown);
      effect.remove();
      if(this.victoryEffectElement===effect){this.victoryEffectElement=null}
    }
  }

  /**
   * 勝利演出、既存の勝利会話、結果画面を順番に進める。
   * 各演出の失敗は後続へ波及させず、同じ戦闘セッションだけを更新する。
   */
  async showVictoryResultSequence(sessionId){
    try{
      try{
        await this.showVictoryEffect(sessionId)
      }catch(error){
        console.error("[戦旗水滸伝] 勝利演出エラー",error)
      }
      if(!this.isBattleSessionActive(sessionId)||!this.finished){return}
      try{
        await this.showDialogueSequence(this.stages[this.currentStage].victory||[])
      }catch(error){
        console.error("[戦旗水滸伝] 勝利会話処理エラー",error)
      }
    }finally{
      if(this.isBattleSessionActive(sessionId)&&this.finished){
        this.removeVictoryEffect();
        this.e("resultOverlay").classList.add("show")
      }
    }
  }

  removeDefeatEffect(){
    if(this.defeatEffectTapResolver!==null){
      const cancelTapWait=this.defeatEffectTapResolver;
      this.defeatEffectTapResolver=null;
      cancelTapWait()
    }
    if(this.defeatEffectElement!==null){
      this.defeatEffectElement.remove();
      this.defeatEffectElement=null
    }
    const staleEffect=document.getElementById("defeatEffect");
    if(staleEffect!==null){staleEffect.remove()}
  }

  /**
   * 敗北演出の全レイヤー表示完了後にだけ、明示的なタップまたはキーボード操作を受け付ける。
   * @param {HTMLElement} effect 敗北演出のルート要素
   * @returns {Promise<boolean>} ユーザー操作ならtrue、戦闘切替による中止ならfalse
   */
  waitForDefeatEffectTap(effect){
    return new Promise(resolve=>{
      let settled=false;

      const cleanup=()=>{
        effect.removeEventListener("click",handleTap);
        effect.removeEventListener("keydown",handleKeydown);
        if(this.defeatEffectTapResolver===cancel){this.defeatEffectTapResolver=null}
      };
      const finish=accepted=>{
        if(settled){return}
        settled=true;
        cleanup();
        resolve(accepted)
      };
      const handleTap=event=>{
        if(!effect.classList.contains("is-ready")){return}
        event.preventDefault();
        finish(true)
      };
      const handleKeydown=event=>{
        if(event.key!=="Enter"&&event.key!==" "){return}
        event.preventDefault();
        if(!effect.classList.contains("is-ready")||event.repeat){return}
        finish(true)
      };
      const cancel=()=>{finish(false)};

      this.defeatEffectTapResolver=cancel;
      effect.addEventListener("click",handleTap);
      effect.addEventListener("keydown",handleKeydown)
    })
  }

  /**
   * 暗幕、敗残将兵、静止「敗北」文字を独立した3レイヤーとして順番に表示する。
   * 全画像のフェード完了後はユーザーがタップするまで固定する。
   */
  async showDefeatEffect(sessionId){
    if(!this.isBattleSessionActive(sessionId)||!this.finished){return}
    this.removeDefeatEffect();

    const effect=document.createElement("div");
    effect.id="defeatEffect";
    effect.className="victory-effect defeat-effect";
    effect.setAttribute("role","button");
    effect.setAttribute("aria-live","assertive");
    effect.setAttribute("aria-label","敗北演出中。表示完了後に画面をタップして進みます");
    effect.setAttribute("aria-disabled","true");
    effect.tabIndex=0;

    const shade=document.createElement("div");
    shade.className="victory-effect-layer victory-effect-shade";
    shade.setAttribute("aria-hidden","true");

    const army=document.createElement("img");
    army.className="victory-effect-layer defeat-effect-army";
    army.src=DEFEAT_ARMY_DATA_URL;
    army.alt="";
    army.draggable=false;
    army.setAttribute("aria-hidden","true");

    const title=document.createElement("img");
    title.className="victory-effect-layer defeat-effect-title";
    title.src=DEFEAT_TITLE_DATA_URL;
    title.alt="敗北";
    title.draggable=false;

    const prompt=document.createElement("div");
    prompt.className="victory-effect-prompt";
    prompt.textContent="画面をタップして進む";
    prompt.setAttribute("aria-hidden","true");

    effect.append(shade,army,title,prompt);
    this.defeatEffectElement=effect;
    document.body.appendChild(effect);
    effect.focus({preventScroll:true});
    this.audio.stopBattleMusicForResult(.35);
    this.audio.startDefeatThemeOnce().catch(error=>{
      console.error("[戦旗水滸伝] 敗北BGM再生エラー",error)
    });

    // フェード中のEnter/Spaceはブラウザ既定動作だけを抑止し、演出進行には使わない。
    const handlePreReadyKeydown=event=>{
      if(event.key!=="Enter"&&event.key!==" "){return}
      event.preventDefault()
    };
    effect.addEventListener("keydown",handlePreReadyKeydown);

    try{
      // 暗幕を初期表示し、一度描画してから敗残将兵の5秒フェードを開始する。
      void effect.offsetWidth;
      effect.classList.add("is-army-visible");
      await this.wait(DEFEAT_EFFECT_TIMING.ARMY_FADE_MS);
      if(!this.isBattleSessionActive(sessionId)||!this.finished){return}
      effect.classList.add("is-title-visible");
      await this.wait(DEFEAT_EFFECT_TIMING.TITLE_FADE_MS);
      if(!this.isBattleSessionActive(sessionId)||!this.finished){return}

      effect.classList.add("is-ready");
      effect.removeEventListener("keydown",handlePreReadyKeydown);
      effect.setAttribute("aria-disabled","false");
      effect.setAttribute("aria-label","敗北。画面をタップして進む");
      prompt.setAttribute("aria-hidden","false");
      const accepted=await this.waitForDefeatEffectTap(effect);
      if(!accepted||!this.isBattleSessionActive(sessionId)||!this.finished){return}

      effect.classList.add("is-leaving");
      await this.wait(DEFEAT_EFFECT_TIMING.EXIT_MS)
    }finally{
      effect.removeEventListener("keydown",handlePreReadyKeydown);
      effect.remove();
      if(this.defeatEffectElement===effect){this.defeatEffectElement=null}
    }
  }

  /**
   * 敗北演出の終了後に、既存の敗北結果画面を表示する。
   */
  async showDefeatResultSequence(sessionId){
    try{
      try{
        await this.showDefeatEffect(sessionId)
      }catch(error){
        console.error("[戦旗水滸伝] 敗北演出エラー",error)
      }
    }finally{
      if(this.isBattleSessionActive(sessionId)&&this.finished){
        this.removeDefeatEffect();
        this.e("resultOverlay").classList.add("show")
      }
    }
  }

  finish(win){
    if(this.finishing||this.finished){return}
    this.clearRecoverySnapshot();
    this.finishing=true;
    this.finished=true;
    this.audio.stopBattleTransientAudio();
    this.phase="finished";
    this.locked=true;
    this.e("resultTitle").textContent=win?"勝利":"敗北";
    this.e("resultMessage").textContent=win?`${this.stages[this.currentStage].title}を攻略しました。`:`${this.stages[this.currentStage].title}で敗北しました。`;
    this.e("nextStageButton").style.display=win&&this.currentStage<this.stages.length-1?"block":"none";

    if(win){
      const sessionId=this.battleSessionId;
      this.showVictoryResultSequence(sessionId)
    }else{
      const sessionId=this.battleSessionId;
      this.showDefeatResultSequence(sessionId)
    }
  }

  calcReachable(u){
    const costs=new Map(),q=[{x:u.x,y:u.y,c:0}];costs.set(this.key(u.x,u.y),0);
    while(q.length){q.sort((a,b)=>a.c-b.c);const cur=q.shift();for(const n of this.neighbors(cur.x,cur.y)){
      if(!this.inside(n.x,n.y)){continue}const terrainType=this.map[n.y][n.x],tr=this.terrainData[terrainType];if(!this.canEnterTerrain(u,terrainType)){continue}const block=this.unitAt(n.x,n.y);if(block!==null&&!(n.x===u.x&&n.y===u.y)){continue}
      const nc=cur.c+this.terrainMoveCost(u,terrainType);if(nc>u.move){continue}const k=this.key(n.x,n.y),old=costs.has(k)?costs.get(k):999;if(nc<old){costs.set(k,nc);q.push({x:n.x,y:n.y,c:nc})}
    }}costs.delete(this.key(u.x,u.y));return costs
  }

  pathToCell(u,targetX,targetY){
    if(!this.inside(targetX,targetY)){return[]}
    if(targetX===u.x&&targetY===u.y){return[]}
    if(this.unitAt(targetX,targetY)!==null){return[]}

    const open=[{x:u.x,y:u.y,c:0}],costs=new Map([[this.key(u.x,u.y),0]]),parents=new Map();
    while(open.length){
      open.sort((a,b)=>a.c-b.c);
      const cur=open.shift();
      if(cur.x===targetX&&cur.y===targetY){break}
      for(const n of this.neighbors(cur.x,cur.y)){
        if(!this.inside(n.x,n.y)){continue}
        const terrainType=this.map[n.y][n.x];
        if(!this.canEnterTerrain(u,terrainType)){continue}
        const block=this.unitAt(n.x,n.y);
        if(block!==null&&!(n.x===u.x&&n.y===u.y)){continue}
        const nc=cur.c+this.terrainMoveCost(u,terrainType),k=this.key(n.x,n.y),old=costs.has(k)?costs.get(k):999;
        if(nc<old){
          costs.set(k,nc);
          parents.set(k,{x:cur.x,y:cur.y});
          open.push({x:n.x,y:n.y,c:nc})
        }
      }
    }

    const destinationKey=this.key(targetX,targetY);
    if(!costs.has(destinationKey)){return[]}
    const path=[];
    let cur={x:targetX,y:targetY};
    while(!(cur.x===u.x&&cur.y===u.y)){
      path.push(cur);
      const parent=parents.get(this.key(cur.x,cur.y));
      if(parent===undefined){return[]}
      cur=parent
    }
    return path.reverse()
  }

  pathToRushOutside(u){
    // 第八章の二列門路。まずD・E列の城外側から空きマスを探す。
    // 城外までの完全な経路が塞がれている場合も、後続部隊は停止せず、
    // 現在位置より門外へ近い空きマスへ移動して隊列を前詰めする。
    const preferredLane=u.x<=3?3:4;
    const otherLane=preferredLane===3?4:3;
    const candidates=[];
    for(let y=4;y>=1;y--){
      candidates.push({x:preferredLane,y});
      candidates.push({x:otherLane,y})
    }

    for(const candidate of candidates){
      if(candidate.x===u.x&&candidate.y===u.y){continue}
      if(this.unitAt(candidate.x,candidate.y)!==null){continue}
      const path=this.pathToCell(u,candidate.x,candidate.y);
      if(path.length>0){return path}
    }

    const gateDistance=(x,y)=>Math.min(
      Math.abs(x-3)+Math.abs(y-4),
      Math.abs(x-4)+Math.abs(y-4)
    );
    const currentDistance=gateDistance(u.x,u.y);
    const currentLaneDistance=Math.min(Math.abs(u.x-3),Math.abs(u.x-4));
    let best=null;

    for(let y=0;y<=3;y++){
      for(let x=0;x<this.width;x++){
        if(x===u.x&&y===u.y){continue}
        if(this.unitAt(x,y)!==null){continue}
        const terrainType=this.map[y][x];
        if(!this.canEnterTerrain(u,terrainType)){continue}
        const path=this.pathToCell(u,x,y);
        if(path.length===0){continue}

        const distance=gateDistance(x,y);
        const laneDistance=Math.min(Math.abs(x-3),Math.abs(x-4));
        const advances=distance<currentDistance||
          (distance===currentDistance&&laneDistance<currentLaneDistance);
        if(!advances){continue}

        const totalCost=this.pathCostForUnit(u,path);
        const candidate={path,distance,laneDistance,y,totalCost};
        if(
          best===null||
          candidate.distance<best.distance||
          (candidate.distance===best.distance&&candidate.y>best.y)||
          (candidate.distance===best.distance&&candidate.y===best.y&&candidate.laneDistance<best.laneDistance)||
          (candidate.distance===best.distance&&candidate.y===best.y&&candidate.laneDistance===best.laneDistance&&candidate.totalCost<best.totalCost)
        ){
          best=candidate
        }
      }
    }

    return best===null?[]:best.path
  }

  pathToAdjacent(u,t){
    const open=[{x:u.x,y:u.y,c:0}],costs=new Map([[this.key(u.x,u.y),0]]),parents=new Map();
    while(open.length){open.sort((a,b)=>a.c-b.c);const cur=open.shift();for(const n of this.neighbors(cur.x,cur.y)){
      if(!this.inside(n.x,n.y)){continue}const terrainType=this.map[n.y][n.x],tr=this.terrainData[terrainType];if(!this.canEnterTerrain(u,terrainType)){continue}const block=this.unitAt(n.x,n.y);if(block!==null&&!(n.x===u.x&&n.y===u.y)){continue}
      const nc=cur.c+this.terrainMoveCost(u,terrainType),k=this.key(n.x,n.y),old=costs.has(k)?costs.get(k):999;if(nc<old){costs.set(k,nc);parents.set(k,{x:cur.x,y:cur.y});open.push({x:n.x,y:n.y,c:nc})}
    }}
    let dest=null,best=999;for(const c of this.neighbors(t.x,t.y)){const k=this.key(c.x,c.y);if(!costs.has(k)){continue}const block=this.unitAt(c.x,c.y);if(block!==null&&!(c.x===u.x&&c.y===u.y)){continue}if(costs.get(k)<best){best=costs.get(k);dest=c}}
    if(dest===null){return[]}const path=[];let cur=dest;while(!(cur.x===u.x&&cur.y===u.y)){path.push(cur);const p=parents.get(this.key(cur.x,cur.y));if(p===undefined){break}cur=p}return path.reverse()
  }

  /**
   * 上部4ボタンパネルを自軍ターン表示状態と同期する。
   * 操作不能中も表示は維持し、実際の操作可否は updateButtons() の disabled で管理する。
   */
  syncBattleActionButtonsVisibility(){
    if(this.battleActionButtons===null){return false}
    const show=this.isPlayerTurnUiVisible();
    const visibilityChanged=this.battleActionButtons.hidden===show;
    this.battleActionButtons.hidden=!show;
    if(visibilityChanged){this.queueCommandDockSpacerSync()}
    return show
  }

  render(){
    this.validateInteractionState("render");
    this.board.innerHTML="";const sel=this.selected(),face=this.pendingFacing(),stage=this.stages[this.currentStage],escape=this.activeEscape,displayEscapeFlag=escape??(stage?.battleType==="raid_escape"?stage.escapeAfterRaid:null);
    for(let y=0;y<this.height;y++){for(let x=0;x<this.width;x++){const c=document.createElement("button"),type=this.map[y][x],u=this.unitAt(x,y),escape=this.activeEscape;c.className="cell";c.dataset.x=String(x);c.dataset.y=String(y);c.innerHTML=this.terrainSvg(x,y,type);
      if(escape!==null&&Math.abs(x-escape.x)+Math.abs(y-escape.y)<=(escape.radius||0)){c.classList.add("escape-zone")}
      if(displayEscapeFlag!==null&&x===displayEscapeFlag.x&&y===displayEscapeFlag.y){c.insertAdjacentHTML("beforeend",`<div class="escape-flag"><div class="pole"></div><div class="cloth">脱</div></div>`)}
      if(type==="road"){const r=document.createElement("div");r.className="road";r.innerHTML=this.roadSvg(x,y);c.appendChild(r)}
      if(u!==null&&u.hasActed&&u.team===this.phase){c.classList.add("done")}
      if(this.mode==="move"&&this.reachable.has(this.key(x,y))){c.insertAdjacentHTML("beforeend",`<div class="move"></div><div class="cost">${this.reachable.get(this.key(x,y))}</div>`)}
      if((this.mode==="move"||this.mode==="command")&&u!==null&&u.team==="enemy"&&sel!==null&&this.distance(sel,u)===1){c.insertAdjacentHTML("beforeend",`<div class="attack"></div>`)}
      if(this.mode==="strategy"&&u!==null&&u.team==="enemy"&&sel!==null&&this.isValidStrategyCenter(sel,u,this.selectedStrategyLevel,"enemy")){c.insertAdjacentHTML("beforeend",`<div class="strategy-target"><span>${this.specialTacticName(sel)??(this.isIllusionUser(sel)?"幻術":`Lv${this.selectedStrategyLevel}`)}</span></div>`)}
      if(this.mode==="bow"&&u!==null&&u.team==="enemy"&&sel!==null&&this.isValidProjectileTarget(sel,u)){c.insertAdjacentHTML("beforeend",`<div class="bow-target"></div>`)}
      if(this.mode==="charge"&&u!==null&&u.team==="enemy"&&sel!==null&&this.distance(sel,u)===1){c.insertAdjacentHTML("beforeend",`<div class="charge-target"></div>`)}
      if(
        (this.mode==="facing"&&face!==null&&Math.abs(face.x-x)+Math.abs(face.y-y)===1)||
        (this.mode==="command"&&sel!==null&&Math.abs(sel.x-x)+Math.abs(sel.y-y)===1&&(u===null||u.team!=="enemy"))
      ){c.insertAdjacentHTML("beforeend",`<div class="facing"></div>`)}
      if(u!==null){
        c.dataset.unitId=u.id;
        c.insertAdjacentHTML("beforeend",`
          <div class="shadow"></div>
          <div class="troop-marker ${u.team}${u.hasActed&&u.team===this.phase?" turn-acted":""}">
            <div class="crest"></div>
            <div class="body"><span class="kanji">${u.short}</span></div>
            <div class="soldiers"><i></i><i></i><i></i></div>
          </div>
          <div class="arrow face-${u.facing}"></div>
          ${u.confusedTurns>0?`<div class="confusion-mark">?</div><div class="status-turn confusion-turn">${u.confusedTurns}</div>`:''}
          ${u.illusionTurns>0?`<div class="illusion-mark">☠</div><div class="status-turn illusion-turn">${u.illusionTurns}</div>`:''}
          <div class="hp"><div style="width:${u.hp/u.maxHp*100}%"></div></div>
        `)
      }
      c.addEventListener("contextmenu",event=>event.preventDefault());
      c.addEventListener("pointerdown",event=>this.startLongPress(event,u));
      c.addEventListener("pointermove",event=>this.moveLongPress(event));
      c.addEventListener("pointerup",()=>this.endLongPress());
      c.addEventListener("pointercancel",()=>this.endLongPress());
      c.addEventListener("pointerleave",event=>{if(event.pointerType==="mouse"){this.endLongPress()}});
      c.onclick=()=>{if(this.consumeLongPress()||this.consumePointerMove()){return}this.cellClick(x,y)};
      this.board.appendChild(c)
    }}
    const turnLimit=this.stageTurnLimit();
    this.e("turnText").textContent=this.phase==="enemy"?"敵ターン":"味方ターン";this.e("phaseText").textContent=`${this.turn} / ${turnLimit}`;
    this.e("playerCountText").textContent=`味方 ${this.alive("player").length}`;
    this.e("enemyCountText").textContent=`敵 ${this.alive("enemy").length}`;
    const playerInteractionReady=this.isPlayerInteractionReady();
    const playerTurnUiVisible=this.isPlayerTurnUiVisible();
    this.syncBattleActionButtonsVisibility();
    // 操作可能時だけ現在の選択状態から表示内容を更新する。
    // 行動演出中は表示中のコマンド／情報パネルをそのまま保持し、点滅を防ぐ。
    if(playerInteractionReady){
      const commandUnit=this.selected();
      const showCommandArea=commandUnit!==null&&commandUnit.team==="player";
      if(this.commandArea!==null){this.commandArea.hidden=!showCommandArea}
    }else if(!playerTurnUiVisible){
      if(this.commandArea!==null){this.commandArea.hidden=true}
    }
    // 敵ターン等、自軍ターンUIそのものを表示しない状態になった時だけ情報を閉じる。
    if(!playerTurnUiVisible){
      this.unitInfoPanel.hidden=true;
      this.terrainInfoPanel.hidden=true;
      this.selectionInfoContainer.hidden=true;
      if(this.commandArea!==null){this.commandArea.hidden=true}
      this.info.innerHTML="";
      this.terrainInfo.innerHTML=""
    }
    this.updateInteractionDockVisibility();
    this.updateStageInfo();
    this.updateSelectionRing();
    this.updateButtons();this.e("log").textContent=this.logs.join("\n");this.e("log").scrollTop=this.e("log").scrollHeight
  }

  boardCellContentTop(cell){
    if(cell===undefined||this.board===null){return 0}
    return this.board.offsetTop+cell.offsetTop
  }

  /**
   * 戦闘マップ上端へ固定しているUI群の実際の占有高さを取得する。
   * 上部4ボタンと、その直下へ固定した情報・操作ドックの最下端を基準にする。
   */
  battleTopOverlayInset(){
    if(this.battleViewport===null){return 0}
    const viewportRect=this.battleViewport.getBoundingClientRect();
    let overlayBottom=viewportRect.top;
    const overlays=[this.battleActionButtons,this.commandDock];
    for(const overlay of overlays){
      if(overlay===null||overlay.hidden||overlay.getClientRects().length===0){continue}
      overlayBottom=Math.max(overlayBottom,overlay.getBoundingClientRect().bottom)
    }
    return Math.max(0,Math.min(this.boardScroll?.clientHeight||0,(overlayBottom-viewportRect.top)+6))
  }

  /**
   * 操作パネルのスペーサー変更前に、現在見ている盤面位置の基準セルを取得する。
   * 画面中央に最も近い可視セルをアンカーとして使い、盤面上端ではなく実セル基準で位置を維持する。
   */
  captureCommandDockScrollAnchor(){
    if(this.boardScroll===null||this.board===null){return null}
    const viewportRect=this.boardScroll.getBoundingClientRect();
    const topInset=this.battleTopOverlayInset();
    const visibleTop=Math.min(viewportRect.bottom,viewportRect.top+topInset);
    const targetY=visibleTop+Math.max(0,(viewportRect.bottom-visibleTop)/2);
    let anchorCell=null;
    let anchorDistance=Number.POSITIVE_INFINITY;

    for(const cell of this.board.querySelectorAll(".cell")){
      const rect=cell.getBoundingClientRect();
      if(rect.bottom<=visibleTop||rect.top>=viewportRect.bottom){continue}
      const centerY=rect.top+(rect.height/2);
      const distance=Math.abs(centerY-targetY);
      if(distance<anchorDistance){
        anchorCell=cell;
        anchorDistance=distance
      }
    }

    if(anchorCell===null){
      anchorCell=this.board.querySelector(".cell")
    }
    if(anchorCell===null){return null}

    return{
      cell:anchorCell,
      screenY:anchorCell.getBoundingClientRect().top
    }
  }

  /**
   * スペーサー変更後もアンカーセルの画面上Y座標を維持する。
   * 1回の同期につき補正は1回だけ行う。
   */
  restoreCommandDockScrollAnchor(anchor){
    if(anchor===null||this.boardScroll===null||!anchor.cell.isConnected){return}
    const currentY=anchor.cell.getBoundingClientRect().top;
    const delta=currentY-anchor.screenY;
    if(Math.abs(delta)<=0.01){return}

    const maxScrollTop=Math.max(0,this.boardScroll.scrollHeight-this.boardScroll.clientHeight);
    const targetScrollTop=Math.min(maxScrollTop,Math.max(0,this.boardScroll.scrollTop+delta));
    this.boardScroll.scrollTop=targetScrollTop
  }

  queueCommandDockSpacerSync(){
    if(this.commandDockSpacerSyncQueued){return}
    this.commandDockSpacerSyncQueued=true;
    window.requestAnimationFrame(()=>{
      this.commandDockSpacerSyncQueued=false;
      this.syncCommandDockSpacers()
    })
  }

  syncCommandDockSpacers(){
    if(this.commandDock===null||this.boardScroll===null||this.board===null||this.boardTopSpacer===null||this.boardBottomSpacer===null||this.battleViewport===null){return}

    // 情報・操作ドックは上部4ボタンの直下へ固定し、内容追加時は上端を動かさず下方向へ伸ばす。
    const viewportRect=this.battleViewport.getBoundingClientRect();
    const actionOverlayOpen=this.battleActionButtons!==null&&!this.battleActionButtons.hidden&&this.battleActionButtons.getClientRects().length>0;
    let commandDockTop=6;
    if(actionOverlayOpen){
      commandDockTop=(this.battleActionButtons.getBoundingClientRect().bottom-viewportRect.top)+6
    }
    this.commandDock.style.setProperty("--command-dock-top",`${commandDockTop}px`);

    const anchor=this.captureCommandDockScrollAnchor();
    const open=this.commandDock.classList.contains("dock-open")&&this.commandDock.getClientRects().length>0;
    let targetTop=0;
    if(actionOverlayOpen){
      targetTop=(this.battleActionButtons.getBoundingClientRect().bottom-viewportRect.top)+6
    }
    if(open){
      targetTop=Math.max(targetTop,(this.commandDock.getBoundingClientRect().bottom-viewportRect.top)+6)
    }
    const targetBottom=0;
    const currentTop=this.boardTopSpacer.getBoundingClientRect().height;
    const currentBottom=this.boardBottomSpacer.getBoundingClientRect().height;
    if(Math.abs(currentTop-targetTop)<=0.01&&Math.abs(currentBottom-targetBottom)<=0.01){return}

    // 上側UI全体の実測高さだけを上側余白へ反映する。下側余白は常に0。
    // 可視セルをアンカーとして、パネルの追加・削除で盤面が不必要に跳ねないようにする。
    this.boardTopSpacer.style.height=`${targetTop}px`;
    this.boardBottomSpacer.style.height="0px";
    this.restoreCommandDockScrollAnchor(anchor)
  }

  updateInteractionDockVisibility(){
    const commandDock=this.commandDock||this.e("commandDock");
    if(commandDock===null){return}
    const playerTurnUiVisible=this.isPlayerTurnUiVisible();
    const showSelection=playerTurnUiVisible&&this.selectionInfoContainer!==null&&!this.selectionInfoContainer.hidden;
    const showCommand=playerTurnUiVisible&&this.commandArea!==null&&!this.commandArea.hidden;
    const open=playerTurnUiVisible&&(showSelection||showCommand);
    commandDock.classList.toggle("dock-open",open);
    commandDock.classList.remove("dock-compact");
    commandDock.setAttribute("aria-hidden",open?"false":"true");
    this.queueCommandDockSpacerSync()
  }

  updateButtons(){
    const activeUnit=this.selected();
    const inspectedUnit=
      this.selectedCellX!==null&&this.selectedCellY!==null&&this.inside(this.selectedCellX,this.selectedCellY)
        ?this.unitAt(this.selectedCellX,this.selectedCellY)
        :null;
    // 操作中の味方を最優先し、それがいない場合は情報表示中の味方をコマンド表示対象にする。
    // これにより、行動済み・行動不能の味方でも技能の残り回数を確認できる。
    const displayUnit=
      activeUnit!==null&&activeUnit.team==="player"
        ?activeUnit
        :inspectedUnit!==null&&inspectedUnit.team==="player"
          ?inspectedUnit
          :null;
    const ok=this.isPlayerInteractionReady();
    const playerTurnUiVisible=this.isPlayerTurnUiVisible();

    // 自軍ターン中の一時的な操作不能では、表示中のUI構成を変えずに操作だけ無効化する。
    // これにより移動・攻撃・計略・罠・会話中のパネル点滅を防ぐ。
    if(!ok&&playerTurnUiVisible){
      [this.bowBtn,this.chargeBtn,this.strategyBtn,this.waitBtn,this.cancelBtn].forEach(button=>button.disabled=true);
      this.strategyLevelButtons.forEach(button=>button.disabled=true);
      this.endTurnBtn.hidden=false;
      this.endTurnBtn.disabled=true;
      if(this.stageInfoBtn!==null){this.stageInfoBtn.disabled=true}
      if(this.battleStatusBtn!==null){this.battleStatusBtn.disabled=true}
      if(this.strategyGuideBtn!==null){this.strategyGuideBtn.disabled=true}
      this.endTurnBtn.classList.remove("turn-ready-firefly");
      this.updateInteractionDockVisibility();
      return
    }

    const showUnitCommands=ok&&displayUnit!==null;
    const showPrimaryCommands=showUnitCommands&&(this.mode==="move"||this.mode==="command");
    this.unitCommandButtons.hidden=!showPrimaryCommands;
    this.unitCommandButtons.style.display=showPrimaryCommands?"grid":"none";
    this.unitCommandButtons.setAttribute("aria-hidden",showPrimaryCommands?"false":"true");
    if(this.commandInstructionText!==null){
      this.commandInstructionText.textContent=showUnitCommands?(this.commandInstructionMessage||"行動を選択してください。"):""
    }
    this.updateInteractionDockVisibility();

    [this.bowBtn,this.chargeBtn,this.strategyBtn,this.waitBtn,this.cancelBtn].forEach(button=>button.disabled=true);
    this.strategyLevelPanel.classList.remove("show");
    this.strategyLevelPanel.setAttribute("aria-hidden","true");
    this.bowBtn.textContent=displayUnit!==null&&this.hasProjectileSkill(displayUnit)?`${this.projectileActionName(displayUnit)} ${displayUnit.bowUses}/${displayUnit.maxBowUses}`:"遠距離不可";
    this.chargeBtn.textContent=displayUnit!==null&&this.hasChargeSkill(displayUnit)?`突撃 ${displayUnit.chargeUses}/${displayUnit.maxChargeUses}`:"突撃不可";
    this.strategyBtn.textContent=displayUnit!==null&&displayUnit.maxStrategyUses>0?(this.specialTacticName(displayUnit)!==null?`${this.specialTacticName(displayUnit)} ${displayUnit.strategyUses}/${displayUnit.maxStrategyUses}`:this.isIllusionUser(displayUnit)?`幻術 ${displayUnit.strategyUses}/${displayUnit.maxStrategyUses}`:`撹乱 ${displayUnit.strategyUses}/${displayUnit.maxStrategyUses} Lv${displayUnit.maxStrategyLevel}`):"計略不可";
    this.waitBtn.textContent="待機";
    this.waitBtn.style.visibility="hidden";
    const pendingCommittedFacing=this.alive("player").some(unit=>unit.actionCommitted===true&&!unit.hasActed&&!unit.stationary);
    const pendingUncommittedMovement=this.alive("player").some(
      unit=>unit.hasMoved&&!unit.hasActed&&unit.actionCommitted!==true&&!unit.stationary
    );
    this.endTurnBtn.hidden=this.phase!=="player"||this.finished||this.units.length===0;
    this.endTurnBtn.disabled=!ok||pendingCommittedFacing||pendingUncommittedMovement;
    if(this.stageInfoBtn!==null){this.stageInfoBtn.disabled=!ok||this.units.length===0}
    if(this.battleStatusBtn!==null){this.battleStatusBtn.disabled=!ok||this.units.length===0}
    if(this.strategyGuideBtn!==null){this.strategyGuideBtn.disabled=!ok||this.units.length===0}
    const livingPlayerUnits=this.alive("player");
    const allPlayerUnitsFinished=
      ok&&livingPlayerUnits.length>0&&livingPlayerUnits.every(unit=>unit.hasActed);
    this.endTurnBtn.classList.toggle("turn-ready-firefly",allPlayerUnitsFinished);

    // 回数表示は行動済み・行動不能でも行うが、実際の操作は現在行動中の味方だけに許可する。
    if(!ok||activeUnit===null||displayUnit===null||activeUnit.id!==displayUnit.id){return}
    const u=activeUnit;

    const canBow=this.canUseBow(u)&&this.hasBowTarget(u);
    const canCharge=this.canUseCharge(u)&&this.hasChargeTarget(u);
    const canStrategy=this.canUseStrategy(u)&&this.hasStrategyTarget(u);

    if(this.mode==="strategy-level"){
      this.strategyLevelPanel.classList.add("show");
      this.strategyLevelPanel.setAttribute("aria-hidden","false");
      this.strategyLevelButtons.forEach(button=>{
        const level=Number(button.dataset.strategyLevel);
        button.disabled=!this.canUseStrategyLevel(u,level)||!this.hasStrategyTargetForLevel(u,level,"enemy")
      });
      this.cancelBtn.disabled=!this.canUndoCurrentAction(u);
      return
    }

    if(this.mode==="move"||this.mode==="command"){
      this.bowBtn.disabled=!canBow;
      this.chargeBtn.disabled=!canCharge;
      this.strategyBtn.disabled=!canStrategy;
      this.cancelBtn.disabled=!this.canUndoCurrentAction(u);
      // v9.5.8：移動前でも待機を選び、その場で方向だけ変更して行動終了できる。
      this.waitBtn.style.visibility="visible";
      this.waitBtn.disabled=false
    }else if(this.mode==="strategy"||this.mode==="bow"||this.mode==="charge"||this.isWaitingForFacing()){
      this.cancelBtn.disabled=!this.canUndoCurrentAction(u)
    }
  }

  actionDialogue(unit,kind){
    const specific={
      "花栄":{bow:"この一矢、外しはしない！"},
      "秦明":{charge:"退け！　霹靂火・秦明が押し通る！"},
      "林冲":{charge:"豹子頭・林冲、参る！"},
      "楊志":{charge:"青面獣の槍、受けてみろ！"},
      "呉用":{strategy:"敵の心を乱せ。策はすでに成った。"},
      "単廷珪":{water:"水勢を借り、敵陣を崩す！"},
      "魏定国":{fire:"炎よ、敵陣を焼き崩せ！"},
      "公孫勝":{illusion:"天地の気よ、我が術に応えよ！"},
      "高廉":{illusion:"我が妖術から逃れられると思うな！"}
    };
    const defaults={
      bow:"狙いは定まった。放て！",
      charge:"全軍、突撃！　一気に押し崩せ！",
      strategy:"敵陣を乱す。今こそ策を放つ！",
      fire:"炎で敵陣を焼き崩す！",
      water:"水勢で敵陣を押し流す！",
      illusion:"幻に惑え。もはや敵も味方も見分けられまい！"
    };
    return specific[unit.name]?.[kind]||defaults[kind]||"今だ！"
  }

  actionLabel(kind){
    return kind==="bow"?"弓撃":kind==="charge"?"突撃":kind==="fire"?"火計":kind==="water"?"水計":kind==="illusion"?"幻術":"撹乱"
  }

  showActionCutIn(unit,kind,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return Promise.resolve()}
    const action=kind==="bow"?this.projectileActionName(unit):this.actionLabel(kind);
    const line={unit:unit.id,text:this.actionDialogue(unit,kind),action};
    return this.showDialogueLine(line,true,680,sessionId)
  }

  async showDialogueSequence(lines){
    if(lines.length===0){return}
    this.dialogueActive=true;
    try{
      for(const line of lines){
        await this.showDialogueLine(line,false,0)
      }
    }finally{
      this.dialogueActive=false;
      this.hideDialogue()
    }
  }

  async showResultDialogueSequence(lines){
    if(lines.length===0){return}
    const previousDialogueActive=this.dialogueActive;
    this.dialogueActive=true;
    try{
      for(const line of lines){
        await this.showDialogueLine(line,false,0)
      }
    }finally{
      this.dialogueActive=previousDialogueActive;
      this.hideDialogue()
    }
  }

  strategySuccessCasterText(user,isIllusion,successCount){
    if(isIllusion){
      if(user.name==="公孫勝"){
        return successCount>1
          ?`${successCount}隊を幻の中へ封じました。今こそ妖陣を崩す時です。`
          :"術は成りました。しばし幻の中に沈みなさい。"
      }
      if(user.name==="高廉"){
        return successCount>1
          ?`ククク……${successCount}隊まとめて我が妖術に囚われたな！`
          :"ククク……我が妖術に囚われたな！"
      }
      return successCount>1
        ?`${successCount}隊が幻に落ちた。もはや敵も味方も見分けられまい！`
        :"術は成った。幻の中で己を見失え！"
    }

    if(user.name==="呉用"){
      return successCount>1
        ?`よし、策は成った。${successCount}隊の指図はもはや通らぬ。`
        :"よし、策は成った。敵陣の指図はもはや通らぬ。"
    }

    return successCount>1
      ?`${successCount}隊の動きが乱れた。今が攻め時だ！`
      :"かかった。敵の動きは乱れたぞ！"
  }

  strategySuccessTargetText(isIllusion){
    return isIllusion
      ?"敵が幾重にも見える……！　どれが本物だ！？"
      :"何だ……命令が聞き取れん！　隊列が崩れる！"
  }

  showStrategySuccessDialogue(user,target,isIllusion,successCount){
    if(user===null||target===null){return Promise.resolve()}
    const action=isIllusion?"幻術成功":"撹乱成功";
    const targetAction=isIllusion?"幻術状態":"撹乱状態";
    return this.showResultDialogueSequence([
      {
        unit:user.id,
        text:this.strategySuccessCasterText(user,isIllusion,successCount),
        action
      },
      {
        unit:target.id,
        text:this.strategySuccessTargetText(isIllusion),
        action:targetAction
      }
    ])
  }

  showSpellTrapNeutralizedDialogue(unit){
    if(unit===null){return Promise.resolve()}
    const text=unit.name==="公孫勝"
      ?"妖符の理は見切りました。この程度の幻術罠ならば――破！"
      :"術の流れは見切った。この幻術罠は私には通じぬ――破！";
    return this.showResultDialogueSequence([
      {
        unit:unit.id,
        text,
        action:"妖術罠無効"
      }
    ])
  }

  showTrapReactionDialogue(unit,isSpellTrap,isAlive){
    if(unit===null){return Promise.resolve()}
    let text="";
    if(!isAlive){
      text=isSpellTrap
        ?"ぐっ……地面から妖気が……ここにも術が仕込まれていたか……！"
        :"ぐっ……足元に罠が……！"
    }else if(isSpellTrap){
      text="何だ、この妖気は……！　敵と味方の姿が歪んで見える！"
    }else{
      text="しまった、罠だ！　隊列が乱れた。ここで立て直すぞ！"
    }
    return this.showResultDialogueSequence([
      {
        unit:unit.id,
        text,
        action:isSpellTrap?"妖術罠":"罠"
      }
    ])
  }

  showDialogueLine(line,autoClose=false,duration=650,sessionId=null){
    if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){return Promise.resolve()}
    const overlay=this.e("dialogueOverlay");
    const unit=this.units.find(candidate=>candidate.id===line.unit)||this.units.find(candidate=>candidate.name===line.name)||null;
    const registered=line.name?DIALOGUE_CHARACTER_PROFILES[line.name]||null:null;
    const fallback={portrait:"scroll",team:"player",name:line.name||"語り手"};
    const speaker=unit||registered||fallback;
    this.e("dialogueFace").innerHTML=this.portraitSvg(speaker);
    this.e("dialogueSpeaker").textContent=speaker.name||line.name||"語り手";
    this.e("dialogueAction").textContent=line.action||"";
    this.e("dialogueAction").style.display=line.action?"inline-block":"none";
    this.e("dialogueText").textContent=line.text;
    const next=this.e("dialogueNext");
    next.classList.toggle("auto",autoClose);
    next.onclick=null;
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden","false");

    return new Promise(resolve=>{
      let finished=false;
      const close=()=>{
        if(finished){return}
        finished=true;
        // 古い行動カットインのタイマーから、新しい戦闘の会話UIを閉じない。
        if(sessionId!==null&&!this.isBattleSessionActive(sessionId)){
          resolve();
          return
        }
        next.onclick=null;
        overlay.classList.remove("show");
        overlay.setAttribute("aria-hidden","true");
        resolve()
      };
      if(autoClose){
        window.setTimeout(close,duration)
      }else{
        next.onclick=close
      }
    })
  }

  hideDialogue(){
    const overlay=this.e("dialogueOverlay");
    if(overlay!==null){
      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden","true")
    }
  }

  missionConditions(stage){
    const lines=String(stage.objective||"").split(/<br\s*\/?\s*>/i).map(line=>line.trim()).filter(Boolean);
    let victory="";
    let defeat="";
    for(const line of lines){
      if(line.startsWith("勝利：")){victory=line.slice(3).trim();continue}
      if(line.startsWith("敗北：")){defeat=line.slice(3).trim();continue}
      if(victory===""){victory=line.replace(/^第一段階：/,"").trim()}
    }
    return {victory:victory||"敵軍を撃破し、作戦目標を達成する",defeat:defeat||"主将が敗走する"}
  }

  showMissionConditions(stage){
    const overlay=this.e("missionOverlay");
    const conditions=this.missionConditions(stage);
    this.e("missionVictoryText").textContent=conditions.victory;
    this.e("missionDefeatText").textContent=conditions.defeat;
    const closeButton=this.e("missionStartButton");
    this.missionActive=true;
    this.dialogueActive=false;
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden","false");

    return new Promise(resolve=>{
      closeButton.onclick=()=>{
        closeButton.onclick=null;
        overlay.classList.remove("show");
        overlay.setAttribute("aria-hidden","true");
        this.missionActive=false;
        resolve()
      }
    })
  }

  hideMissionConditions(){
    const overlay=this.e("missionOverlay");
    if(overlay!==null){
      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden","true")
    }
    this.missionActive=false
  }

  terrainEffectDescription(unit,type){
    const terrain=this.terrainData[type];
    if(type==="water"&&this.hasWaterTerrainAffinity(unit)){
      return "移動1／攻防効果なし（水系適性）"
    }
    if(type==="swamp"){
      if(this.hasWaterTerrainAffinity(unit)){
        return "移動1／攻防効果なし（水系適性）"
      }
      if(this.hasChainCavalry(unit)){
        return "移動3／湿地の攻撃30%または8低下＋連環馬さらに与ダメージ30%低下／湿地の被ダメージ30%または8増加＋連環馬さらに20%増加"
      }
      return "移動3／攻撃30%または8低下／被ダメージ30%または8増加"
    }
    if(this.hasChainCavalry(unit)&&(type==="plain"||type==="road")){
      return `移動${terrain.move}／連環馬：被ダメージ20%軽減`
    }
    const defense=terrain.damageRate>0?`被ダメージ${Math.round(terrain.damageRate*100)}%または${terrain.damageFixed}の大きい方を軽減`:"被ダメージ軽減なし";
    const attack=terrain.attackBonus>0?`／攻撃+${terrain.attackBonus}`:"";
    return `移動${terrain.move}／${defense}${attack}`
  }

  terrainCombatLogText(unit,type,role){
    const terrain=this.terrainData[type];
    if(type==="swamp"){
      if(this.hasWaterTerrainAffinity(unit)){return role==="attack"?"攻撃地形効果なし":"湿地：水系適性で防御不利なし"}
      if(this.hasChainCavalry(unit)){
        return role==="attack"?"湿地：攻撃30%または8低下＋連環馬さらに30%低下":"湿地：被ダメージ30%または8増加＋連環馬さらに20%増加"
      }
      return role==="attack"?"湿地：攻撃30%または8低下":"湿地：被ダメージ30%または8増加"
    }
    if(role==="attack"){return "攻撃地形効果なし"}
    if(this.hasChainCavalry(unit)&&(type==="plain"||type==="road")){return `${terrain.name}：連環馬20%軽減`}
    return terrain.damageRate>0?`${terrain.name}：${Math.round(terrain.damageRate*100)}%または${terrain.damageFixed}軽減の大きい方`:`${terrain.name}：軽減なし`
  }

  terrainCellDescription(type){
    const terrain=this.terrainData[type];
    if(type==="water"){
      return "通常部隊は進入不可。水系適性を持つ部隊は移動1で進入できます。"
    }
    if(type==="wall"){
      return "部隊は進入できません。"
    }
    if(type==="swamp"){
      return "通常部隊：移動3／攻撃30%または8低下／被ダメージ30%または8増加。水系適性部隊：移動1／攻防効果なし。"
    }
    const defense=terrain.damageRate>0?`被ダメージ${Math.round(terrain.damageRate*100)}%または${terrain.damageFixed}の大きい方を軽減`:"被ダメージ軽減なし";
    const attack=terrain.attackBonus>0?`／攻撃+${terrain.attackBonus}`:"";
    return `移動${terrain.move}／${defense}${attack}`
  }

  showTerrainInfo(x,y,unit=null){
    if(!this.isPlayerTurnUiVisible()){
      this.terrainInfoPanel.hidden=true;
      this.terrainInfo.innerHTML="";
      if(this.selectionInfoContainer!==null&&this.unitInfoPanel.hidden){this.selectionInfoContainer.hidden=true}
      this.updateInteractionDockVisibility();
      return
    }
    if(!this.inside(x,y)||this.map===undefined||this.map[y]===undefined){
      this.terrainInfoPanel.hidden=true;
      this.terrainInfo.innerHTML="";
      if(this.selectionInfoContainer!==null&&this.unitInfoPanel.hidden){this.selectionInfoContainer.hidden=true}
      this.updateInteractionDockVisibility();
      return
    }
    const type=this.map[y][x];
    const terrain=this.terrainData[type];
    const detail=unit===null?this.terrainCellDescription(type):this.terrainEffectDescription(unit,type);
    this.terrainInfoPanel.hidden=false;
    if(this.selectionInfoContainer!==null){this.selectionInfoContainer.hidden=false}
    this.terrainInfo.innerHTML=`<div class="compact-info-heading terrain-info-heading">地形情報：<strong>${terrain.name}</strong></div><div class="terrain-info-detail">${detail}</div>`;
    this.updateInteractionDockVisibility()
  }

  unitDisplayNameHtml(u){
    const alias=(!u.isMob&&u.alias&&u.alias!=="なし")?`<span class="unit-alias">${u.alias}</span>`:"";
    const name=(!u.isMob&&u.reading)?`<ruby class="unit-name-ruby">${u.name}<rt>${u.reading}</rt></ruby>`:u.name;
    return `${alias}${name}`
  }

  showInfo(u,msg){
    if(!this.isPlayerTurnUiVisible()){
      this.unitInfoPanel.hidden=true;
      this.terrainInfoPanel.hidden=true;
      if(this.selectionInfoContainer!==null){this.selectionInfoContainer.hidden=true}
      this.info.innerHTML="";
      this.terrainInfo.innerHTML="";
      if(this.commandArea!==null){this.commandArea.hidden=true}
      this.updateInteractionDockVisibility();
      return
    }
    const statuses=[];
    if(u.confusedTurns>0&&u.illusionTurns>0){
      if(u.confusedTurns>u.illusionTurns){statuses.push(`乱${u.confusedTurns}幻${u.illusionTurns}`)}
      else{statuses.push(`幻術${u.illusionTurns}`)}
    }else{
      if(u.confusedTurns>0){statuses.push(`撹乱${u.confusedTurns}`)}
      if(u.illusionTurns>0){statuses.push(`幻術${u.illusionTurns}`)}
    }
    if(u.stationary&&u.stationaryLabel){statuses.push(u.stationaryLabel)}
    if(statuses.length===0&&u.hasActed&&!u.stationary){statuses.push("行動済み")}
    const statusText=statuses.length>0?statuses.join("　"):"通常";
    this.unitInfoPanel.hidden=false;
    if(this.selectionInfoContainer!==null){this.selectionInfoContainer.hidden=false}
    this.info.innerHTML=`
      <div class="compact-info-heading"><span>部隊情報：<strong>${u.name}</strong></span><span class="compact-info-hint">長押しで詳細</span></div>
      <div class="compact-info-line">兵力 ${u.hp}/${u.maxHp}　方向 ${this.facingJp(u.facing)}　移動 ${u.move}　状態 ${statusText}</div>
      <div class="compact-mini-portrait">${this.portraitSvg(u)}</div>
    `;
    // 行動に関する案内は通常部隊情報ではなく、操作中の行動コマンドへ集約する。
    if(u.team==="player"&&this.selectedUnitId===u.id){
      this.commandInstructionMessage=msg||""
    }
    this.showTerrainInfo(u.x,u.y,u);
    this.updateButtons();
    this.updateInteractionDockVisibility()
  }

  showBlankInfo(){
    if(!this.isPlayerTurnUiVisible()){
      this.unitInfoPanel.hidden=true;
      this.terrainInfoPanel.hidden=true;
      if(this.selectionInfoContainer!==null){this.selectionInfoContainer.hidden=true}
      this.info.innerHTML="";
      this.terrainInfo.innerHTML="";
      if(this.commandArea!==null){this.commandArea.hidden=true}
      this.updateButtons();
      this.updateInteractionDockVisibility();
      return
    }
    if(this.selected()===null){this.commandInstructionMessage=""}
    if(this.selectedCellX!==null&&this.selectedCellY!==null&&this.inside(this.selectedCellX,this.selectedCellY)){
      const unit=this.unitAt(this.selectedCellX,this.selectedCellY);
      if(unit!==null){
        const message=unit.team==="enemy"?"敵部隊の情報です。":unit.hasActed?"この部隊は行動済みです。":"部隊情報を表示しています。";
        this.showInfo(unit,message);
        return
      }
      this.unitInfoPanel.hidden=true;
      this.info.innerHTML="";
      this.showTerrainInfo(this.selectedCellX,this.selectedCellY,null);
      if(this.commandArea!==null){this.commandArea.hidden=true}
      this.updateButtons();
      this.updateInteractionDockVisibility();
      return
    }
    this.unitInfoPanel.hidden=true;
    this.terrainInfoPanel.hidden=true;
    if(this.selectionInfoContainer!==null){this.selectionInfoContainer.hidden=true}
    this.info.innerHTML="";
    this.terrainInfo.innerHTML="";
    if(this.commandArea!==null){this.commandArea.hidden=true}
    this.updateButtons();
    this.updateInteractionDockVisibility()
  }

  startLongPress(event,unit){
    this.cancelLongPressTimer();
    this.longPressTriggered=false;
    this.pointerMoved=false;
    this.pointerStartX=event.clientX;
    this.pointerStartY=event.clientY;
    this.longPressUnitId=unit===null||unit===undefined?null:unit.id;

    // v9.5.19：味方ターン開始時の自動処理・会話等が終わり、操作可能になってから詳細表示を許可する。
    if(!this.isPlayerInteractionReady()){
      this.longPressUnitId=null;
      this.hideAbilityOverlay();
      return
    }

    if(unit===null||unit===undefined){return}

    if(event.pointerType!=="touch"&&event.currentTarget.setPointerCapture!==undefined){
      try{event.currentTarget.setPointerCapture(event.pointerId)}catch(error){}
    }

    this.longPressTimer=window.setTimeout(()=>{
      this.longPressTimer=0;
      if(this.pointerMoved||!this.isPlayerInteractionReady()){
        this.longPressTriggered=false;
        this.longPressUnitId=null;
        this.hideAbilityOverlay();
        return
      }
      this.longPressTriggered=true;
      this.suppressLongPressClick=true;
      this.showAbilityOverlay(unit)
    },430)
  }

  moveLongPress(event){
    // 長押し成立中は、指の移動による背後画面のスクロールを抑止する。
    // 詳細表示は指を離した後も維持し、次のタップで閉じる。
    if(this.longPressTriggered){
      event.preventDefault();
      this.restoreLongPressScrollPosition();
      return
    }

    const dx=event.clientX-this.pointerStartX;
    const dy=event.clientY-this.pointerStartY;
    if(dx*dx+dy*dy>64){
      this.pointerMoved=true;
      this.cancelLongPressTimer()
    }
  }

  endLongPress(){
    this.cancelLongPressTimer();
    if(this.longPressTriggered){
      this.longPressTriggered=false;
      this.longPressUnitId=null;
      // pointerup直後の同一ジェスチャー由来clickで即閉じるのを防ぐ。
      this.abilityOverlayClickReadyAt=performance.now()+250
    }
  }

  lockLongPressBackground(){
    if(this.longPressScrollLock!==null){return}
    this.longPressScrollLock={
      windowX:window.scrollX,
      windowY:window.scrollY,
      boardLeft:this.boardScroll===null?0:this.boardScroll.scrollLeft,
      boardTop:this.boardScroll===null?0:this.boardScroll.scrollTop
    };
    document.documentElement.classList.add("longpress-status-open");
    document.body.classList.add("longpress-status-open");
    this.restoreLongPressScrollPosition()
  }

  restoreLongPressScrollPosition(){
    const lock=this.longPressScrollLock;
    if(lock===null){return}
    if(this.boardScroll!==null){
      this.boardScroll.scrollLeft=lock.boardLeft;
      this.boardScroll.scrollTop=lock.boardTop
    }
    if(window.scrollX!==lock.windowX||window.scrollY!==lock.windowY){
      window.scrollTo(lock.windowX,lock.windowY)
    }
  }

  unlockLongPressBackground(){
    const lock=this.longPressScrollLock;
    document.documentElement.classList.remove("longpress-status-open");
    document.body.classList.remove("longpress-status-open");
    if(lock!==null){
      if(this.boardScroll!==null){
        this.boardScroll.scrollLeft=lock.boardLeft;
        this.boardScroll.scrollTop=lock.boardTop
      }
      window.scrollTo(lock.windowX,lock.windowY)
    }
    this.longPressScrollLock=null
  }

  cancelLongPressTimer(){
    if(this.longPressTimer!==0){
      window.clearTimeout(this.longPressTimer);
      this.longPressTimer=0
    }
  }

  consumeLongPress(){
    if(!this.suppressLongPressClick){return false}
    this.suppressLongPressClick=false;
    return true
  }

  consumePointerMove(){
    if(!this.pointerMoved){return false}
    this.pointerMoved=false;
    return true
  }

  scrollBoardToPlayer(){
    const movable=this.alive("player").filter(unit=>!unit.stationary);
    const targets=movable.length>0?movable:this.alive("player");
    if(targets.length===0){return}
    const averageY=Math.round(targets.reduce((sum,unit)=>sum+unit.y,0)/targets.length);
    const averageX=Math.round(targets.reduce((sum,unit)=>sum+unit.x,0)/targets.length);
    this.centerBoardOnCell(averageX,averageY,"auto")
  }

  keepCellVisible(x,y){
    window.requestAnimationFrame(()=>{
      const index=y*this.width+x;
      const cell=this.board.children[index];
      if(cell===undefined||this.boardScroll===null){return}
      const margin=12;
      const top=this.boardCellContentTop(cell);
      const bottom=top+cell.offsetHeight;
      const left=cell.offsetLeft;
      const right=left+cell.offsetWidth;
      const topInset=this.battleTopOverlayInset();
      const viewTop=this.boardScroll.scrollTop+topInset;
      const viewBottom=this.boardScroll.scrollTop+this.boardScroll.clientHeight;
      const viewLeft=this.boardScroll.scrollLeft;
      const viewRight=viewLeft+this.boardScroll.clientWidth;
      if(top<viewTop+margin){
        this.boardScroll.scrollTop=Math.max(0,top-topInset-margin)
      }else if(bottom>viewBottom-margin){
        this.boardScroll.scrollTop=Math.max(0,bottom-this.boardScroll.clientHeight+margin)
      }
      if(left<viewLeft+margin){this.boardScroll.scrollLeft=Math.max(0,left-margin)}
      else if(right>viewRight-margin){this.boardScroll.scrollLeft=right-this.boardScroll.clientWidth+margin}
    })
  }

  centerBoardOnCell(x,y,behavior="smooth"){
    window.requestAnimationFrame(()=>{
      const index=y*this.width+x;
      const cell=this.board.children[index];
      if(cell===undefined||this.boardScroll===null){return}
      const topInset=this.battleTopOverlayInset();
      const visibleHeight=Math.max(cell.offsetHeight,this.boardScroll.clientHeight-topInset);
      const top=this.boardCellContentTop(cell)-topInset-(visibleHeight-cell.offsetHeight)/2;
      const left=cell.offsetLeft-(this.boardScroll.clientWidth-cell.offsetWidth)/2;
      this.boardScroll.scrollTo({top:Math.max(0,top),left:Math.max(0,left),behavior})
    })
  }

  showAbilityOverlay(u){
    if(!this.isPlayerInteractionReady()){
      this.hideAbilityOverlay();
      return
    }

    const t=this.terrain(u.x,u.y);
    const specialTactic=this.specialTacticName(u);
    const strategyText=u.maxStrategyUses>0?(specialTactic!==null?`${u.strategyUses}/${u.maxStrategyUses}（${specialTactic}）`:this.isIllusionUser(u)?`${u.strategyUses}/${u.maxStrategyUses}（幻術）`:`${u.strategyUses}/${u.maxStrategyUses}（撹乱Lv${u.maxStrategyLevel}）`):"使用不可";
    const bowText=this.hasProjectileSkill(u)?`${this.projectileActionName(u)} ${u.bowUses}/${u.maxBowUses}`:"使用不可";
    const chargeText=this.hasChargeSkill(u)?`${u.chargeUses}/${u.maxChargeUses}`:"使用不可";
    const traits=[];
    if(this.hasWaterTerrainAffinity(u)){traits.push("水軍適正")}
    if(this.hasWildTerrainAffinity(u)){traits.push("山野適正")}
    if(this.hasShieldSkill(u)){traits.push("盾牌")}
    if(this.isIllusionUser(u)){traits.push("幻術士")}
    if(this.hasChainCavalry(u)){traits.push("連環馬")}
    const traitHtml=traits.length>0?`<div class="ability-traits">${traits.map(label=>`<div class="ability-trait">${label}</div>`).join("")}</div>`:"";
    const status=[
      u.illusionTurns>0?`<span class="status-chip">幻術 ☠：残り${u.illusionTurns}・同士討ち優先</span>`:"",
      u.confusedTurns>0?`<span class="status-chip">撹乱？：残り${u.confusedTurns}・行動休み</span>`:""
    ].filter(value=>value!=="").join(" ");

    const browserSelection=window.getSelection!==undefined?window.getSelection():null;
    if(browserSelection!==null&&browserSelection.removeAllRanges!==undefined){browserSelection.removeAllRanges()}

    this.abilityCard.innerHTML=`
      <div class="ability-head">
        <div class="portrait">${this.portraitSvg(u)}</div>
        <div>
          <div class="ability-name">${this.unitDisplayNameHtml(u)}</div>
          <div class="ability-sub">${u.team==="player"?"味方部隊":"敵部隊"}　${status}</div>
          <div class="ability-detail-lines">
            <div class="ability-detail-line">兵力 ${u.hp}/${u.maxHp}</div>
            <div class="ability-detail-line">移動 ${u.move}</div>
            <div class="ability-detail-line">遠距離 ${bowText}</div>
            <div class="ability-detail-line">突撃 ${chargeText}</div>
            <div class="ability-detail-line">計略 ${strategyText}</div>
            <div class="ability-detail-line">向き ${this.facingJp(u.facing)}</div>
            <div class="ability-detail-line">地形 ${t.name}</div>
          </div>
        </div>
      </div>
      <div class="ability-large-grid">
        <div class="ability-large"><span>武力</span>${u.martial}</div>
        <div class="ability-large"><span>統率</span>${u.command}</div>
        <div class="ability-large"><span>知略</span>${u.intelligence}</div>
        <div class="ability-large"><span>人望</span>${u.charisma}</div>
      </div>
      ${traitHtml}
      <div class="ability-hint">画面をもう一度タップすると閉じます</div>
    `;
    this.lockLongPressBackground();
    this.abilityOverlayClickReadyAt=Number.POSITIVE_INFINITY;
    this.abilityOverlay.classList.add("show");
    this.abilityOverlay.setAttribute("aria-hidden","false")
  }

  hideAbilityOverlay(){
    this.abilityOverlay.classList.remove("show");
    this.abilityOverlay.setAttribute("aria-hidden","true");
    this.abilityOverlayClickReadyAt=0;
    this.suppressLongPressClick=false;
    this.unlockLongPressBackground()
  }

  portraitSvg(u){
    const portraitImage=CHARACTER_PORTRAIT_IMAGES[u.portrait];
    if(portraitImage){
      return `<img src="${portraitImage.src}" alt="${portraitImage.name}" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block">`
    }
    const p=u.portrait||"scroll",enemy=u.team==="enemy";let skin="#edc6a2",hair="#29231f",cloth=enemy?"#8d3931":"#2d6488",accent="#e6c45d",beard="",hat="",mark="";
    if(p==="shi_jin"){hair="#1e1b19";cloth="#2c6f9e";mark=`<path d="M36 55 q12-8 24 0 M39 62 q9-5 18 0" stroke="#365b88" stroke-width="3" fill="none"/>`}
    if(p==="zhu_wu"){hair="#342820";cloth="#526b8b";hat=`<path d="M24 35 Q50 12 76 35 L70 45 H30 Z" fill="#2b2b36"/>`;beard=`<path d="M39 77 Q50 96 61 77 Q57 108 50 116 Q43 108 39 77" fill="#30251f"/>`}
    if(p==="lin_chong"){hair="#181615";cloth="#284f75";beard=`<path d="M38 78 Q50 98 62 78 Q59 109 50 117 Q41 109 38 78" fill="#27201d"/>`;hat=`<path d="M28 34 Q50 16 72 34 L67 45 H33 Z" fill="#232b31"/>`}
    if(p==="lu_zhishen"){skin="#d5a276";hair="#181615";cloth="#6d5035";beard=`<path d="M27 74 Q50 115 73 74 Q68 123 50 129 Q32 123 27 74" fill="#1d1917"/>`;mark=`<circle cx="50" cy="31" r="3" fill="#7a4a34"/>`}
    if(p==="chao_gai"){hair="#211b18";cloth="#7b3f2e";accent="#d4aa4e";beard=`<path d="M36 78 Q50 101 64 78 Q61 113 50 120 Q39 113 36 78" fill="#2a211d"/>`}
    if(p==="wu_yong"){skin="#e8c3a0";hair="#2e2925";cloth="#d7d0b8";accent="#46647a";hat=`<path d="M22 34 Q50 9 78 34 L70 46 H30 Z" fill="#2e3840"/>`;beard=`<path d="M42 80 Q50 94 58 80 Q55 106 50 111 Q45 106 42 80" fill="#36302b"/>`}
    if(p==="gongsun_sheng"){hair="#342a22";cloth="#5b668e";accent="#d9d0a8";hat=`<path d="M31 35 Q50 10 69 35 L64 44 H36 Z" fill="#263341"/><circle cx="50" cy="18" r="5" fill="#d6c26d"/>`;beard=`<path d="M40 80 Q50 98 60 80 Q57 111 50 117 Q43 111 40 80" fill="#38302a"/>`}
    if(p==="yang_zhi"){skin="#8f725f";hair="#151515";cloth="#67533e";accent="#c7a453";hat=`<path d="M24 35 Q50 12 76 35 L70 46 H30 Z" fill="#292724"/>`;beard=`<path d="M41 80 Q50 96 59 80 Q56 108 50 114 Q44 108 41 80" fill="#1f1b19"/>`;mark=`<path d="M30 45 Q36 38 43 43" stroke="#354a62" stroke-width="6" fill="none" opacity=".85"/>`}
    if(p==="song_jiang"){skin="#e2b892";hair="#241e1a";cloth="#704230";accent="#d8b45d";hat=`<path d="M25 35 Q50 14 75 35 L69 46 H31 Z" fill="#34302b"/>`;beard=`<path d="M40 80 Q50 96 60 80 Q57 108 50 114 Q43 108 40 80" fill="#30251f"/>`;mark=`<path d="M35 65 Q50 71 65 65" stroke="#7a4432" stroke-width="2" fill="none"/>`}
    if(p==="hua_rong"){skin="#edc9a7";hair="#191817";cloth="#365f8f";accent="#e0c36b";hat=`<path d="M24 36 Q50 12 76 36 L70 46 H30 Z" fill="#253548"/><path d="M48 13 h4 v18 h-4z" fill="#d8b34f"/>`;mark=`<path d="M28 50 Q38 39 48 47 M72 50 Q62 39 52 47" stroke="#2d241e" stroke-width="2.5" fill="none"/>`}
    if(p==="qin_ming"){skin="#d19a70";hair="#171412";cloth="#8b3028";accent="#e0a642";hat=`<path d="M20 38 Q50 8 80 38 L72 50 H28 Z" fill="#352724"/><path d="M45 7 h10 v25 h-10z" fill="#b72822"/>`;beard=`<path d="M34 76 Q50 110 66 76 Q63 119 50 124 Q37 119 34 76" fill="#211a17"/>`}
    if(p==="dai_zong"){skin="#e5bd9b";hair="#26211d";cloth="#4f6e83";accent="#e5c967";hat=`<path d="M30 35 Q50 14 70 35 L65 44 H35 Z" fill="#29353a"/><path d="M20 30 Q50 20 80 30" stroke="#d9c05c" stroke-width="4"/>`;mark=`<path d="M32 58 Q39 53 45 58 M55 58 Q61 53 68 58" stroke="#33271f" stroke-width="2.5" fill="none"/>`}
    if(p==="li_kui"){skin="#9b684a";hair="#0f0e0d";cloth="#2e2c2a";accent="#b83229";beard=`<path d="M25 70 Q50 116 75 70 Q70 126 50 130 Q30 126 25 70" fill="#11100f"/>`;mark=`<path d="M29 52 L43 57 M71 52 L57 57" stroke="#1b1512" stroke-width="5"/><path d="M38 78 Q50 86 62 78" stroke="#6b2e24" stroke-width="4" fill="none"/>`}
    if(p==="gao_lian"){skin="#d6aa84";hair="#1d1815";cloth="#55416f";accent="#d7c16b";hat=`<path d="M27 36 Q50 8 73 36 L67 45 H33 Z" fill="#252331"/><circle cx="50" cy="15" r="5" fill="#c6ad55"/>`;beard=`<path d="M38 78 Q50 104 62 78 Q59 116 50 122 Q41 116 38 78" fill="#2a211d"/>`;mark=`<path d="M27 53 Q38 43 47 50 M73 53 Q62 43 53 50" stroke="#37251d" stroke-width="3" fill="none"/>`}
    if(p==="lu_junyi"){skin="#e2b996";hair="#211b17";cloth="#d8d6cf";accent="#b9903b";hat=`<path d="M19 39 Q50 7 81 39 L73 49 H27 Z" fill="#5b6470"/><path d="M46 7 h8 v24 h-8z" fill="#b89542"/>`;beard=`<path d="M38 79 Q50 100 62 79 Q59 112 50 118 Q41 112 38 79" fill="#2b211c"/>`}
    if(p==="yan_qing"){skin="#edc8a7";hair="#1b1917";cloth="#3f6f68";accent="#dbc76f";hat=`<path d="M23 35 Q50 15 77 35 L70 45 H30 Z" fill="#313a39"/><path d="M18 30 Q50 21 82 30" stroke="#c8aa55" stroke-width="4"/>`;mark=`<path d="M36 76 Q50 82 64 76" stroke="#7c4637" stroke-width="2.5" fill="none"/>`}
    if(p==="liang_zhongshu"){skin="#e0b793";hair="#241e1a";cloth="#7b3933";accent="#d8b45d";hat=`<path d="M25 34 Q50 15 75 34 L69 45 H31 Z" fill="#1e1f22"/><path d="M15 32 H85" stroke="#1e1f22" stroke-width="7"/>`;beard=`<path d="M41 80 Q50 96 59 80 Q56 108 50 113 Q44 108 41 80" fill="#30251f"/>`}
    if(p==="li_cheng"){skin="#d2a27f";hair="#171513";cloth="#4a5968";accent="#d0a84a";hat=`<path d="M20 38 Q50 9 80 38 L72 49 H28 Z" fill="#333b44"/><path d="M45 7 h10 v25 h-10z" fill="#9b2d28"/>`;beard=`<path d="M35 77 Q50 108 65 77 Q62 119 50 124 Q38 119 35 77" fill="#241c18"/>`}
    if(p==="wen_da"){skin="#c99772";hair="#171311";cloth="#7a3b2f";accent="#d0a84a";hat=`<path d="M20 38 Q50 10 80 38 L72 49 H28 Z" fill="#3b2d28"/>`;beard=`<path d="M31 73 Q50 111 69 73 Q65 123 50 128 Q35 123 31 73" fill="#1e1815"/>`}
    if(p==="zeng_nong"){skin="#c99976";hair="#40352d";cloth="#674f35";accent="#c9a45b";hat=`<path d="M25 37 Q50 17 75 37 L69 47 H31 Z" fill="#4b4034"/>`;beard=`<path d="M34 76 Q50 111 66 76 Q62 126 50 132 Q38 126 34 76" fill="#5a4a3e"/>`}
    if(p==="shi_wengong"){skin="#c88f69";hair="#141210";cloth="#642b29";accent="#d9af4d";hat=`<path d="M18 38 Q50 7 82 38 L73 50 H27 Z" fill="#272224"/><path d="M45 5 h10 v27 h-10z" fill="#b42d27"/>`;beard=`<path d="M35 76 Q50 106 65 76 Q61 120 50 125 Q39 120 35 76" fill="#181412"/>`;mark=`<path d="M27 51 L43 57 M73 51 L57 57" stroke="#2b1915" stroke-width="4"/>`}
    if(p==="zeng_tu"||p==="zeng_mi"||p==="zeng_suo"||p==="zeng_kui"||p==="zeng_sheng"){skin="#d0a07b";hair="#191613";cloth="#6b4931";accent="#d0a451";hat=`<path d="M21 38 Q50 11 79 38 L72 49 H28 Z" fill="#3d3028"/><path d="M46 10 h8 v22 h-8z" fill="#8f3027"/>`;mark=`<path d="M30 52 L44 57 M70 52 L56 57" stroke="#3c251d" stroke-width="3"/>`}
    if(p==="mob_executioner"){skin="#bc835d";hair="#171513";cloth="#633029";accent="#d2b261";hat=`<path d="M27 36 Q50 15 73 36 L68 47 H32 Z" fill="#222"/>`;mark=`<path d="M25 67 Q50 55 75 67 L72 81 H28 Z" fill="#3a2521"/>`}
    if(p==="mob_prison_guard"){hair="#211b18";cloth="#7a4436";hat=`<path d="M23 37 Q50 15 77 37 L71 48 H29 Z" fill="#4a3930"/><circle cx="50" cy="25" r="5" fill="#a62e29"/>`}
    if(p==="mob_manor"){hair="#30261f";cloth="#6d5538";hat=`<path d="M25 38 Q50 20 75 38 L70 48 H30 Z" fill="#5c4a34"/>`;mark=`<path d="M32 66 l8 3 M68 66 l-8 3" stroke="#4b3024" stroke-width="3"/>`}
    if(p==="mob_manor_boss"){hair="#211a16";cloth="#60452f";accent="#d0a44b";hat=`<path d="M21 37 Q50 11 79 37 L72 49 H28 Z" fill="#372c25"/><path d="M46 11 h8 v21 h-8z" fill="#8d2f27"/>`;beard=`<path d="M37 78 Q50 103 63 78 Q60 115 50 121 Q40 115 37 78" fill="#29201b"/>`}
    if(p==="mob_manor_archer"){hair="#2c241e";cloth="#6e5a3c";hat=`<path d="M24 38 Q50 18 76 38 L70 48 H30 Z" fill="#514536"/>`;mark=`<path d="M73 91 Q87 70 79 50" fill="none" stroke="#6a4525" stroke-width="4"/><path d="M74 52 l10 8" stroke="#bbb3a3" stroke-width="2"/>`}
    if(p==="mob_female_cavalry"){skin="#e8bea0";hair="#211a18";cloth="#74403b";accent="#d6b45b";hat=`<path d="M22 38 Q50 12 78 38 L72 49 H28 Z" fill="#443634"/><path d="M46 14 h8 v18 h-8z" fill="#a9342c"/>`;mark=`<path d="M29 46 Q39 38 48 45 M71 46 Q61 38 52 45" stroke="#3b2821" stroke-width="2.5" fill="none"/>`}
    if(p==="mob_soldier"){hair="#211c18";cloth="#9b4237";hat=`<path d="M25 38 Q50 18 75 38 L70 48 H30 Z" fill="#4d3330"/>`}
    if(p==="mob_sorcerer"){skin="#d7aa87";hair="#2a211c";cloth="#5b3f73";accent="#d7c36a";hat=`<path d="M29 36 Q50 9 71 36 L65 45 H35 Z" fill="#2f2838"/><circle cx="50" cy="17" r="4" fill="#d2bd61"/>`;beard=`<path d="M41 80 Q50 97 59 80 Q56 108 50 114 Q44 108 41 80" fill="#352923"/>`;mark=`<path d="M32 50 Q39 44 46 50 M68 50 Q61 44 54 50" stroke="#422b24" stroke-width="2.5" fill="none"/>`}
    if(p==="mob_captain"){hair="#1d1917";cloth="#7f302a";accent="#d4a74c";hat=`<path d="M22 37 Q50 12 78 37 L72 49 H28 Z" fill="#352b2a"/><path d="M46 14 h8 v18 h-8z" fill="#b7362d"/>`;beard=`<path d="M38 79 Q50 101 62 79 Q59 113 50 119 Q41 113 38 79" fill="#241d1a"/>`}
    if(p==="mob_guard"){hair="#24201c";cloth="#6f4d35";hat=`<path d="M22 37 Q50 14 78 37 L72 48 H28 Z" fill="#5e4936"/>`;mark=`<path d="M32 66 l8 4 M68 66 l-8 4" stroke="#4e3023" stroke-width="3"/>`}
    if(p==="mob_assassin"){skin="#d0a07b";hair="#151413";cloth="#33373b";mark=`<path d="M25 64 Q50 52 75 64 L72 83 H28 Z" fill="#2b2a2c"/>`}
    if(p==="mob_assassin_boss"){skin="#c89470";hair="#111";cloth="#24282c";accent="#9f2f2a";mark=`<path d="M24 61 Q50 48 76 61 L72 84 H28 Z" fill="#1e2022"/><path d="M43 35 l14 0" stroke="#a92f29" stroke-width="4"/>`}
    if(p==="mob_escort"){hair="#211d1a";cloth="#8a6540";hat=`<path d="M25 38 Q50 18 75 38 L70 48 H30 Z" fill="#5a4936"/>`}
    if(p==="mob_escort_boss"){hair="#1d1917";cloth="#745037";hat=`<path d="M22 37 Q50 12 78 37 L72 49 H28 Z" fill="#3e3430"/>`;beard=`<path d="M40 79 Q50 96 60 79 Q57 110 50 116 Q43 110 40 79" fill="#2b231f"/>`}
    if(p==="scroll"){return `<svg viewBox="0 0 100 120"><rect width="100" height="120" fill="#d6bd91"/><path d="M22 16 H78 V104 H22 Z" fill="#f1dfb8" stroke="#6a4b2e" stroke-width="3"/><path d="M31 34 H69 M31 47 H69 M31 60 H62 M31 73 H67" stroke="#75583a" stroke-width="4"/><circle cx="70" cy="87" r="13" fill="none" stroke="#9b382e" stroke-width="4"/></svg>`}
    return `<svg viewBox="0 0 100 120">
      <defs><linearGradient id="bgp" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c5d2c1"/><stop offset="1" stop-color="#8da083"/></linearGradient></defs>
      <rect width="100" height="120" fill="url(#bgp)"/><circle cx="50" cy="59" r="31" fill="${skin}" stroke="#34251a" stroke-width="3"/>
      ${hair?`<path d="M20 53 Q22 19 50 17 Q78 19 80 53 Q70 36 50 36 Q30 36 20 53" fill="${hair}"/>`:""}${hat}
      <path d="M18 120 Q20 88 50 84 Q80 88 82 120 Z" fill="${cloth}" stroke="#34251a" stroke-width="3"/>
      <path d="M34 88 L50 102 L66 88" fill="none" stroke="${accent}" stroke-width="5"/>
      <ellipse cx="39" cy="58" rx="4" ry="3" fill="#241b16"/><ellipse cx="61" cy="58" rx="4" ry="3" fill="#241b16"/>
      <path d="M45 72 Q50 75 55 72" fill="none" stroke="#6d3d2c" stroke-width="2.5"/>${beard}${mark}
      <rect x="2" y="2" width="96" height="116" fill="none" stroke="#6a4c31" stroke-width="4"/>
    </svg>`
  }

  terrainSvg(x,y,type){
    if(type==="water"){return `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#438fc0"/><path d="M0 25 Q18 15 36 25 T72 25 T108 25 M-10 55 Q8 45 26 55 T62 55 T98 55 M0 83 Q18 73 36 83 T72 83 T108 83" fill="none" stroke="#bfe5ef" stroke-width="4" opacity=".7"/></svg>`}
    if(type==="swamp"){return `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#78845f"/><path d="M0 20 Q20 10 40 20 T80 20 T120 20 M-20 61 Q0 49 20 61 T60 61 T100 61" fill="none" stroke="#779c91" stroke-width="10" opacity=".72"/><g stroke="#485f33" stroke-width="3"><path d="M18 94 Q16 65 20 43 M25 94 Q27 65 24 38 M72 96 Q69 68 73 46 M79 96 Q82 70 78 40"/><path d="M15 60 l-10-14 M21 55 l9-16 M69 63 l-10-15 M76 58 l10-18"/></g><ellipse cx="50" cy="78" rx="18" ry="7" fill="#5e7158" opacity=".75"/></svg>`}
    if(type==="forest"){return `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#789e58"/><g fill="#315b2b"><circle cx="22" cy="30" r="17"/><circle cx="52" cy="25" r="19"/><circle cx="78" cy="38" r="16"/><circle cx="34" cy="70" r="18"/><circle cx="70" cy="72" r="19"/></g><path d="M17 95 L24 54 L31 95 M62 96 L70 54 L78 96" fill="#5b4228"/></svg>`}
    if(type==="hill"){return `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#91ad67"/><path d="M-8 95 Q20 45 48 88 Q68 45 108 94 Z" fill="#9c875a"/><path d="M0 95 Q22 64 49 91 M40 94 Q66 58 103 92" fill="none" stroke="#c9b47d" stroke-width="5"/></svg>`}
    if(type==="wall"){return `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#6f665b"/><path d="M0 24H100V100H0Z" fill="#81776b"/><path d="M0 24H22V8H40V24H60V8H78V24H100" fill="#8d8274"/><g stroke="#504940" stroke-width="3" opacity=".85"><path d="M0 42H100 M0 62H100 M0 82H100"/><path d="M18 24V42 M50 24V42 M82 24V42 M34 42V62 M67 42V62 M18 62V82 M50 62V82 M82 62V82 M34 82V100 M67 82V100"/></g><path d="M0 27H100" stroke="#b8aa99" stroke-width="4" opacity=".65"/></svg>`}
    if(type==="mountain"){return `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#788774"/><path d="M-10 100 L25 28 L43 62 L62 13 L110 100 Z" fill="#655f57"/><path d="M13 53 L25 28 L35 49 L43 62 L62 13 L78 47" fill="#d9d6ca" opacity=".9"/><path d="M-5 100 L28 67 L46 84 L69 48 L108 100 Z" fill="#81776a"/></svg>`}
    return `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#94bb6c"/><path d="M18 90 l4-13 l3 13 M66 83 l3-10 l2 10" stroke="#5f8848" stroke-width="3"/><circle cx="${25+(x*13+y*7)%45}" cy="${25+(x*5+y*11)%45}" r="3" fill="#cce19f"/></svg>`
  }

  roadSvg(x,y){
    const c={n:this.isRoad(x,y-1),e:this.isRoad(x+1,y),s:this.isRoad(x,y+1),w:this.isRoad(x-1,y)};let edge="",body="";
    const add=(rx,ry,rw,rh,bx,by,bw,bh)=>{edge+=`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="#765b3e"/>`;body+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#c1a078"/>`};
    if(c.n)add(31,-2,38,54,35,-2,30,54);if(c.e)add(48,31,54,38,48,35,54,30);if(c.s)add(31,48,38,54,35,48,30,54);if(c.w)add(-2,31,54,38,-2,35,54,30);
    if(!c.n&&!c.e&&!c.s&&!c.w)add(31,-2,38,104,35,-2,30,104);
    return `<svg viewBox="0 0 100 100">${edge}${body}<circle cx="50" cy="50" r="21" fill="#765b3e"/><circle cx="50" cy="50" r="17" fill="#c1a078"/><path d="M42 42 l6 4 M59 57 l6 4 M38 62 l8-3" stroke="#917250" stroke-width="3"/></svg>`
  }

  selected(){return this.units.find(u=>u.id===this.selectedUnitId&&u.isAlive)||null}
  pendingFacing(){return this.units.find(u=>u.id===this.pendingFacingUnitId&&u.isAlive)||null}
  unitAt(x,y){return this.units.find(u=>u.isAlive&&u.x===x&&u.y===y)||null}
  alive(team){return this.units.filter(u=>u.team===team&&u.isAlive)}
  terrain(x,y){return this.terrainData[this.map[y][x]]}
  canEnterTerrain(u,type){return this.terrainData[type].pass||(type==="water"&&this.hasWaterTerrainAffinity(u))}
  terrainMoveCost(u,type){
    if((type==="water"||type==="swamp")&&this.hasWaterTerrainAffinity(u)){return 1}
    if(this.hasWildTerrainAffinity(u)){
      if(type==="forest"||type==="hill"){return 1}
      if(type==="mountain"||type==="swamp"){return 2}
    }
    return this.terrainData[type].move
  }
  neighbors(x,y){return[{x,y:y-1},{x:x+1,y},{x,y:y+1},{x:x-1,y}]}
  inside(x,y){return x>=0&&y>=0&&x<this.width&&y<this.height}
  isRoad(x,y){return this.inside(x,y)&&this.map[y][x]==="road"}
  key(x,y){return `${x},${y}`}
  /**
   * 使用者と対象を結ぶ射線上に城壁がないか確認する。
   * 線がマス角を通る場合は斜め方向へ進み、角に触れるだけの城壁は遮断扱いにしない。
   */
  hasClearLineOfSight(source,target){
    if(source===null||source===undefined||target===null||target===undefined){return false}
    if(!this.inside(source.x,source.y)||!this.inside(target.x,target.y)){return false}

    const deltaX=target.x-source.x;
    const deltaY=target.y-source.y;
    const stepCountX=Math.abs(deltaX);
    const stepCountY=Math.abs(deltaY);
    const stepX=Math.sign(deltaX);
    const stepY=Math.sign(deltaY);
    let x=source.x;
    let y=source.y;
    let progressedX=0;
    let progressedY=0;

    while(progressedX<stepCountX||progressedY<stepCountY){
      const decision=(1+2*progressedX)*stepCountY-(1+2*progressedY)*stepCountX;

      if(decision===0){
        x+=stepX;
        y+=stepY;
        progressedX++;
        progressedY++
      }else if(decision<0){
        x+=stepX;
        progressedX++
      }else{
        y+=stepY;
        progressedY++
      }

      if(x===target.x&&y===target.y){break}
      if(this.map[y][x]==="wall"){return false}
    }

    return true
  }

  distance(a,b){return Math.abs(a.x-b.x)+Math.abs(a.y-b.y)}
  direction(fx,fy,tx,ty){const dx=tx-fx,dy=ty-fy;if(Math.abs(dx)>=Math.abs(dy)){return dx>=0?"east":"west"}return dy>=0?"south":"north"}
  opposite(d){return d==="north"?"south":d==="south"?"north":d==="east"?"west":"east"}
  facingJp(d){return d==="north"?"北":d==="south"?"南":d==="east"?"東":"西"}
  nearest(u,team){const a=this.alive(team);a.sort((x,y)=>this.distance(u,x)-this.distance(u,y));return a[0]||null}
  hasAdjacentEnemy(u){return this.units.some(t=>t.isAlive&&t.team!==u.team&&this.distance(u,t)===1)}
  phaseLabel(){const selected=this.selected();if(this.missionActive){return "作戦条件"}if(this.dialogueActive){return "会話"}return this.phase==="enemy"?"敵行動中":this.mode==="move"?"移動先選択":this.mode==="command"?"攻撃・技能・計略・向き指定":this.mode==="strategy-level"?"撹乱レベル選択":this.mode==="strategy"?(this.specialTacticName(selected)!==null?`${this.specialTacticName(selected)}対象選択`:this.isIllusionUser(selected)?"幻術対象選択":`撹乱Lv${this.selectedStrategyLevel}対象選択`):this.mode==="bow"?"弓撃対象選択":this.mode==="charge"?"突撃対象選択":this.mode==="facing"?"最終方向指定":"部隊選択"}
  addLog(m){this.logs.push(m);if(this.logs.length>500)this.logs.shift()}
  wait(ms){
    return new Promise(resolve=>{
      let remaining=Math.max(0,ms);
      let timer=0;
      let startedAt=0;
      let completed=false;

      const cleanup=()=>{
        document.removeEventListener("visibilitychange",handleVisibility)
      };
      const finish=()=>{
        if(completed){return}
        completed=true;
        timer=0;
        cleanup();
        resolve()
      };
      const schedule=()=>{
        if(completed||document.hidden){return}
        if(remaining<=0){finish();return}
        startedAt=performance.now();
        timer=window.setTimeout(finish,remaining)
      };
      const handleVisibility=()=>{
        if(document.hidden){
          if(timer!==0){
            window.clearTimeout(timer);
            timer=0;
            remaining=Math.max(0,remaining-(performance.now()-startedAt))
          }
          return
        }
        schedule()
      };

      document.addEventListener("visibilitychange",handleVisibility);
      schedule()
    })
  }
}

const game=new Game();

(function initTitleScreen(){
  const screen=document.getElementById("titleScreen");
  const prompt=document.getElementById("titlePrompt");
  if(screen===null||prompt===null){return}

  let introStarted=false;
  let ready=false;
  let closed=false;
  let whiteoutTimer=0;
  let titleThemeTimer=0;

  const setReady=()=>{
    ready=true;
    screen.classList.add("ready");
    prompt.innerHTML='TAP HERE TO START<span class="sub">Touch Here to Start</span>';
    prompt.setAttribute("aria-hidden","false")
  };

  const beginIntro=async()=>{
    if(introStarted||closed){return}
    introStarted=true;
    prompt.setAttribute("aria-hidden","true");

    try{
      await game.audio.prepareSeOnly()
    }catch(error){}

    screen.classList.add("intro");
    game.audio.titleThunder();
    whiteoutTimer=window.setTimeout(()=>game.audio.titleWhiteoutHiss(),2900);
    titleThemeTimer=window.setTimeout(()=>{game.audio.startTitleThemeLoop().catch(()=>{})},6620);
    window.setTimeout(setReady,6770)
  };

  const startGame=async()=>{
    if(!ready||closed){return}
    closed=true;
    if(whiteoutTimer!==0){
      window.clearTimeout(whiteoutTimer);
      whiteoutTimer=0
    }
    if(titleThemeTimer!==0){
      window.clearTimeout(titleThemeTimer);
      titleThemeTimer=0
    }
    try{
      await game.audio.prepareSeOnly()
    }catch(error){}
    game.audio.button();
    game.audio.startStageSelectThemeLoop().catch(()=>{});
    screen.classList.add("leaving");
    window.setTimeout(()=>{
      screen.classList.remove("active");
      screen.style.display="none";
      game.showRecoveryPromptAfterOpening()
    },460)
  };

  const handleTitleTap=async()=>{
    if(!introStarted){
      await beginIntro();
      return
    }
    if(ready){
      await startGame()
    }
  };

  prompt.setAttribute("aria-hidden","true");
  screen.addEventListener("click",handleTitleTap)
})();

