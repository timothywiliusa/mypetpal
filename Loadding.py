def optimize_page_load(elements):
    n = len(elements) #Elements is the loading time and size
    dp = [0] * (n+1) #elements
    for i in range(1, n+1):
        dp[i] = elements[i-1].load_time #ith elements's loading time
        for j in range(1, i):
            if dp[j] + elements[i-1].load_time < dp[i]:
                dp[i] = dp[j] + elements[i-1].load_time #reordering the items
    return dp[n]
