"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validators/searchForm";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SearchForm({
  handleSearch,
}: {
  handleSearch: (
    targetPage: number,
    isNewSearch: boolean,
    deptCode: string,
    courseName: string,
    instructor: string,
  ) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deptCode: "0000",
      courseName: "",
      instructor: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await handleSearch(
      1,
      true,
      values.deptCode || "",
      values.courseName || "",
      values.instructor || "",
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:grid md:grid-cols-3 md:items-end md:gap-2 space-y-2 ">
          <FormField
            control={form.control}
            name="deptCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>系所名稱</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.handleSubmit(onSubmit)();
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="系所名稱與代碼" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0000">全部</SelectItem>
                    <SelectItem value="0020">0020 體育室 </SelectItem>
                    <SelectItem value="0030">0030 軍訓室 </SelectItem>
                    <SelectItem value="0040">
                      0040 外語教學暨資源中心{" "}
                    </SelectItem>
                    <SelectItem value="0050">0050 學務處課外活動組 </SelectItem>
                    <SelectItem value="1000">1000 文學院 </SelectItem>
                    <SelectItem value="1010">1010 中國文學系 </SelectItem>
                    <SelectItem value="1020">1020 外國語文學系 </SelectItem>
                    <SelectItem value="1030">1030 歷史學系 </SelectItem>
                    <SelectItem value="1040">1040 哲學系 </SelectItem>
                    <SelectItem value="1050">1050 人類學系 </SelectItem>
                    <SelectItem value="1060">1060 圖書資訊學系 </SelectItem>
                    <SelectItem value="1070">1070 日本語文學系 </SelectItem>
                    <SelectItem value="1080">1080 應用英語學系 </SelectItem>
                    <SelectItem value="1090">1090 戲劇學系 </SelectItem>
                    <SelectItem value="1210">1210 中國文學研究所 </SelectItem>
                    <SelectItem value="1220">1220 外國語文學研究所 </SelectItem>
                    <SelectItem value="1230">1230 歷史學研究所 </SelectItem>
                    <SelectItem value="1240">1240 哲學研究所 </SelectItem>
                    <SelectItem value="1250">1250 人類學研究所 </SelectItem>
                    <SelectItem value="1260">1260 圖書資訊學研究所 </SelectItem>
                    <SelectItem value="1270">1270 日本語文學研究所 </SelectItem>
                    <SelectItem value="1290">1290 戲劇學研究所 </SelectItem>
                    <SelectItem value="1410">1410 藝術史研究所 </SelectItem>
                    <SelectItem value="1420">1420 語言學研究所 </SelectItem>
                    <SelectItem value="1440">1440 音樂學研究所 </SelectItem>
                    <SelectItem value="1450">1450 臺灣文學研究所 </SelectItem>
                    <SelectItem value="1460">
                      1460 華語教學碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="1470">1470 翻譯碩士學位學程 </SelectItem>
                    <SelectItem value="2000">2000 理學院 </SelectItem>
                    <SelectItem value="2010">2010 數學系 </SelectItem>
                    <SelectItem value="2020">2020 物理學系 </SelectItem>
                    <SelectItem value="2030">2030 化學系 </SelectItem>
                    <SelectItem value="2040">2040 地質科學系 </SelectItem>
                    <SelectItem value="2050">2050 動物學系 </SelectItem>
                    <SelectItem value="2060">2060 植物學系 </SelectItem>
                    <SelectItem value="2070">2070 心理學系 </SelectItem>
                    <SelectItem value="2080">2080 地理環境資源學系 </SelectItem>
                    <SelectItem value="2090">2090 大氣科學系 </SelectItem>
                    <SelectItem value="2210">2210 數學研究所 </SelectItem>
                    <SelectItem value="2220">2220 物理學研究所 </SelectItem>
                    <SelectItem value="2230">2230 化學研究所 </SelectItem>
                    <SelectItem value="2240">2240 地質科學研究所 </SelectItem>
                    <SelectItem value="2250">2250 動物學研究所 </SelectItem>
                    <SelectItem value="2260">2260 植物學研究所 </SelectItem>
                    <SelectItem value="2270">2270 心理學研究所 </SelectItem>
                    <SelectItem value="2280">
                      2280 地理環境資源學研究所{" "}
                    </SelectItem>
                    <SelectItem value="2290">2290 大氣科學研究所 </SelectItem>
                    <SelectItem value="2410">2410 海洋研究所 </SelectItem>
                    <SelectItem value="2440">2440 天文物理研究所 </SelectItem>
                    <SelectItem value="2450">2450 應用物理學研究所 </SelectItem>
                    <SelectItem value="2460">
                      2460 應用數學科學研究所{" "}
                    </SelectItem>
                    <SelectItem value="2470">
                      2470 氣候變遷與永續發展國際學位學程{" "}
                    </SelectItem>
                    <SelectItem value="2480">
                      2480 氣候變遷與永續發展國際博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="2490">
                      2490 地球系統科學國際研究生博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="2500">
                      2500 統計與數據科學研究所{" "}
                    </SelectItem>
                    <SelectItem value="3000">3000 社會科學院 </SelectItem>
                    <SelectItem value="3020">3020 政治學系 </SelectItem>
                    <SelectItem value="3030">3030 經濟學系 </SelectItem>
                    <SelectItem value="3050">3050 社會學系 </SelectItem>
                    <SelectItem value="3100">3100 社會工作學系 </SelectItem>
                    <SelectItem value="3220">3220 政治學研究所 </SelectItem>
                    <SelectItem value="3230">3230 經濟學研究所 </SelectItem>
                    <SelectItem value="3250">3250 社會學研究所 </SelectItem>
                    <SelectItem value="3300">3300 社會工作學研究所 </SelectItem>
                    <SelectItem value="3410">3410 國家發展研究所 </SelectItem>
                    <SelectItem value="3420">3420 新聞研究所 </SelectItem>
                    <SelectItem value="3430">3430 公共事務研究所 </SelectItem>
                    <SelectItem value="4000">4000 醫學院 </SelectItem>
                    <SelectItem value="4010">4010 醫學系 </SelectItem>
                    <SelectItem value="4020">4020 牙醫學系 </SelectItem>
                    <SelectItem value="4030">4030 藥學系 </SelectItem>
                    <SelectItem value="4040">
                      4040 醫學檢驗暨生物技術學系{" "}
                    </SelectItem>
                    <SelectItem value="4060">4060 護理學系 </SelectItem>
                    <SelectItem value="4080">4080 物理治療學系 </SelectItem>
                    <SelectItem value="4090">4090 職能治療學系 </SelectItem>
                    <SelectItem value="4120">4120 學士後護理學系 </SelectItem>
                    <SelectItem value="4200">
                      4200 醫學院暨公共衛生學院共同課程{" "}
                    </SelectItem>
                    <SelectItem value="4210">4210 臨床醫學研究所 </SelectItem>
                    <SelectItem value="4220">4220 臨床牙醫學研究所 </SelectItem>
                    <SelectItem value="4230">4230 藥學研究所 </SelectItem>
                    <SelectItem value="4240">
                      4240 醫學檢驗暨生物技術學研究所{" "}
                    </SelectItem>
                    <SelectItem value="4260">4260 護理學研究所 </SelectItem>
                    <SelectItem value="4280">4280 物理治療學研究所 </SelectItem>
                    <SelectItem value="4290">4290 職能治療學研究所 </SelectItem>
                    <SelectItem value="4410">4410 生理學研究所 </SelectItem>
                    <SelectItem value="4420">
                      4420 生物化學暨分子生物學研究所{" "}
                    </SelectItem>
                    <SelectItem value="4430">4430 藥理學研究所 </SelectItem>
                    <SelectItem value="4440">4440 病理學研究所 </SelectItem>
                    <SelectItem value="4450">4450 微生物學研究所 </SelectItem>
                    <SelectItem value="4460">
                      4460 解剖學暨細胞生物學研究所{" "}
                    </SelectItem>
                    <SelectItem value="4470">4470 毒理學研究所 </SelectItem>
                    <SelectItem value="4480">4480 分子醫學研究所 </SelectItem>
                    <SelectItem value="4490">4490 免疫學研究所 </SelectItem>
                    <SelectItem value="4500">
                      4500 口腔生物科學研究所{" "}
                    </SelectItem>
                    <SelectItem value="4510">4510 臨床藥學研究所 </SelectItem>
                    <SelectItem value="4520">4520 法醫學研究所 </SelectItem>
                    <SelectItem value="4530">4530 腫瘤醫學研究所 </SelectItem>
                    <SelectItem value="4540">
                      4540 腦與心智科學研究所{" "}
                    </SelectItem>
                    <SelectItem value="4550">
                      4550 基因體暨蛋白體醫學研究所{" "}
                    </SelectItem>
                    <SelectItem value="4560">
                      4560 轉譯醫學博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="4570">
                      4570 醫學教育暨生醫倫理研究所{" "}
                    </SelectItem>
                    <SelectItem value="4580">
                      4580 醫療器材與醫學影像研究所{" "}
                    </SelectItem>
                    <SelectItem value="4590">
                      4590 國際三校農業生技與健康醫療碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="5000">5000 工學院 </SelectItem>
                    <SelectItem value="5010">5010 土木工程學系 </SelectItem>
                    <SelectItem value="5020">5020 機械工程學系 </SelectItem>
                    <SelectItem value="5040">5040 化學工程學系 </SelectItem>
                    <SelectItem value="5050">
                      5050 工程科學及海洋工程學系{" "}
                    </SelectItem>
                    <SelectItem value="5070">
                      5070 材料科學與工程學系{" "}
                    </SelectItem>
                    <SelectItem value="5080">5080 醫學工程學系 </SelectItem>
                    <SelectItem value="5090">
                      5090 智慧工程科技全英語學士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="50A0">50A0 工學院院學士學位 </SelectItem>
                    <SelectItem value="5210">5210 土木工程學研究所 </SelectItem>
                    <SelectItem value="5220">5220 機械工程學研究所 </SelectItem>
                    <SelectItem value="5240">5240 化學工程學研究所 </SelectItem>
                    <SelectItem value="5250">
                      5250 工程科學及海洋工程學研究所{" "}
                    </SelectItem>
                    <SelectItem value="5270">
                      5270 材料科學與工程學研究所{" "}
                    </SelectItem>
                    <SelectItem value="5280">5280 醫學工程學研究所 </SelectItem>
                    <SelectItem value="5410">5410 環境工程學研究所 </SelectItem>
                    <SelectItem value="5430">5430 應用力學研究所 </SelectItem>
                    <SelectItem value="5440">5440 建築與城鄉研究所 </SelectItem>
                    <SelectItem value="5460">5460 工業工程學研究所 </SelectItem>
                    <SelectItem value="5480">5480 醫學工程學研究所 </SelectItem>
                    <SelectItem value="5490">
                      5490 高分子科學與工程學研究所{" "}
                    </SelectItem>
                    <SelectItem value="5500">
                      5500 綠色永續材料與精密元件博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="5510">
                      5510 分子科學與技術國際研究生博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="5520">
                      5520 永續化學科技國際研究生博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="6000">6000 生物資源暨農學院 </SelectItem>
                    <SelectItem value="6010">6010 農藝學系 </SelectItem>
                    <SelectItem value="6020">
                      6020 生物環境系統工程學系{" "}
                    </SelectItem>
                    <SelectItem value="6030">6030 農業化學系 </SelectItem>
                    <SelectItem value="6032">6032 農產製造組 </SelectItem>
                    <SelectItem value="6040">6040 植物病蟲害學系 </SelectItem>
                    <SelectItem value="6050">
                      6050 森林環境暨資源學系{" "}
                    </SelectItem>
                    <SelectItem value="6060">6060 動物科學技術學系 </SelectItem>
                    <SelectItem value="6070">6070 農業經濟學系 </SelectItem>
                    <SelectItem value="6080">6080 園藝暨景觀學系 </SelectItem>
                    <SelectItem value="6090">6090 獸醫學系 </SelectItem>
                    <SelectItem value="6100">
                      6100 生物產業傳播暨發展學系{" "}
                    </SelectItem>
                    <SelectItem value="6110">6110 生物機電工程學系 </SelectItem>
                    <SelectItem value="6120">6120 昆蟲學系 </SelectItem>
                    <SelectItem value="6130">
                      6130 植物病理與微生物學系{" "}
                    </SelectItem>
                    <SelectItem value="6150">
                      6150 生物科技與食品營養學士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="6210">6210 農藝學研究所 </SelectItem>
                    <SelectItem value="6220">
                      6220 生物環境系統工程學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6230">6230 農業化學研究所 </SelectItem>
                    <SelectItem value="6250">
                      6250 森林環境暨資源學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6260">
                      6260 動物科學技術學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6270">6270 農業經濟學研究所 </SelectItem>
                    <SelectItem value="6280">
                      6280 園藝暨景觀學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6290">6290 獸醫學研究所 </SelectItem>
                    <SelectItem value="6300">
                      6300 生物產業傳播暨發展學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6310">
                      6310 生物機電工程學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6320">6320 昆蟲學研究所 </SelectItem>
                    <SelectItem value="6330">
                      6330 植物病理與微生物學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6410">6410 食品科技研究所 </SelectItem>
                    <SelectItem value="6420">6420 生物科技研究所 </SelectItem>
                    <SelectItem value="6430">
                      6430 臨床動物醫學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6440">
                      6440 分子暨比較病理生物學研究所{" "}
                    </SelectItem>
                    <SelectItem value="6450">
                      6450 植物醫學碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="7000">7000 管理學院 </SelectItem>
                    <SelectItem value="7010">7010 工商管理學系 </SelectItem>
                    <SelectItem value="7020">7020 會計學系 </SelectItem>
                    <SelectItem value="7030">7030 財務金融學系 </SelectItem>
                    <SelectItem value="7040">7040 國際企業學系 </SelectItem>
                    <SelectItem value="7050">7050 資訊管理學系 </SelectItem>
                    <SelectItem value="7060">7060 企業管理學系 </SelectItem>
                    <SelectItem value="7220">7220 會計學研究所 </SelectItem>
                    <SelectItem value="7230">7230 財務金融學研究所 </SelectItem>
                    <SelectItem value="7240">7240 國際企業學研究所 </SelectItem>
                    <SelectItem value="7250">7250 資訊管理學研究所 </SelectItem>
                    <SelectItem value="7400">
                      7400 高階管理碩士專班(EMBA){" "}
                    </SelectItem>
                    <SelectItem value="7410">7410 商學研究所 </SelectItem>
                    <SelectItem value="7420">7420 管院知識管理組 </SelectItem>
                    <SelectItem value="7430">
                      7430 管理學院高階公共管理組{" "}
                    </SelectItem>
                    <SelectItem value="7440">
                      7440 管理學院會計與管理決策組{" "}
                    </SelectItem>
                    <SelectItem value="7450">
                      7450 管理學院財務金融組{" "}
                    </SelectItem>
                    <SelectItem value="7460">
                      7460 管理學院國際企業管理組{" "}
                    </SelectItem>
                    <SelectItem value="7470">
                      7470 管理學院資訊管理組{" "}
                    </SelectItem>
                    <SelectItem value="7480">7480 管理學院商學組 </SelectItem>
                    <SelectItem value="7490">
                      7490 管理學院企業管理碩士專班(GMBA){" "}
                    </SelectItem>
                    <SelectItem value="7500">7500 臺大-復旦EMBA </SelectItem>
                    <SelectItem value="7510">
                      7510 創業創新管理碩士在職專班{" "}
                    </SelectItem>
                    <SelectItem value="8000">8000 公共衛生學院 </SelectItem>
                    <SelectItem value="8010">8010 公共衛生學系 </SelectItem>
                    <SelectItem value="8410">
                      8410 職業醫學與工業衛生研究所{" "}
                    </SelectItem>
                    <SelectItem value="8420">8420 流行病學研究所 </SelectItem>
                    <SelectItem value="8430">
                      8430 醫療機構管理研究所{" "}
                    </SelectItem>
                    <SelectItem value="8440">8440 環境衛生研究所 </SelectItem>
                    <SelectItem value="8450">
                      8450 衛生政策與管理研究所{" "}
                    </SelectItem>
                    <SelectItem value="8470">
                      8470 公共衛生碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="8480">
                      8480 健康政策與管理研究所{" "}
                    </SelectItem>
                    <SelectItem value="8490">
                      8490 流行病學與預防醫學研究所{" "}
                    </SelectItem>
                    <SelectItem value="8500">
                      8500 健康行為與社區科學研究所{" "}
                    </SelectItem>
                    <SelectItem value="8510">
                      8510 食品安全與健康研究所{" "}
                    </SelectItem>
                    <SelectItem value="8520">
                      8520 環境與職業健康科學研究所{" "}
                    </SelectItem>
                    <SelectItem value="8530">
                      8530 全球衛生碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="8540">
                      8540 全球衛生博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="8550">
                      8550 健康數據拓析統計研究所{" "}
                    </SelectItem>
                    <SelectItem value="9000">9000 電機資訊學院 </SelectItem>
                    <SelectItem value="9010">9010 電機工程學系 </SelectItem>
                    <SelectItem value="9020">9020 資訊工程學系 </SelectItem>
                    <SelectItem value="9210">9210 電機工程學研究所 </SelectItem>
                    <SelectItem value="9220">9220 資訊工程學研究所 </SelectItem>
                    <SelectItem value="9410">9410 光電工程學研究所 </SelectItem>
                    <SelectItem value="9420">9420 電信工程學研究所 </SelectItem>
                    <SelectItem value="9430">9430 電子工程學研究所 </SelectItem>
                    <SelectItem value="9440">
                      9440 資訊網路與多媒體研究所{" "}
                    </SelectItem>
                    <SelectItem value="9450">
                      9450 生醫電子與資訊學研究所{" "}
                    </SelectItem>
                    <SelectItem value="9460">
                      9460 資料科學碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="9470">
                      9470 生物資訊學國際研究生學位學程{" "}
                    </SelectItem>
                    <SelectItem value="9480">
                      9480 資料科學博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="9490">
                      9490 智慧聯網國際研究生博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="A000">A000 法律學院 </SelectItem>
                    <SelectItem value="A010">A010 法律學系 </SelectItem>
                    <SelectItem value="A210">A210 法律研究所 </SelectItem>
                    <SelectItem value="A410">
                      A410 科際整合法律學研究所{" "}
                    </SelectItem>
                    <SelectItem value="B000">B000 生命科學院 </SelectItem>
                    <SelectItem value="B010">B010 生命科學系 </SelectItem>
                    <SelectItem value="B020">B020 生化科技學系 </SelectItem>
                    <SelectItem value="B0A0">
                      B0A0 生命科學院院學士學位{" "}
                    </SelectItem>
                    <SelectItem value="B210">B210 生命科學所 </SelectItem>
                    <SelectItem value="B220">B220 生化科技研究所 </SelectItem>
                    <SelectItem value="B420">B420 植物科學研究所 </SelectItem>
                    <SelectItem value="B430">
                      B430 分子與細胞生物學研究所{" "}
                    </SelectItem>
                    <SelectItem value="B440">
                      B440 生態學與演化生物學研究所{" "}
                    </SelectItem>
                    <SelectItem value="B450">B450 漁業科學研究所 </SelectItem>
                    <SelectItem value="B460">B460 生化科學研究所 </SelectItem>
                    <SelectItem value="B470">
                      B470 微生物與生化學研究所{" "}
                    </SelectItem>
                    <SelectItem value="B480">
                      B480 基因體與系統生物學學位學程{" "}
                    </SelectItem>
                    <SelectItem value="B490">
                      B490 跨領域神經科學國際研究生博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="B500">
                      B500 植物生物科技產學研發博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="E000">E000 進修推廣學院 </SelectItem>
                    <SelectItem value="E410">
                      E410 事業經營碩士在職學位學程{" "}
                    </SelectItem>
                    <SelectItem value="E420">
                      E420 事業經營法務碩士在職學位學程{" "}
                    </SelectItem>
                    <SelectItem value="E430">
                      E430 生物科技管理碩士在職學位學程{" "}
                    </SelectItem>
                    <SelectItem value="G010">G010 台北教育大學 </SelectItem>
                    <SelectItem value="H000">H000 共同教育中心 </SelectItem>
                    <SelectItem value="H010">H010 通識教育組 </SelectItem>
                    <SelectItem value="H020">H020 共同教育組 </SelectItem>
                    <SelectItem value="H040">
                      H040 國際體育運動事務學士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="H050">H050 校學士學位 </SelectItem>
                    <SelectItem value="H060">
                      H060 國際半導體學士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="H410">H410 統計碩士學位學程 </SelectItem>
                    <SelectItem value="H420">
                      H420 運動設施與健康管理碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="I000">I000 國際學院 </SelectItem>
                    <SelectItem value="H430">
                      H430 全球農業科技與基因體科學碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="H440">
                      H440 生物多樣性國際碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="H450">
                      H450 智慧醫療與健康資訊碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="H460">
                      H460 防災減害與韌性碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="J000">J000 產業研發碩士專班 </SelectItem>
                    <SelectItem value="J100">
                      J100 電機電信電子產業研發碩士專班{" "}
                    </SelectItem>
                    <SelectItem value="J110">
                      J110 資訊產業研發碩士專班{" "}
                    </SelectItem>
                    <SelectItem value="K000">K000 重點科技研究學院 </SelectItem>
                    <SelectItem value="K010">K010 國立臺灣師範大學 </SelectItem>
                    <SelectItem value="K020">K020 國立臺灣科技大學 </SelectItem>
                    <SelectItem value="K030">K030 國立臺北教育大學 </SelectItem>
                    <SelectItem value="K410">
                      K410 積體電路設計與自動化碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="K420">
                      K420 積體電路設計與自動化博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="K430">
                      K430 元件材料與異質整合碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="K440">
                      K440 元件材料與異質整合博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="K450">
                      K450 奈米工程與科學碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="K460">
                      K460 奈米工程與科學博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="K470">
                      K470 精準健康碩士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="K480">
                      K480 精準健康博士學位學程{" "}
                    </SelectItem>
                    <SelectItem value="Q010">Q010 寫作教學中心 </SelectItem>
                    <SelectItem value="Q020">
                      Q020 生命教育研發育成中心{" "}
                    </SelectItem>
                    <SelectItem value="V410">
                      V410 國家理論科學研究中心{" "}
                    </SelectItem>
                    <SelectItem value="V420">
                      V420 人口與性別研究中心{" "}
                    </SelectItem>
                    <SelectItem value="Z000">Z000 創新設計學院 </SelectItem>
                    <SelectItem value="Z010">
                      Z010 創新領域學士學位學程{" "}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>課程名稱</FormLabel>
                <FormControl>
                  <Input placeholder="搜尋課程名稱" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>授課教師</FormLabel>
                <FormControl>
                  <Input placeholder="搜尋授課教師" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="button"
          className="mr-4"
          variant="secondary"
          onClick={async () => {
            form.reset();
            await form.handleSubmit(onSubmit)();
          }}
        >
          重設條件
        </Button>
        <Button type="submit">搜尋</Button>
      </form>
    </Form>
  );
}
