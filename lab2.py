import copy
import random
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

#Задаем ограничение на количество знаков после запятой
precision = 1000
# Создаём матрицу вероятностей переходов
def f(n) :
    matrix = []
    random.seed(1188)
    for l in range(n):
        row = []
        sum = 0
        crtPrec = precision
        for i in range(n-1):
            val = random.randrange(crtPrec)
            sum += val
            row.append(float(val)/precision)
            crtPrec -= val
        row.append(float(precision - sum)/precision)
        matrix.append(row)
    return matrix

# Создаем систему линейных алгебраических уравнений (СЛАУ)
def slau(matrix):
    n = len(matrix)
    print(matrix)
    slau = copy.deepcopy(np.transpose(np.array(matrix)))
    pi_matrix = []
    for i in range(n):
        # Значения последней строки заменяем на 1
        if i == n - 1:
            slau[i] = [1]*n
            pi_matrix.append([1])
        else:
            # Из главной диагонали вычитаем единицу
            for j in range(n):
                if i == j:
                    slau[i][j] -= 1
            pi_matrix.append([0])
    return slau,pi_matrix

# Вычисление стационарного распределения
def linal(left_matrix,right_matrix):
    left = np.array(left_matrix)
    right = np.array(right_matrix)
    final = np.linalg.solve(left,right)
    return final

# Первый метод. Генерация матрицы и решение СЛАУ
matrix = f(4)
left,right = slau(matrix)
result = linal(left,right)
print("First method",result.tolist())

# Второй метод.
def second(n,matrix):
    # Генерация случайного вектора начального состояния
    P = np.array([0]*n)
    random.seed(1188)
    flag = random.randint(0,n-1)
    P[flag] = 1
    matrix_tr = np.transpose(matrix)
    stat_vector=[]
    stat_vector.append(P)
    for i in range(10):
        #умножение вектора начального состояния на матрицу вероятностей перехода
        P = np.dot(P,matrix)
        stat_vector.append(P)
    print("Second method",P)

    # Создание графика зависимости стационарного распределения от t
    fig, ax = plt.subplots()
    blue_patch = mpatches.Patch(color='blue', label='вероятность нахождения вo 1-ом состояние')
    orange_patch = mpatches.Patch(color='orange', label='вероятность нахождения в 2-ем состояние')
    green_patch = mpatches.Patch(color='green', label='вероятность нахождения в 3-ом состояние')
    red_patch = mpatches.Patch(color='red', label='вероятность нахождения в 4-ом состояние')
    ax.legend(handles=[blue_patch,orange_patch,green_patch,red_patch])
    plt.plot(stat_vector)
    plt.xlabel('Номер шага')
    plt.ylabel('Оценка стационарного распределения')
    plt.grid()
    plt.show()

# Третий метод.
def third(n,matrix):
    # Создание вектора для подсчета количества посещений каждого города
    count = [0]*4
    city = random.randint(0,4)
    count[city] += 1
    # Подсчёт посещений каждого города
    for i in range(n):
        city = random.choices([0,1,2,3],weights = matrix[city])[0]
        count[city] += 1
    # Вычисление вектора стационарного распределения
    for j in range(len(count)):
        count[j] = count[j]/n
    print("Third method",count)

# Вызов второго и третьего методов.
second(4,matrix)
third(10000,matrix)


