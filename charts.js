/**
 * Agricultura de Gravatá - Charts JavaScript
 */

// Importar Chart.js se não estiver disponível no escopo global
if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    document.head.appendChild(script);
    
    // Plugin de datalabels
    const datalabelsScript = document.createElement('script');
    datalabelsScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0';
    datalabelsScript.async = true;
    document.head.appendChild(datalabelsScript);
}

// Variáveis globais para armazenar os dados
let productionData = null;
let productionDataByYear = null;
let distributionData = null;

// Carrega os dados do arquivo JSON
async function loadChartData() {
    try {
        console.log('Tentando carregar dados de production.json...');
        // Tentando com caminho relativo à raiz do site
        let response = await fetch('./data/production.json');
        
        if (!response.ok) {
            console.log('Primeira tentativa falhou, tentando caminho alternativo...');
            // Tentativa alternativa com caminho relativo ao JS
            response = await fetch('../data/production.json');
        }
        
        if (!response.ok) {
            throw new Error('Não foi possível carregar o arquivo production.json');
        }
        
        console.log('Dados carregados com sucesso!');
        const data = await response.json();
        
        console.log('Labels dos meses:', data.productionData.labels);
        console.log('Total de meses:', data.productionData.labels.length);
        console.log('Datasets carregados:', data.productionData.datasets.length);
        
        // Verificar se os datasets têm as propriedades necessárias para o gráfico
        data.productionData.datasets.forEach(dataset => {
            if (!dataset.borderWidth) dataset.borderWidth = 2;
            if (dataset.fill === undefined) dataset.fill = false;
            if (!dataset.tension) dataset.tension = 0.4;
        });
        
        data.productionDataByYear['2023'].datasets.forEach(dataset => {
            if (!dataset.borderWidth) dataset.borderWidth = 2;
            if (dataset.fill === undefined) dataset.fill = false;
            if (!dataset.tension) dataset.tension = 0.4;
        });
        
        data.productionDataByYear['2024'].datasets.forEach(dataset => {
            if (!dataset.borderWidth) dataset.borderWidth = 2;
            if (dataset.fill === undefined) dataset.fill = false;
            if (!dataset.tension) dataset.tension = 0.4;
        });
        
        productionData = data.productionData;
        productionDataByYear = data.productionDataByYear;
        
        // Garantir que 'all' tenha a estrutura correta, com todos os datasets
        productionDataByYear['all'] = {
            labels: productionData.labels,
            datasets: productionData.datasets.map(ds => ({...ds}))
        };
        
        distributionData = data.distributionData;
        
        // Inicializa os gráficos depois de carregar os dados
        initCharts();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback para dados pré-definidos se o carregamento falhar
        initChartsWithFallbackData();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se os elementos dos gráficos existem
    const productionChartElement = document.getElementById('productionChart');
    const distributionChartElement = document.getElementById('distributionChart');
    
    if (!productionChartElement && !distributionChartElement) {
        return; // Sair se nenhum dos elementos existir
    }
    
    console.log('Iniciando carregamento dos gráficos...');
    
    // Dados para gráfico de produção
    const productionData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Abacaxi',
                data: [120, 130, 125, 140, 160, 155, 150, 170, 180, 190, 185, 195],
                backgroundColor: '#FC9F1C',
                borderColor: '#FC9F1C',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Banana',
                data: [90, 85, 95, 100, 110, 115, 120, 125, 130, 120, 115, 110],
                backgroundColor: '#2CB1A3',
                borderColor: '#2CB1A3',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Goiaba',
                data: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
                backgroundColor: '#EB3C3B',
                borderColor: '#EB3C3B',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Cará',
                data: [45, 50, 53, 58, 65, 70, 75, 78, 82, 85, 80, 75],
                backgroundColor: '#60442F',
                borderColor: '#60442F',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Chuchu',
                data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 68, 65, 60],
                backgroundColor: '#8a6344',
                borderColor: '#8a6344',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Orgânicos',
                data: [15, 18, 22, 25, 30, 35, 40, 45, 50, 52, 48, 45],
                backgroundColor: '#5ec8bd',
                borderColor: '#5ec8bd',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }
        ]
    };
    
    // Dados para 2023
    const production2023Data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Abacaxi',
                data: [110, 120, 115, 130, 150, 145, 140, 160, 170, 180, 175, 185],
                backgroundColor: '#FC9F1C',
                borderColor: '#FC9F1C',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Banana',
                data: [80, 75, 85, 90, 100, 105, 110, 115, 120, 110, 105, 100],
                backgroundColor: '#2CB1A3',
                borderColor: '#2CB1A3',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Goiaba',
                data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
                backgroundColor: '#EB3C3B',
                borderColor: '#EB3C3B',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Cará',
                data: [40, 45, 48, 52, 58, 63, 68, 70, 75, 78, 75, 70],
                backgroundColor: '#60442F',
                borderColor: '#60442F',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Chuchu',
                data: [25, 30, 35, 40, 45, 50, 55, 60, 63, 60, 55, 52],
                backgroundColor: '#8a6344',
                borderColor: '#8a6344',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Orgânicos',
                data: [12, 15, 18, 22, 26, 30, 35, 40, 43, 45, 42, 38],
                backgroundColor: '#5ec8bd',
                borderColor: '#5ec8bd',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }
        ]
    };
    
    // Dados para 2024
    const production2024Data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Abacaxi',
                data: [130, 140, 135, 150, 170, 165, 160, 180, 190, 200, 195, 205],
                backgroundColor: '#FC9F1C',
                borderColor: '#FC9F1C',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Banana',
                data: [100, 95, 105, 110, 120, 125, 130, 135, 140, 130, 125, 120],
                backgroundColor: '#2CB1A3',
                borderColor: '#2CB1A3',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Goiaba',
                data: [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
                backgroundColor: '#EB3C3B',
                borderColor: '#EB3C3B',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Cará',
                data: [50, 55, 58, 63, 68, 75, 80, 85, 88, 90, 85, 80],
                backgroundColor: '#60442F',
                borderColor: '#60442F',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Chuchu',
                data: [35, 40, 45, 50, 55, 60, 65, 70, 75, 73, 70, 65],
                backgroundColor: '#8a6344',
                borderColor: '#8a6344',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Orgânicos',
                data: [18, 22, 25, 30, 35, 40, 45, 50, 55, 58, 54, 50],
                backgroundColor: '#5ec8bd',
                borderColor: '#5ec8bd',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }
        ]
    };
    
    // Dados para gráfico de distribuição
    const distributionData = {
        labels: ['Abacaxi', 'Banana', 'Cará', 'Chuchu', 'Goiaba', 'Orgânicos'],
        datasets: [{
            label: 'Área em Hectares',
            data: [750, 450, 275, 200, 225, 175],
            backgroundColor: [
                '#FC9F1C',
                '#2CB1A3',
                '#EB3C3B',
                '#60442F',
                '#8a6344',
                '#5ec8bd'
            ],
            borderWidth: 1
        }]
    };
    
    // Referência para o gráfico de produção
    let productionChart = null;
    
    // Inicializar o gráfico de produção se o elemento existir
    if (productionChartElement) {
        const ctx = productionChartElement.getContext('2d');
        
        productionChart = new Chart(ctx, {
            type: 'line',
            data: productionData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Toneladas'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Mês'
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            font: {
                                size: 10
                            },
                            padding: 15
                        },
                        title: {
                            display: true,
                            text: 'Culturas',
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            padding: 10
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#333',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        cornerRadius: 6,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + ' ton';
                            }
                        }
                    }
                }
            }
        });
        
        console.log('Gráfico de produção inicializado com', productionData.datasets.length, 'culturas');
    }
    
    // Inicializar o gráfico de distribuição se o elemento existir
    if (distributionChartElement) {
        const ctx = distributionChartElement.getContext('2d');
        
        const distributionChart = new Chart(ctx, {
            type: 'pie',
            data: distributionData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#333',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        cornerRadius: 6,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                const percentage = Math.round((value / total) * 100);
                                return label + ': ' + value + ' hectares (' + percentage + '%)';
                            }
                        }
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = Math.round((value / total) * 100);
                            return percentage + '%';
                        },
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 11
                        }
                    }
                }
            }
        });
        
        console.log('Gráfico de distribuição inicializado');
    }
    
    // Configurar filtros para o gráfico de produção
    if (productionChart) {
        const filterButtons = document.querySelectorAll('.chart-filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover classe active de todos os botões
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Adicionar classe active ao botão clicado
                this.classList.add('active');
                
                // Obter o ano selecionado
                const year = this.getAttribute('data-year');
                console.log('Filtro selecionado:', year);
                
                // Atualizar dados do gráfico baseado no ano selecionado
                let newData;
                
                switch (year) {
                    case '2023':
                        newData = production2023Data;
                        break;
                    case '2024':
                        newData = production2024Data;
                        break;
                    default:
                        newData = productionData;
                        break;
                }
                
                // Atualizar o gráfico
                productionChart.data.labels = newData.labels;
                productionChart.data.datasets = newData.datasets;
                productionChart.update();
                
                console.log('Gráfico atualizado para', year);
            });
        });
    }
});

