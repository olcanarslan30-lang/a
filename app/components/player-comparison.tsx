"use client"

import { ArrowLeft, Download, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

interface Player {
  id: number
  name: string
  team: string
  position: string
  age: number
  nationality: string
  height: string
  weight: string
  preferredFoot: string
  marketValue: string
  image: string
  stats: {
    goals: number
    assists: number
    matches: number
    minutes: number
    starts: number
    yellowCards: number
    redCards: number
    rating: number
    shots: number
    shotsOnTarget: number
    shotsOffTarget: number
    shotsBlocked: number
    shotAccuracy: number
    passes: number
    passesCompleted: number
    passAccuracy: number
    keyPasses: number
    throughBalls: number
    longBalls: number
    crosses: number
    crossAccuracy: number
    dribbles: number
    dribblesSuccessful: number
    dribblesAttempted: number
    dribblingSuccessRate: number
    touches: number
    touchesInBox: number
    tackles: number
    tacklesWon: number
    interceptions: number
    clearances: number
    blocks: number
    duelsWon: number
    duelsLost: number
    aerialDuelsWon: number
    aerialDuelsLost: number
    distanceCovered: number
    sprints: number
    topSpeed: number
    foulsCommitted: number
    foulsDrawn: number
    offsides: number
    penalties: number
    penaltiesScored: number
    penaltiesMissed: number
    bigChancesCreated: number
    bigChancesMissed: number
  }
}

interface PlayerComparisonProps {
  players: Player[]
  onBack: () => void
}

export default function PlayerComparison({ players, onBack }: PlayerComparisonProps) {
  const getPositionColor = (position: string) => {
    switch (position) {
      case "ST":
        return "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border-red-500/30"
      case "RW":
      case "LW":
        return "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border-blue-500/30"
      case "CAM":
        return "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border-green-500/30"
      case "CB":
        return "bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30"
    }
  }

  const chartData = [
    {
      stat: "Goals",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: player.stats.goals,
        }),
        {},
      ),
    },
    {
      stat: "Assists",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: player.stats.assists,
        }),
        {},
      ),
    },
    {
      stat: "Shot Accuracy (%)",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: player.stats.shotAccuracy,
        }),
        {},
      ),
    },
    {
      stat: "Pass Accuracy (%)",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: player.stats.passAccuracy,
        }),
        {},
      ),
    },
    {
      stat: "Dribbling (%)",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: player.stats.dribblingSuccessRate,
        }),
        {},
      ),
    },
    {
      stat: "Top Speed",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: player.stats.topSpeed,
        }),
        {},
      ),
    },
  ]

  const radarData = [
    {
      stat: "Goals",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: (player.stats.goals / Math.max(...players.map((p) => p.stats.goals))) * 100,
        }),
        {},
      ),
    },
    {
      stat: "Assists",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: (player.stats.assists / Math.max(...players.map((p) => p.stats.assists))) * 100,
        }),
        {},
      ),
    },
    {
      stat: "Rating",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: (player.stats.rating / 10) * 100,
        }),
        {},
      ),
    },
    {
      stat: "Pass Accuracy",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: player.stats.passAccuracy,
        }),
        {},
      ),
    },
    {
      stat: "Dribbling",
      ...players.reduce(
        (acc, player, index) => ({
          ...acc,
          [`player${index}`]: (player.stats.dribbles / Math.max(...players.map((p) => p.stats.dribbles))) * 100,
        }),
        {},
      ),
    },
  ]

  const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

  const handleExportComparison = () => {
    const comparisonData = {
      players: players.map((p) => ({
        name: p.name,
        team: p.team,
        position: p.position,
        stats: p.stats,
      })),
      timestamp: new Date().toISOString(),
      type: "player_comparison",
    }

    const dataStr = JSON.stringify(comparisonData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `comparison_${players.map((p) => p.name.replace(" ", "_")).join("_vs_")}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleShareComparison = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${players[0].name} vs ${players[1].name} - Futbol Stats`,
          text: `${players[0].name} (${players[0].team}) vs ${players[1].name} (${players[1].team}) karşılaştırması`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link kopyalandı!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="cursor-pointer text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-white">Player Comparison</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareComparison}
                className="border-white/20 text-white hover:bg-white/10 cursor-pointer bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Paylaş
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportComparison}
                className="border-white/20 text-white hover:bg-white/10 cursor-pointer bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 cursor-pointer bg-transparent"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Kaydet
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {players.map((player, index) => (
            <Card key={player.id} className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24 border-3 border-white/20 shadow-xl">
                      <AvatarImage
                        src={player.image || "/placeholder.svg"}
                        alt={player.name}
                        className="object-cover object-top"
                      />
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                        {player.name.split(" ").map((n) => n[0])}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-2xl text-white mb-2">{player.name}</CardTitle>
                    <CardDescription className="text-lg text-gray-300 mb-3">{player.team}</CardDescription>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={`${getPositionColor(player.position)} border backdrop-blur-sm`}>
                        {player.position}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-gray-300">
                        {player.age} yaş
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-gray-300">
                        {player.nationality}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                      <div>
                        <span className="font-medium">Boy:</span> {player.height}
                      </div>
                      <div>
                        <span className="font-medium">Kilo:</span> {player.weight}
                      </div>
                      <div>
                        <span className="font-medium">Ayak:</span> {player.preferredFoot}
                      </div>
                      <div>
                        <span className="font-medium">Değer:</span> {player.marketValue}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                      {player.stats.rating}
                    </div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl p-3 border border-red-500/20">
                    <div className="text-2xl font-black text-red-400">{player.stats.goals}</div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Gol</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-3 border border-green-500/20">
                    <div className="text-2xl font-black text-green-400">{player.stats.assists}</div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Asist</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-3 border border-blue-500/20">
                    <div className="text-2xl font-black text-blue-400">{player.stats.matches}</div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Maç</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-3 border border-purple-500/20">
                    <div className="text-2xl font-black text-purple-400">{player.stats.minutes}</div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Dakika</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Statistics Comparison</CardTitle>
              <CardDescription className="text-gray-400">Key performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={players.reduce(
                  (acc, player, index) => ({
                    ...acc,
                    [`player${index}`]: {
                      label: player.name,
                      color: colors[index],
                    },
                  }),
                  {},
                )}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="stat" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {players.map((player, index) => (
                      <Bar key={player.id} dataKey={`player${index}`} fill={colors[index]} name={player.name} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Performance Radar</CardTitle>
              <CardDescription className="text-gray-400">Overall ability comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={players.reduce(
                  (acc, player, index) => ({
                    ...acc,
                    [`player${index}`]: {
                      label: player.name,
                      color: colors[index],
                    },
                  }),
                  {},
                )}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="stat" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {players.map((player, index) => (
                      <Radar
                        key={player.id}
                        name={player.name}
                        dataKey={`player${index}`}
                        stroke={colors[index]}
                        fill={colors[index]}
                        fillOpacity={0.1}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Head-to-Head Stats */}
        <Card className="mb-8 bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Head-to-Head Comparison</CardTitle>
            <CardDescription className="text-gray-400">Direct statistical comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { key: "goals", label: "Goals", icon: "⚽" },
                { key: "assists", label: "Assists", icon: "🎯" },
                { key: "shotAccuracy", label: "Shot Accuracy (%)", icon: "🏹" },
                { key: "passAccuracy", label: "Pass Accuracy (%)", icon: "⚡" },
                { key: "dribbles", label: "Successful Dribbles", icon: "🏃" },
                { key: "tackles", label: "Tackles", icon: "🛡️" },
              ].map((stat) => {
                const player1Value = (players[0].stats as any)[stat.key]
                const player2Value = (players[1].stats as any)[stat.key]
                const maxValue = Math.max(player1Value, player2Value)
                const safeMaxValue = maxValue || 1
                const player1Percentage = (player1Value / safeMaxValue) * 100
                const player2Percentage = (player2Value / safeMaxValue) * 100

                return (
                  <div key={stat.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span>{stat.icon}</span>
                        {stat.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 text-right">
                        <div className="text-lg font-bold text-emerald-400">{player1Value}</div>
                        <div className="text-sm text-gray-400">{players[0].name}</div>
                      </div>
                      <div className="flex-1 flex items-center space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                            style={{ width: `${player1Percentage}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500 ml-auto"
                            style={{ width: `${player2Percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-bold text-cyan-400">{player2Value}</div>
                        <div className="text-sm text-gray-400">{players[1].name}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Stats Table */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Detailed Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-3 text-white font-bold">Statistic</th>
                    {players.map((player) => (
                      <th key={player.id} className="text-center p-3 text-white font-bold">
                        {player.name}
                      </th>
                    ))}
                    <th className="text-center p-3 text-white font-bold">Winner</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    { key: "goals", label: "Goals" },
                    { key: "assists", label: "Assists" },
                    { key: "shots", label: "Total Shots" },
                    { key: "shotsOnTarget", label: "Shots on Target" },
                    { key: "shotAccuracy", label: "Shot Accuracy (%)" },
                    { key: "passes", label: "Total Passes" },
                    { key: "passAccuracy", label: "Pass Accuracy (%)" },
                    { key: "keyPasses", label: "Key Passes" },
                    { key: "dribbles", label: "Successful Dribbles" },
                    { key: "dribblingSuccessRate", label: "Dribbling Success (%)" },
                    { key: "tackles", label: "Tackles" },
                    { key: "interceptions", label: "Interceptions" },
                    { key: "duelsWon", label: "Duels Won" },
                    { key: "aerialDuelsWon", label: "Aerial Duels Won" },
                    { key: "distanceCovered", label: "Distance Covered (km)" },
                    { key: "topSpeed", label: "Top Speed (km/h)" },
                    { key: "foulsDrawn", label: "Fouls Drawn" },
                    { key: "bigChancesCreated", label: "Big Chances Created" },
                    { key: "rating", label: "Rating" },
                  ].map((stat) => {
                    const values = players.map((p) => (p.stats as any)[stat.key])
                    const maxValue = Math.max(...values)
                    const winnerIndex = values.indexOf(maxValue)
                    const isDraw = values.filter((v) => v === maxValue).length > 1

                    return (
                      <tr key={stat.key} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-3 font-medium text-white">{stat.label}</td>
                        {players.map((player, index) => {
                          const value = (player.stats as any)[stat.key]
                          const isWinner = value === maxValue && !isDraw
                          return (
                            <td
                              key={player.id}
                              className={`text-center p-3 ${isWinner ? "text-emerald-400 font-bold" : ""}`}
                            >
                              {value}
                            </td>
                          )
                        })}
                        <td className="text-center p-3">
                          {isDraw ? (
                            <span className="text-yellow-400 font-bold">Draw</span>
                          ) : (
                            <span className="text-emerald-400 font-bold">
                              {players[winnerIndex].name.split(" ")[0]}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
