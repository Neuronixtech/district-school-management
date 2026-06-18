import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportToPDF = (
  columns,
  data,
  fileName
) => {

  const doc =
    new jsPDF();

  autoTable(doc, {
    head: [columns],
    body: data
  });

  doc.save(
    `${fileName}.pdf`
  );
};

export default exportToPDF;