// Função para verificar o estado do gráfico
function checkChartState() {
    if (!window.productionChart) {
        console.error('Gráfico de produção não inicializado!');
        return;
    }
    
    console.log('Estado atual do gráfico:');
    console.log('- Labels:', window.productionChart.data.labels);
    console.log('- Quantidade de labels:', window.productionChart.data.labels.length);
    console.log('- Datasets:', window.productionChart.data.datasets.length);
    
    // Verificar se todos os meses estão visíveis
    const xAxis = window.productionChart.scales.x;
    if (xAxis) {
        console.log('- Ticks visíveis no eixo X:', xAxis.ticks.length);
    }
}

// Inicializa todos os gráficos
function initCharts() {
    // Verificar se os elementos dos gráficos existem
    const productionChart = document.getElementById('productionChart');
    const distributionChart = document.getElementById('distributionChart');
    
    // Inicializar gráficos se existirem
    if (productionChart) {
        initProductionChart();
        // Verificar estado após inicialização
        setTimeout(checkChartState, 500);
    }
    
    if (distributionChart) {
        initDistributionChart();
    }
    
    // Inicializar filtros
    initChartFilters();
}

// Gráfico de Produção Mensal
function initProductionChart() {
    const ctx = document.getElementById('productionChart').getContext('2d');
    
    console.log('Inicializando gráfico de produção mensal...');
    if (!productionData || !productionData.labels) {
        console.error('Dados do gráfico não estão disponíveis!');
        return;
    }
    
    console.log('Meses no gráfico:', productionData.labels);
    console.log('Quantidade de datasets:', productionData.datasets.length);
    
    // Garantir que todos os datasets tenham as propriedades necessárias
    productionData.datasets.forEach(dataset => {
        console.log(`Dataset ${dataset.label}:`, dataset.data.length, 'pontos de dados');
        if (!dataset.borderWidth) dataset.borderWidth = 2;
        if (dataset.fill === undefined) dataset.fill = false;
        if (!dataset.tension) dataset.tension = 0.4;
    });
    
    // Configurações do gráfico
    const config = {
        type: 'line',
        data: {
            labels: productionData.labels,
            datasets: productionData.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Toneladas'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mês'
                    },
                    ticks: {
                        // Garantir que todos os meses sejam exibidos
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 10
                        },
                        padding: 15
                    },
                    title: {
                        display: true,
                        text: 'Culturas',
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        padding: 10
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#333',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 6,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + ' ton';
                        }
                    }
                }
            }
        }
    };
    
    // Destruir o gráfico existente se houver
    if (window.productionChart) {
        window.productionChart.destroy();
    }
    
    // Criar gráfico
    window.productionChart = new Chart(ctx, config);
    console.log('Gráfico inicializado com', window.productionChart.data.datasets.length, 'culturas.');
    
    // Guardar referência aos dados para filtrar
    window.productionDataByYear = productionDataByYear;
}

