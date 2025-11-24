<template>
  <div class="wrap">
    <h1>Bid Calculation</h1>
    <div class="inputs">
      <label class="field" :class="{ invalid: basePriceError }">
        <span>Base Price</span>
        <input
          type="number"
          min="0"
          v-model.number="basePrice"
          inputmode="decimal"
          aria-describedby="priceHelp basePriceErrorMsg"
          :aria-invalid="!!basePriceError"
        />
        <small id="priceHelp" class="help"
          >Enter a positive number (max 1,000,000).</small
        >
        <small
          v-if="basePriceError"
          id="basePriceErrorMsg"
          class="validation-error"
          role="alert"
          >{{ basePriceError }}</small
        >
      </label>
      <label class="field">
        <span>Vehicle Type</span>
        <select v-model="vehicleType">
          <option value="Common">Common</option>
          <option value="Luxury">Luxury</option>
        </select>
      </label>
    </div>

    <div class="status" aria-live="polite">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
    </div>

    <div v-if="data" class="results">
      <table>
        <thead>
          <tr>
            <th scope="col">Fee</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in data.fees" :key="f.code">
            <td>{{ f.description }}</td>
            <td>{{ f.amount.toFixed(2) }}</td>
          </tr>
          <tr>
            <td>Base Price</td>
            <td>{{ data.basePrice.toFixed(2) }}</td>
          </tr>
          <tr class="total">
            <td>Total</td>
            <td>{{ total.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { useBidCalculation } from "../composables/useBidCalculation";
import { useToast } from "vue-toastification";

const { basePrice, vehicleType, loading, error, data, total, basePriceError } =
  useBidCalculation({ initialBasePrice: 1000 });

const toast = useToast();

watch(error, (val) => {
  if (val) {
    toast.error(val, {
      timeout: 2000,
    });
  }
});
</script>
<style scoped>
.wrap {
  max-width: 700px;
  margin: 20px auto;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: system-ui, Arial, sans-serif;
}
.inputs {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 160px;
}
.field.invalid input {
  border-color: #c62828;
}
input,
select {
  padding: 6px 10px;
  font-size: 16px;
}
.help {
  font-size: 12px;
  color: #666;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 6px 8px;
  border: 1px solid #ddd;
  text-align: left;
}
thead {
  background: #f5f5f5;
}
.total td {
  font-weight: 600;
}
.error {
  color: #b00020;
}
.validation-error {
  color: #c62828;
  font-size: 12px;
}
</style>
