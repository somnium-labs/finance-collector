import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

/**
 * *손익계산서(연결)
 */
@Table({
    tableName: 'income_statement',
    underscored: true,
    timestamps: false, // Do not create createdAt, UpdatedAt
})
export default class IncomeStatement extends Model<IncomeStatement> {
    @PrimaryKey
    @Column
    public code: string;

    @PrimaryKey
    @Column(DataType.STRING)
    public unitPeriod: string; // year, quater

    @PrimaryKey
    @Column
    public date: string;

    // 매출액
    @Column(DataType.INTEGER)
    public sales: number;

    // @Column(DataType.INTEGER)
    // public 매출액_건설계약으로인한수익: number;

    // @Column(DataType.INTEGER)
    // public 매출액_내수: number;

    // @Column(DataType.INTEGER)
    // public 매출액_수출: number;

    // @Column(DataType.INTEGER)
    // public 매출액_기타: number;

    // 매출원가
    @Column(DataType.INTEGER)
    public costOfSales: number;

    // @Column(DataType.INTEGER)
    // public 매출원가_원재료: number;

    // @Column(DataType.INTEGER)
    // public 매출원가_재고자산의변동: number;

    // @Column(DataType.INTEGER)
    // public 매출원가_기타원가: number;

    // @Column(DataType.INTEGER)
    // public 매출원가_인건비: number;

    // @Column(DataType.INTEGER)
    // public 매출원가_감가상각비: number;

    // @Column(DataType.INTEGER)
    // public 매출원가_기타: number;

    // 매출총이익
    @Column(DataType.INTEGER)
    public grossProfit: number;

    // 판매비와관리비
    @Column(DataType.INTEGER)
    public sellingAndAdministrativeExpenses: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_급여: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_퇴직급여: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_복리후생비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_임차료: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_수도광열비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_전산처리비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_지급수수료: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_용역비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_수출비용: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_판매수수료: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_판매촉진비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_광고선전비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_애프터서비스비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_운반비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_포장비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_연구개발비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_개발비상각: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_대손상각비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_감가상각비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_무형자산상각비: number;

    // @Column(DataType.INTEGER)
    // public 판매비와관리비_기타: number;

    // 영업이익
    @Column(DataType.INTEGER)
    public operatingIncome: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융손익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_이자수익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_외환거래이익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_외환거래이익_외환차익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_외환거래이익_외화환산이익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_외환거래이익_기타: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_배당금수익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_금융자산처분이익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_금융자산평가이익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_파생상품이익: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융수익_기타: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_이자비용: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_외환거래손실: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_외환거래손실_외환차손: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_외환거래손실_외화환산손실: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_외환거래손실_기타: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_대손상각비: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_금융자산처분손실: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_금융자산평가손실: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_파생상품손실: number;

    // @Column(DataType.INTEGER)
    // public 영업이익_금융원가_기타: number;

    // 영업외수익
    // @Column(DataType.INTEGER)
    // public nonOperatingIncome: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_이자수익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_외환거래이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_외환거래이익_외환차익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_외환거래이익_외화환산이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_외환거래이익_기타: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_수수료수익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_배당금수익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_임대료: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_로열티수익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_투자부동산처분이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_투자자산처분이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_유형리스자산처분이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_무형자산처분이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_기타자산처분이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_파생상품이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_자산손상차손환입: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_대손충당금환입: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_자산평가이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_지분법관련이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_채무면제이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외수익_기타: number;

    // // 영업외비용
    // @Column(DataType.INTEGER)
    // public nonOperatingExpense: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_이자비용: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_외환거래손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_외환거래손실_외환차손: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_외환거래손실_외화환산손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_외환거래손실_기타: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_기타대손상각비: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_기부금: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_투자부동산처분손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_투자자산처분손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_유형리스자산처분손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_무형자산처분손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_기타자산처분손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_파생상품손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_자산손상차손: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_자산평가손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_지분법관련손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_사채상환손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_기타영업외비용_기타: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_지분법손익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_지분법손익_지분법이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_지분법손익_지분법손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_지분법손익_지분법적용투자주식손상차손: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_지분법손익_기타: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_관계기업처분손익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_관계기업처분손익_관계기업처분이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_관계기업처분손익_관계기업처분손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_관계기업처분손익_관계기업손상차손: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_관계기업처분손익_기타: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_종속기업관련손익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_종속기업관련손익_종속기업처분이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_종속기업관련손익_종속기업처분손실: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_종속기업관련손익_종속기업손상차손: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_종속기업관련손익_기타: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_기타: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_법인세비용차감전계속사업이익: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_종속기업및관계기업관련손익_법인세비용: number;

    // 법인세비용차감전계속사업이익
    @Column(DataType.INTEGER)
    public continuingOperationsIncomeBeforeIncomeTax: number;

    // @Column(DataType.INTEGER)
    // public 기타영업외손익_중단사업이익: number;

    // 당기순이익
    @Column(DataType.INTEGER)
    public netIncome: number;

    // 당기순이익(지배)
    @Column(DataType.INTEGER)
    public controllingInterest: number;

    // 당기순이익(비지배)
    @Column(DataType.INTEGER)
    public nonControllingInterest: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익_금융자산평가손익: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익_매도가능금융자산평가손익: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익_관계기업등기타포괄이익: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익_해외사업환산손익: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익_현금흐름위험회피평가손익: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익_재평가손익: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익_기타포괄이익관련법인세: number;

    // @Column(DataType.INTEGER)
    // public 당기순이익_기타포괄이익_기타: number;

    // @Column(DataType.INTEGER)
    // public 총포괄이익: number;

    // @Column(DataType.INTEGER)
    // public 총포괄이익_지배지분총포괄이익: number;

    // @Column(DataType.INTEGER)
    // public 총포괄이익_비지배지분총포괄이익: number;

    @Column({ field: 'EPS', type: DataType.INTEGER })
    public EPS: number;

    @Column({ field: 'EBITDA', type: DataType.INTEGER })
    public EBITDA: number;

    // 주가(해당 년도/분기 마지막 거래일)
    @Column(DataType.INTEGER)
    public stockPrice: number;

    // 시가총액
    @Column(DataType.INTEGER)
    public marketCap: number;

    // 주가/EPS
    @Column({ field: 'PER', type: DataType.FLOAT })
    public PER: number;

    // 주당배당금
    @Column({ field: 'DPS', type: DataType.INTEGER })
    public DPS: number;
}