// Gráfico de Distribuição de Área
function initDistributionChart() {
    const ctx = document.getElementById('distributionChart').getContext('2d');
    
    // Configurações do gráfico
    const config = {
        type: 'pie',
        data: distributionData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#333',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = Math.round((value / total) * 100);
                            return label + ': ' + value + ' hectares (' + percentage + '%)';
                        }
                    }
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = Math.round((value / total) * 100);
                        return percentage + '%';
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 11
                    }
                }
            }
        }
    };
    
    // Criar gráfico
    window.distributionChart = new Chart(ctx, config);
}

// Filtros para os gráficos
function initChartFilters() {
    // Filtros para o gráfico de produção
    const filterButtons = document.querySelectorAll('.chart-filter-btn');
    
    // Ensure the 'all' button is active by default
    const allYearsButton = document.querySelector('.chart-filter-btn[data-year="all"]');
    if (allYearsButton) {
        allYearsButton.classList.add('active');
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Filtrar dados do gráfico pelo ano selecionado
            const year = this.getAttribute('data-year');
            console.log('Filtrando dados para o ano:', year);
            
            if (window.productionChart && window.productionDataByYear) {
                const newData = window.productionDataByYear[year];
                
                if (!newData) {
                    console.error('Dados para o ano', year, 'não encontrados!');
                    return;
                }
                
                console.log('Labels para o ano', year, ':', newData.labels);
                console.log('Total de meses para o ano', year, ':', newData.labels.length);
                console.log('Datasets para o ano', year, ':', newData.datasets.length);
                
                // Garantir que todos os datasets tenham as propriedades necessárias
                newData.datasets.forEach(dataset => {
                    if (!dataset.borderWidth) dataset.borderWidth = 2;
                    if (dataset.fill === undefined) dataset.fill = false;
                    if (!dataset.tension) dataset.tension = 0.4;
                });
                
                // Atualizar dados do gráfico
                window.productionChart.data.labels = newData.labels;
                window.productionChart.data.datasets = newData.datasets;
                
                // Forçar atualização completa do gráfico
                window.productionChart.update('none');
                
                // Verificar se os dados foram atualizados corretamente
                console.log('Gráfico atualizado para', year, 'com', window.productionChart.data.datasets.length, 'culturas.');
            } else {
                console.error('Gráfico ou dados dos anos não estão disponíveis!');
            }
        });
    });
}

