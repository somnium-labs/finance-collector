ALTER TABLE `finance`.`daily_price`
PARTITION BY RANGE(YEAR(date)) PARTITIONS 100(
PARTITION part0 VALUES LESS THAN (1990),
PARTITION part1 VALUES LESS THAN (1991),
PARTITION part2 VALUES LESS THAN (1992),
PARTITION part3 VALUES LESS THAN (1993),
PARTITION part4 VALUES LESS THAN (1994),
PARTITION part5 VALUES LESS THAN (1995),
PARTITION part6 VALUES LESS THAN (1996),
PARTITION part7 VALUES LESS THAN (1997),
PARTITION part8 VALUES LESS THAN (1998),
PARTITION part9 VALUES LESS THAN (1999),
PARTITION part10 VALUES LESS THAN (2000),
PARTITION part11 VALUES LESS THAN (2001),
PARTITION part12 VALUES LESS THAN (2002),
PARTITION part13 VALUES LESS THAN (2003),
PARTITION part14 VALUES LESS THAN (2004),
PARTITION part15 VALUES LESS THAN (2005),
PARTITION part16 VALUES LESS THAN (2006),
PARTITION part17 VALUES LESS THAN (2007),
PARTITION part18 VALUES LESS THAN (2008),
PARTITION part19 VALUES LESS THAN (2009),
PARTITION part20 VALUES LESS THAN (2010),
PARTITION part21 VALUES LESS THAN (2011),
PARTITION part22 VALUES LESS THAN (2012),
PARTITION part23 VALUES LESS THAN (2013),
PARTITION part24 VALUES LESS THAN (2014),
PARTITION part25 VALUES LESS THAN (2015),
PARTITION part26 VALUES LESS THAN (2016),
PARTITION part27 VALUES LESS THAN (2017),
PARTITION part28 VALUES LESS THAN (2018),
PARTITION part29 VALUES LESS THAN (2019),
PARTITION part30 VALUES LESS THAN (2020),
PARTITION part31 VALUES LESS THAN (2021),
PARTITION part32 VALUES LESS THAN (2022),
PARTITION part33 VALUES LESS THAN (2023),
PARTITION part34 VALUES LESS THAN (2024),
PARTITION part35 VALUES LESS THAN (2025),
PARTITION part36 VALUES LESS THAN (2026),
PARTITION part37 VALUES LESS THAN (2027),
PARTITION part38 VALUES LESS THAN (2028),
PARTITION part39 VALUES LESS THAN (2029),
PARTITION part40 VALUES LESS THAN (2030),
PARTITION part41 VALUES LESS THAN (2031),
PARTITION part42 VALUES LESS THAN (2032),
PARTITION part43 VALUES LESS THAN (2033),
PARTITION part44 VALUES LESS THAN (2034),
PARTITION part45 VALUES LESS THAN (2035),
PARTITION part46 VALUES LESS THAN (2036),
PARTITION part47 VALUES LESS THAN (2037),
PARTITION part48 VALUES LESS THAN (2038),
PARTITION part49 VALUES LESS THAN (2039),
PARTITION part50 VALUES LESS THAN (2040),
PARTITION part51 VALUES LESS THAN (2041),
PARTITION part52 VALUES LESS THAN (2042),
PARTITION part53 VALUES LESS THAN (2043),
PARTITION part54 VALUES LESS THAN (2044),
PARTITION part55 VALUES LESS THAN (2045),
PARTITION part56 VALUES LESS THAN (2046),
PARTITION part57 VALUES LESS THAN (2047),
PARTITION part58 VALUES LESS THAN (2048),
PARTITION part59 VALUES LESS THAN (2049),
PARTITION part60 VALUES LESS THAN (2050),
PARTITION part61 VALUES LESS THAN (2051),
PARTITION part62 VALUES LESS THAN (2052),
PARTITION part63 VALUES LESS THAN (2053),
PARTITION part64 VALUES LESS THAN (2054),
PARTITION part65 VALUES LESS THAN (2055),
PARTITION part66 VALUES LESS THAN (2056),
PARTITION part67 VALUES LESS THAN (2057),
PARTITION part68 VALUES LESS THAN (2058),
PARTITION part69 VALUES LESS THAN (2059),
PARTITION part70 VALUES LESS THAN (2060),
PARTITION part71 VALUES LESS THAN (2061),
PARTITION part72 VALUES LESS THAN (2062),
PARTITION part73 VALUES LESS THAN (2063),
PARTITION part74 VALUES LESS THAN (2064),
PARTITION part75 VALUES LESS THAN (2065),
PARTITION part76 VALUES LESS THAN (2066),
PARTITION part77 VALUES LESS THAN (2067),
PARTITION part78 VALUES LESS THAN (2068),
PARTITION part79 VALUES LESS THAN (2069),
PARTITION part80 VALUES LESS THAN (2070),
PARTITION part81 VALUES LESS THAN (2071),
PARTITION part82 VALUES LESS THAN (2072),
PARTITION part83 VALUES LESS THAN (2073),
PARTITION part84 VALUES LESS THAN (2074),
PARTITION part85 VALUES LESS THAN (2075),
PARTITION part86 VALUES LESS THAN (2076),
PARTITION part87 VALUES LESS THAN (2077),
PARTITION part88 VALUES LESS THAN (2078),
PARTITION part89 VALUES LESS THAN (2079),
PARTITION part90 VALUES LESS THAN (2080),
PARTITION part91 VALUES LESS THAN (2081),
PARTITION part92 VALUES LESS THAN (2082),
PARTITION part93 VALUES LESS THAN (2083),
PARTITION part94 VALUES LESS THAN (2084),
PARTITION part95 VALUES LESS THAN (2085),
PARTITION part96 VALUES LESS THAN (2086),
PARTITION part97 VALUES LESS THAN (2087),
PARTITION part98 VALUES LESS THAN (2088),
PARTITION part99 VALUES LESS THAN (2089));