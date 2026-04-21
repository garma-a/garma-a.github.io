# VHS tape file: RedisGo List Operations Demo
Output imgs/RedisGo/demo-lists.gif

Set Shell bash
Set FontSize 16
Set Width 900
Set Height 550
Set Theme "Dracula"
Set Padding 20

# Start server
Type "./imgs/RedisGo/redis-server &"
Enter
Sleep 1500ms
Type "clear"
Enter
Sleep 500ms

# RPUSH
Type "# 1. RPUSH — Push items to tail of list"
Enter
Sleep 400ms
Type "redis-cli RPUSH tasks 'Build-API' 'Write-Tests' 'Deploy'"
Enter
Sleep 1200ms

# LPUSH
Type ""
Enter
Type "# 2. LPUSH — Push item to head of list"
Enter
Sleep 400ms
Type "redis-cli LPUSH tasks 'Plan-Sprint'"
Enter
Sleep 1200ms

# LRANGE
Type ""
Enter
Type "# 3. LRANGE — Get all list items (0 to -1)"
Enter
Sleep 400ms
Type "redis-cli LRANGE tasks 0 -1"
Enter
Sleep 1500ms

# LLEN
Type ""
Enter
Type "# 4. LLEN — Get list length"
Enter
Sleep 400ms
Type "redis-cli LLEN tasks"
Enter
Sleep 1200ms

# LPOP
Type ""
Enter
Type "# 5. LPOP — Remove and return head element"
Enter
Sleep 400ms
Type "redis-cli LPOP tasks"
Enter
Sleep 1000ms
Type "redis-cli LRANGE tasks 0 -1"
Enter
Sleep 1500ms

# Clean up
Type ""
Enter
Sleep 500ms
Type "kill %1 2>/dev/null"
Enter
Sleep 500ms