// Fallback para dados pré-definidos caso o carregamento do JSON falhe
function initChartsWithFallbackData() {
    console.warn('Usando dados pré-definidos como fallback');
    
    // Dados estáticos como fallback
    productionData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Abacaxi',
                data: [120, 130, 125, 140, 160, 155, 150, 170, 180, 190, 185, 195],
                backgroundColor: '#FC9F1C',
                borderColor: '#FC9F1C',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Banana',
                data: [90, 85, 95, 100, 110, 115, 120, 125, 130, 120, 115, 110],
                backgroundColor: '#2CB1A3',
                borderColor: '#2CB1A3',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Goiaba',
                data: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
                backgroundColor: '#EB3C3B',
                borderColor: '#EB3C3B',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Cará',
                data: [45, 50, 53, 58, 65, 70, 75, 78, 82, 85, 80, 75],
                backgroundColor: '#60442F',
                borderColor: '#60442F',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Chuchu',
                data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 68, 65, 60],
                backgroundColor: '#8a6344',
                borderColor: '#8a6344',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            {
                label: 'Orgânicos',
                data: [15, 18, 22, 25, 30, 35, 40, 45, 50, 52, 48, 45],
                backgroundColor: '#5ec8bd',
                borderColor: '#5ec8bd',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }
        ]
    };
    
    productionDataByYear = {
        'all': productionData,
        '2023': {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Abacaxi',
                    data: [110, 120, 115, 130, 150, 145, 140, 160, 170, 180, 175, 185],
                    backgroundColor: '#FC9F1C',
                    borderColor: '#FC9F1C',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Banana',
                    data: [80, 75, 85, 90, 100, 105, 110, 115, 120, 110, 105, 100],
                    backgroundColor: '#2CB1A3',
                    borderColor: '#2CB1A3',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Goiaba',
                    data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
                    backgroundColor: '#EB3C3B',
                    borderColor: '#EB3C3B',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Cará',
                    data: [40, 45, 48, 52, 58, 63, 68, 70, 75, 78, 75, 70],
                    backgroundColor: '#60442F',
                    borderColor: '#60442F',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Chuchu',
                    data: [25, 30, 35, 40, 45, 50, 55, 60, 63, 60, 55, 52],
                    backgroundColor: '#8a6344',
                    borderColor: '#8a6344',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Orgânicos',
                    data: [12, 15, 18, 22, 26, 30, 35, 40, 43, 45, 42, 38],
                    backgroundColor: '#5ec8bd',
                    borderColor: '#5ec8bd',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        '2024': {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Abacaxi',
                    data: [130, 140, 135, 150, 170, 165, 160, 180, 190, 200, 195, 205],
                    backgroundColor: '#FC9F1C',
                    borderColor: '#FC9F1C',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Banana',
                    data: [100, 95, 105, 110, 120, 125, 130, 135, 140, 130, 125, 120],
                    backgroundColor: '#2CB1A3',
                    borderColor: '#2CB1A3',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Goiaba',
                    data: [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
                    backgroundColor: '#EB3C3B',
                    borderColor: '#EB3C3B',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Cará',
                    data: [50, 55, 58, 63, 68, 75, 80, 85, 88, 90, 85, 80],
                    backgroundColor: '#60442F',
                    borderColor: '#60442F',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Chuchu',
                    data: [35, 40, 45, 50, 55, 60, 65, 70, 75, 73, 70, 65],
                    backgroundColor: '#8a6344',
                    borderColor: '#8a6344',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Orgânicos',
                    data: [18, 22, 25, 30, 35, 40, 45, 50, 55, 58, 54, 50],
                    backgroundColor: '#5ec8bd',
                    borderColor: '#5ec8bd',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }
            ]
        }
    };
    
    distributionData = {
        labels: ['Abacaxi', 'Banana', 'Cará', 'Chuchu', 'Goiaba', 'Orgânicos'],
        datasets: [{
            label: 'Área em Hectares',
            data: [750, 450, 275, 200, 225, 175],
            backgroundColor: [
                '#FC9F1C',
                '#2CB1A3',
                '#EB3C3B',
                '#60442F',
                '#8a6344',
                '#5ec8bd'
            ],
            borderWidth: 1
        }]
    };
    
    // Inicializa os gráficos com os dados de fallback
    initCharts();
} 