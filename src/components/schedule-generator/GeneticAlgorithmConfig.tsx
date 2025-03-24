import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Settings, Play, RefreshCw } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const formSchema = z.object({
  populationSize: z.number().min(10).max(1000),
  generations: z.number().min(10).max(1000),
  mutationRate: z.number().min(0).max(1),
  crossoverRate: z.number().min(0).max(1),
  elitismCount: z.number().min(0).max(100),
  tournamentSize: z.number().min(2).max(50),
});

interface GeneticAlgorithmConfigProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  onReset?: () => void;
  isRunning?: boolean;
}

const GeneticAlgorithmConfig = ({
  onSubmit = () => {},
  onReset = () => {},
  isRunning = false,
}: GeneticAlgorithmConfigProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      populationSize: 100,
      generations: 100,
      mutationRate: 0.1,
      crossoverRate: 0.8,
      elitismCount: 5,
      tournamentSize: 5,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Konfigurasi Algoritma Genetika
        </CardTitle>
        <CardDescription>
          Sesuaikan parameter algoritma genetika untuk menghasilkan jadwal
          optimal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="populationSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ukuran Populasi</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Slider
                        min={10}
                        max={1000}
                        step={10}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        disabled={isRunning}
                      />
                    </FormControl>
                    <Input
                      type="number"
                      className="w-20"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <FormDescription>
                    Jumlah individu dalam satu generasi
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="generations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Generasi</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Slider
                        min={10}
                        max={1000}
                        step={10}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        disabled={isRunning}
                      />
                    </FormControl>
                    <Input
                      type="number"
                      className="w-20"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <FormDescription>
                    Jumlah iterasi maksimum algoritma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mutationRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tingkat Mutasi</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        disabled={isRunning}
                      />
                    </FormControl>
                    <Input
                      type="number"
                      className="w-20"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isRunning}
                      step={0.01}
                    />
                  </div>
                  <FormDescription>
                    Probabilitas terjadinya mutasi gen (0-1)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="crossoverRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tingkat Crossover</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        disabled={isRunning}
                      />
                    </FormControl>
                    <Input
                      type="number"
                      className="w-20"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isRunning}
                      step={0.01}
                    />
                  </div>
                  <FormDescription>
                    Probabilitas terjadinya crossover (0-1)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="elitismCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Elitisme</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        disabled={isRunning}
                      />
                    </FormControl>
                    <Input
                      type="number"
                      className="w-20"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <FormDescription>
                    Jumlah individu terbaik yang dipertahankan
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tournamentSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ukuran Turnamen</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Slider
                        min={2}
                        max={50}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        disabled={isRunning}
                      />
                    </FormControl>
                    <Input
                      type="number"
                      className="w-20"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isRunning}
                    />
                  </div>
                  <FormDescription>
                    Jumlah individu dalam seleksi turnamen
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-between px-0 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onReset}
                disabled={isRunning}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button type="submit" disabled={isRunning}>
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Sedang Berjalan..." : "Mulai Generasi"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GeneticAlgorithmConfig;
